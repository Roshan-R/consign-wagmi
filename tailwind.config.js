/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'main': '#EEEDDE',
                'pp': '#826DFF',
                'peachh': '#F3CEB4',
                'purplee': '#C2B5FA',
                'greenn': '#57EC66',
                'redd': '#EC5757',
            }
            ,
            fontFamily: {
                roboto: ['Roboto Condensed', 'sans-serif']
            },
        },
    },
    plugins: [
    ],
    variants: {
        extend: {
            display: ["group-hover"],
        }
    }
}
