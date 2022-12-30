/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#0F2A60',
                secondary: '#405276',
                wildBlue: '#9BACCF',
                stepCyan: '#01CAFF',
                lightBlue: '#F5F7FB',
                lightGray: '#F6F7FB',
            },
            fontFamily: {
                sans: ['Poppins', 'Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
