/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,ts}"],
    theme: {
        extend: {
            animation: {
                "loop-scroll": "loop-scroll 50s linear infinite",
                "loop-scroll-2": "loop-scroll-2 50s linear infinite",
            },
            keyframes: {
                "loop-scroll": {
                    from: { transform: "translateX(0)" },
                    to: { transform: "translateX(-100%)" },
                },
                "loop-scroll-2": {
                    from: { transform: "translateX(100%)" },
                    to: { transform: "translateX(0)" },
                },
            },
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
