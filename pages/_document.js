import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          {/* Preconnect for Google Fonts */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/driver.js/0.9.8/driver.min.css" />
          <link rel="stylesheet" href="/styles/tour.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* Driver.js JavaScript */}
          <script src="https://cdnjs.cloudflare.com/ajax/libs/driver.js/0.9.8/driver.min.js" defer></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
