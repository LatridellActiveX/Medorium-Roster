/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                smoke: '#dfe3e8',
                fog: '#ced4db',
            },
            container: {
                center: true
            }
        },
    },
    plugins: [],
}