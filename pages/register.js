"use client";
import { useState } from "react";

export default function Registration() {
  const [message, setMessage] = useState(null);

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
      const req = await fetch("http://localhost:1337/api/auth/local/register", reqOptions);
      const res = await req.json();

      if (res.error) {
        setMessage(res.error.message);
        return;
      }

      if (res.jwt && res.user) {
        setMessage("Berhasil login");
        form.reset(); // Reset form jika berhasil
      }
    } catch (error) {
      setMessage("Terjadi kesalahan. Coba lagi nanti.");
    }
  };

  return (
    <form onSubmit={register} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Register</h2>

      <div className="space-y-2">
        <label htmlFor="username" className="block text-gray-600 font-medium">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Enter your username"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-gray-600 font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="block text-gray-600 font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-200"
          placeholder="Enter your password"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white font-medium p-3 rounded-md hover:bg-blue-600 transition duration-200"
      >
        Register
      </button>

      {message && <div className="mt-4 text-red-500 text-center font-medium">{message}</div>}
    </form>
  );
}
