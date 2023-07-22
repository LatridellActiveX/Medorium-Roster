// module.export = {
//     purge: [`./src/**/*.html`, './src/**/*.jsx', './src/**/*.txs'],
//     dark: false,
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
    mode: 'jit',
    purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
}