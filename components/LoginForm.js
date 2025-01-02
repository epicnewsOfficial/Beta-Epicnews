import React, { useState } from "react";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/Login.css";
import Head from "next/head";
import Container from "@components/Container";

const styles = {
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
  },
};

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const saveTokenAndRedirect = (token) => {
    if (token) {
      localStorage.setItem("authToken", token);
      localStorage.setItem("username", username);
      window.location.href = "/";
    }
  };

  const handleGithubLogin = () => {
    const githubRedirectUri = "http://localhost:1337/api/connect/github";
    const callbackUri = "http://localhost:3000"; // Pastikan callbackUri sesuai dengan pengaturan aplikasi
    window.location.href = `${githubRedirectUri}?redirect_uri=${callbackUri}`;
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah form submit otomatis
    setError(null);

    try {
      const response = await fetch("http://localhost:1337/api/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identifier: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Login failed");
      }

      saveTokenAndRedirect(data.jwt); // Simpan token dan redirect
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Head>
        <title>Login &mdash; EpicNews</title>
      </Head>
      <Container>
        <div className="login-main">
          <div className="login-left hidden-custom">
            <img src={"/image_login.png"} alt="" />
          </div>
          <div className="login-right">
            <div className="login-right-container">
              <div className="login-logo">
                <img src={"/logo.png"} alt="logo epicnews" />
              </div>
              <div className="login-center">
                <h2>Welcome back!</h2>
                <p>Please enter your details</p>

                <form onSubmit={handleLogin}>
                  <input
                    type="text"
                    placeholder="Username or Email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />

                  <div className="pass-input-div">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    {showPassword ? (
                      <FaEyeSlash
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    ) : (
                      <FaEye
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}
                      />
                    )}
                  </div>

                  {error && <p style={styles.error}>{error}</p>}

                  <div className="login-center-options">
                    <a href="#" className="forgot-pass-link">
                      Forgot password?
                    </a>
                  </div>

                  <div className="login-center-buttons">
                    <button type="submit">Log In</button>
                  </div>
                </form>
              </div>
              <p className="login-bottom-p">
                Don't have an account? <a href="/register">Sign Up</a>
              </p>
            </div>
          </div>
          <div className="relative">
            <a href="/" className="absolute top-10 right-14">
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-x"
                  className="contrast-50"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </a>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LoginForm;
