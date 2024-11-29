/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Pastikan --background didefinisikan dengan warna terang
        foreground: "var(--foreground)", // Pastikan --foreground didefinisikan dengan warna yang sesuai
        heading: "#ff6347", // Menambahkan warna khusus untuk heading (tomato red)
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#fff', // Warna teks default yang terang
            maxWidth: '100%', // Membatasi lebar maksimal konten prose ke 100%
            strong: {
              color: '#fff', // Warna teks bold (strong)
            },
            blockquote: {
              color: '#fff', // Warna untuk quotes (blockquote)
              borderLeftColor: '#ccc', // Warna border di sebelah kiri blockquote
            },
            a: {
              color: '#1d4ed8', // Warna link
              '&:hover': {
                color: '#2563eb', // Warna link saat hover
              },
            },
            h1: {
              color: '#fff', // Warna untuk h1
            },
            h2: {
              color: '#fff', // Warna untuk h2
            },
            h3: {
              color: '#fff', // Warna untuk h3
            },
            h4: {
              color: '#fff', // Warna untuk h4
            },
            // Menambahkan styling underline global
            '.underline': {
              'text-decoration': 'underline', // Set underline pada elemen dengan kelas underline
              color: '#1d4ed8', // Menambahkan warna underline (link color)
              '&:hover': {
                color: '#2563eb', // Warna underline saat hover
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
