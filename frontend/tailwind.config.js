/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'c-border': "#2F3438",
                'c-background': "#101010",
                'c-primary': "#202325",
                'c-secondary': "#cef", //needs to be added
            },
            container: {
                center: true
            }
        },
    },
    plugins: [],
}