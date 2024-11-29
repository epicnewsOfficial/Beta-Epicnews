import React, { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const saveTokenAndRedirect = (token) => {
    localStorage.setItem("authToken", token); // Simpan token ke localStorage
    window.location.href = "/"; // Redirect ke halaman utama menggunakan path relatif
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
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>

      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Username or Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>

      <button onClick={handleGithubLogin} style={styles.githubButton}>
        Login with GitHub
      </button>
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    margin: "10px 0",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  githubButton: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    backgroundColor: "#333",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "10px",
  },
};

export default LoginForm;
