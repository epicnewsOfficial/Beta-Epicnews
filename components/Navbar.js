import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [offcanvas, setOffcanvas] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const router = useRouter();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const handleStartTour = () => {
    if (typeof window !== "undefined" && window.Driver) {
      const driverObj = driver({
        popoverClass: "driverjs-theme",
        showProgress: true,
        steps: [
          {
            element: "#search",
            popover: {
              title: "Searching",
              description:
                "Fitur search pada sebuah website memungkinkan pengguna untuk menemukan konten atau informasi tertentu dengan cepat dan efisien. Pengguna cukup memasukkan kata kunci ke dalam kolom pencarian, lalu sistem akan menampilkan hasil yang relevan berdasarkan input tersebut. Fitur ini sering dilengkapi dengan filter atau saran otomatis (autocomplete) untuk meningkatkan pengalaman pencarian.",
              side: "top",
              align: "start",
            },
          },
          {
            element: "#logo",
            popover: {
              title: "Animated Tour Example",
              description: "Ini teh logo mahal yagesya.",
              side: "left",
              align: "start",
            },
          },
          {
            element: "#username",
            popover: {
              title: "Import the Library",
              description: "Ini teh buat ngaran sia yagesya.",
              side: "bottom",
              align: "start",
            },
          },
          {
            element: "#logout",
            popover: {
              title: "Import the Library",
              description: "Ini teh buat logout ya gblg ygy",
              side: "bottom",
              align: "start",
            },
          },

          {
            element: "#category",
            popover: {
              title: "Import the Library",
              description:
                "<img src='https://i.imgur.com/EAQhHu5.gif' style='height: 202.5px; width: 270px;' /><span style='font-size: 15px; display: block; margin-top: 10px; text-align: center;'>Yet another highlight example.</span>",
              side: "bottom",
              align: "start",
            },
          },
        ],
      });

      driverObj.drive(); // Start the tour
    } else {
      console.error("Driver.js is not loaded or available.");
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("username");
    if (token && user) {
      setIsLoggedIn(true);
      setUsername(user);
    }
  }, []);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch("http://127.0.0.1:1337/api/categories");
        const data = await response.json();
        setCategories(data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const items = categories.map((category) => ({
    name: category.attributes.name,
    href: `/category/${category.attributes.slug}`,
  }));

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <nav className="border-b-2 text-white py-4 pt-7">
      {/* Navbar Top */}
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        {/* Hamburger Menu */}
        <div className="lg:hidden">
          <button
            onClick={() => setOffcanvas(!offcanvas)}
            className="p-2 bg-gray-700 rounded"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Left Side: Search and Logo */}
        <div className="flex items-center space-x-6" id="search">
          {/* Search - Visible only on large screens */}
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full lg:block hidden"
          >
            <input
              id="seacrh"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow bg-gray-800 text-sm py-2 px-4 rounded-l focus:outline-none"
            />
            <button
              type="submit"
              className="bg-gray-700 py-2 px-3 rounded-r hover:bg-gray-600"
            >
              🔎
            </button>
          </form>
        </div>
        {/* Logo */}
        <Link href="/" legacyBehavior>
          <a id="logo">
            <img src="/logo1.png" alt="EpicNews Logo" className="inline h-10" />
          </a>
        </Link>

        {/* Right Side: Username or Login/Register or Logout */}
        <div className="hidden lg:flex items-center space-x-6">
          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <span id="username" className="text-sm">
                Welcome, {username}
              </span>
              <button
                onClick={handleLogout}
                id="logout"
                className="bg-red-500 text-sm px-4 py-2 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" legacyBehavior id="login">
                <a className="hover:underline">Login</a>
              </Link>
              <Link href="/register" legacyBehavior id="register">
                <a className="hover:underline">Register</a>
              </Link>
            </>
          )}
        </div>
        {/* Tour Button */}
        <button
          onClick={handleStartTour}
          className="bg-blue-500 text-sm px-4 py-2 rounded hover:bg-blue-600  hidden lg:block"
        >
          Start Tour
        </button>
      </div>

      {/* Kategori di bawah logo, visible on large screens */}
      <div className="py-2 mt-4 hidden lg:block pt-5 pb-5">
        <div className="container mx-auto text-center">
          <ul
            id="category"
            className="flex flex-wrap justify-center space-x-6 font-medium"
          >
            {items.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => router.push(item.href)}
                  className="px-4 py-2 font-medium text-gray-900 bg-white hover:bg-gray-900 hover:text-white rounded-[20px] border-4 transition duration-500 ease-in-out"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Offcanvas Menu (Mobile) */}
      <div
        className={`fixed top-0 left-0 w-3/4 h-full bg-gray-800 p-4 z-50 transform ${
          offcanvas ? "translate-x-0" : "-translate-x-full"
        } transition-transform lg:hidden`}
      >
        <button
          className="absolute top-4 right-4 bg-gray-700 p-2 rounded"
          onClick={() => setOffcanvas(false)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Search - Visible only in offcanvas (mobile) */}
        <form onSubmit={(e) => e.preventDefault()} className="mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-700 text-sm py-2 px-4 rounded focus:outline-none"
          />
        </form>

        {/* Kategori di Offcanvas */}
        <ul className="space-y-4 font-medium">
          {items.map((item) => (
            <li key={item.name}>
              <Link href={item.href} legacyBehavior>
                <a className="block hover:underline">{item.name}</a>
              </Link>
            </li>
          ))}
        </ul>

        {/* Profile or Auth Links */}
        {isLoggedIn ? (
          <div className="space-y-4 mt-6">
            <span className="block text-center">Welcome, {username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-sm px-4 py-2 rounded hover:bg-red-600 w-full"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="space-y-4 mt-6">
            <Link href="/register" legacyBehavior>
              <a className="bg-blue-500 text-sm px-4 py-2 rounded hover:bg-blue-600 block text-center">
                Register
              </a>
            </Link>
            <Link href="/login" legacyBehavior>
              <a className="bg-green-500 text-sm px-4 py-2 rounded hover:bg-green-600 block text-center">
                Login
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
