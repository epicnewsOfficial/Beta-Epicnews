import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

export default function Layout({ children }) {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
