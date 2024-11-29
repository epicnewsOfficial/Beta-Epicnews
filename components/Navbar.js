import Link from "next/link";
import { useState, useEffect } from "react";
import Container from "@components/Container";
import { useRouter } from "next/router";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [offcanvas, setOffcanvas] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

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

  return (
    <nav className="py-10">
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center lg:w-2/12 w-6/12" legacyBehavior>
            <Link href="/" legacyBehavior>
              <a className="flex items-center justify-center lg:justify-start">
                <div className="w-10 h-10 bg-gray-500 rounded flex items-center justify-center mr-4 shadow-2xl">E</div>
                Epictetus
              </a>
            </Link>
          </div>

          {/* Navbar Items kategori */}
          <div
            className={`lg:flex lg:w-7/12 w-full bg-gradient-to-b from-gray-600 to-gray-900 lg:bg-none fixed lg:static top-0 h-full lg:h-auto p-10 lg:p-0 transition-all ${
              offcanvas ? "left-0" : "-left-full"
            }`}
          >
            <button className="absolute top-10 right-10 lg:hidden" onClick={() => setOffcanvas(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <ul className="lg:space-x-14 flex lg:items-center flex-col lg:flex-row space-y-4 lg:space-y-0">
              {items.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} legacyBehavior>
                    <a className="hover:underline text-white">{item.name}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Search Bar */}
          <div className="lg:w-3/12 hidden lg:flex items-center justify-end">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                className="bg-gray-700 py-2 px-4 w-full lg:rounded-full text-white placeholder-gray-400"
                placeholder="Search ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 19a8 8 0 100-16 8 8 0 000 16zm10-10l-4.35 4.35"
                  />
                </svg>
              </button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <div className="w-3/12 lg:hidden flex justify-end">
            <button onClick={() => setOffcanvas(!offcanvas)}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.4">
                  <path d="M3 12H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 6H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 18H21" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </g>
              </svg>
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
}
