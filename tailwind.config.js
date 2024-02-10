/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            height: {
                54: "13.5rem",
            },
            width: {
                62: "15.5rem",
            },
            maxWidth: {
                52: "13rem",
            },
        },
    },
    plugins: [],
};
