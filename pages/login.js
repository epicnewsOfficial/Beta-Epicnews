import React, { useState, useEffect } from "react";
import LoginForm from "@components/LoginForm";

export default function Login() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      window.location.href = "/"; // Redirect ke halaman utama
    }
  }, []);

  return <div>{!token ? <LoginForm /> : null}</div>;
}
