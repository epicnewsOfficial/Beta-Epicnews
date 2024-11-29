import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:1337/api", // Base URL API Anda
});

// Menambahkan interceptor untuk request
api.interceptors.request.use(
  (config) => {
    // Ambil token dari localStorage
    const token = localStorage.getItem("jwt");

    if (token) {
      // Set header Authorization dengan token jika ada
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Menambahkan interceptor untuk response
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Jika token kedaluwarsa atau invalid, logout pengguna dan redirect ke login
      localStorage.removeItem("jwt");
      window.location.href = "/login"; // Arahkan ke halaman login
    }
    return Promise.reject(error);
  }
);

export default api;
