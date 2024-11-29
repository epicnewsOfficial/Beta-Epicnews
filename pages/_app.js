import "tailwindcss/tailwind.css";
function MyApp({ Component, pageProps, categories }) {
  console.log("Categories in MyApp:", categories);
  return <Component {...pageProps} categories={categories} />;
}

export default MyApp;
