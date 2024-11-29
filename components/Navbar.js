import Link from "next/link";
import { useState } from "react";
import Container from "@components/Container";
import { CiSearch } from "react-icons/ci";

export default function Navbar() {
  const [offcavnas, setOffcanvas] = useState(false);
  const [search, setSearch] = useState(false);

  return (
    <nav className="py-10">
      <Container>
        <div className="flex items-center justify-center">
          <div className="w-3/12 lg:hidden">
            <button onClick={() => setOffcanvas(!offcavnas)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.4">
                  <path
                    d="M3 12H21"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 6H21"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 18H21"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </button>
          </div>

          <div
            className={`lg:w-3/12 absolute lg:static w-full lg:px-0 transition-all ${
              search ? "top-10" : "-top-40"
            }`}
          >
            <div className="relative px-10 lg:px-0">
              <input
                className="bg-gray-700 py-3 pl-12 w-full lg:mx-0 lg:ml-0 lg:rounded-full rounded-lg"
                placeholder="Search ..."
              />
              <img
                src="/search.svg"
                alt="search icon"
                className="absolute lg:left-4 left-14 top-1/2 transform -translate-y-1/2 w-5 h-5 invert contrast-50"
              />
              <button
                className="absolute top-3 right-14 lg:hidden"
                onClick={() => setSearch(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
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
            </div>
          </div>

          <div className="lg:w-6/12 w-6/12 lg:justify-items-center">
            <Link href="/" legacyBehavior>
              {/* <a className="flex items-center justify-center lg:justify-start">
                <div className="w-10 h-10 bg-gray-500 rounded flex items-center justify-center mr-4 shadow-2xl">
                  E
                </div>
                EpicNews
              </a> */}

              <img
                src="/logo1.png"
                alt="logo epicnews"
                className="h-auto w-32"
              />
            </Link>
          </div>

          <div className="lg:w-3/12 flex space-x-7 lg:justify-end">
            <Link href="/register" legacyBehavior>
              <a className="bg-gray-500 p-3 hidden lg:block text-white rounded">
                Register
              </a>
            </Link>
            <Link href="/login" legacyBehavior>
              <a className="p-3 hidden lg:block">Login</a>
            </Link>
          </div>

          <div className="w-3/12 lg:hidden text-right">
            <button onClick={() => setSearch(!search)}>
              <svg
                className="inline-block"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.4">
                  <path
                    d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21 21L16.65 16.65"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
              </svg>
            </button>
          </div>
        </div>
        <div
          className={`lg:justify-items-center lg:mt-10 lg:w-12/12 w-full bg-gradient-to-b from-gray-600 to-gray-900 lg:bg-none fixed lg:static top-0 h-full lg:h-auto p-10 lg:p-0 transition-all  ${
            offcavnas ? "left-0" : "-left-full"
          }`}
        >
          <button
            className="absolute top-10 right-10 lg:hidden"
            onClick={() => setOffcanvas(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-x"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <ul className="lg:space-x-14 flex lg:items-center flex-col lg:flex-row space-y-4 lg:space-y-0">
            <div className="flex gap-10 pb-10">
              <li>
                <Link legacyBehavior href="/register">
                  <a className="hover:underline lg:hidden bg-black p-3">
                    Register
                  </a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/login">
                  <a className="hover:underline lg:hidden">Sign In</a>
                </Link>
              </li>
            </div>
            <li>
              <Link legacyBehavior href="/">
                <a className="hover:underline">Home</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/news">
                <a className="hover:underline">News</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/election">
                <a className="hover:underline">US Election</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/sport">
                <a className="hover:underline">Sport</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/business">
                <a className="hover:underline">Business</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/innovation">
                <a className="hover:underline">Innovation</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/culture">
                <a className="hover:underline">Culture</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/arts">
                <a className="hover:underline">Arts</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/travel">
                <a className="hover:underline">Travel</a>
              </Link>
            </li>
            <li>
              <Link legacyBehavior href="/earth">
                <a className="hover:underline">Earth</a>
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </nav>
  );
}
