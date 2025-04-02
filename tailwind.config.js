/** @type {import('tailwindcss').Config} */

const { heroui } = require("@heroui/theme");
export default {
    content: [
        //"./src/**/*.{js,jsx,ts,tsx}",
        "./node_modules/@heroui/theme/dist/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {},
    },
    darkMode: "class",
    plugins: [
        heroui({
            themes: {
                light: {
                    primary: "#ff0000",
                    secondary: "#00ff00",
                    background: "#ffffff",
                },
                dark: {
                    primary: "#0000ff",
                    secondary: "#ffff00",
                    background: "#000000",
                },
            },
        }),
    ],
};
