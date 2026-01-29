/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Custom colors if needed
                primary: "#1a1a1a",
                accent: "#ffffff",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'], // We might need to add font connection
            },
        },
    },
    plugins: [],
}
