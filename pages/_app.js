import "tailwindcss/tailwind.css";
import "../styles/tour.css";
function MyApp({ Component, pageProps, categories }) {
  return <Component {...pageProps} categories={categories} />;
}

export default MyApp;
