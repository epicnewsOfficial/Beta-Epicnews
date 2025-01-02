"use client";
import { useState } from "react";
import Container from "@components/Container";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/Register.css";
import Head from "next/head";

export default function Registration() {
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const register = async (event) => {
    event.preventDefault();
    setMessage(null);

    const form = event.target; // Akses form langsung dari event
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData);

    const reqOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    };

    try {
      const req = await fetch(
        "http://localhost:1337/api/auth/local/register",
        reqOptions
      );
      const res = await req.json();

      if (res.error) {
        setMessage(res.error.message);
        return;
      }

      if (res.jwt && res.user) {
        setMessage("Berhasil registrasi!");
        form.reset(); // Reset form jika berhasil
      }
    } catch (error) {
      setMessage("Terjadi kesalahan. Coba lagi nanti.");
    }
  };

  return (
    <>
      <Head>
        <title>Register &mdash; EpicNews</title>
      </Head>
      <Container>
        <div className="register-main">
          <div className="register-left hidden-custom">
            <img src={"/image_register.png"} alt="" />
          </div>
          <div className="register-right">
            <div className="register-right-container">
              <div className="register-logo">
                <img src={"/logo.png"} alt="logo epicnews" />
              </div>
              <div className="register-center">
                <h2>Register for news!</h2>
                <p>Please enter your details</p>
                <form onSubmit={register}>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Enter your username"
                    required
                  />

                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-200"
                    placeholder="Enter your email"
                    required
                  />

                  <div className="pass-input-div">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-200"
                      placeholder="Enter your password"
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

                  <div className="register-center-buttons">
                    <button type="submit">Register</button>
                  </div>

                  {message && (
                    <div className="mt-4 text-green-500 text-center font-medium">
                      {message}
                    </div>
                  )}
                </form>
              </div>

              <p className="register-bottom-p">
                Already have an account? <a href="/login">Log In</a>
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
}
