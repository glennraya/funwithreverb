import defaultTheme from 'tailwindcss/defaultTheme'
const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter Tight', ...defaultTheme.fontFamily.sans]
            }
        }
    },
    darkMode: 'class',
    plugins: [nextui()]
}
