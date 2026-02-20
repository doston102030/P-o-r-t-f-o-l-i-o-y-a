/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#6d63ff',
                    light: '#8b7fff',
                    dark: '#5a52e0',
                    50: '#f0eeff',
                    100: '#e0dcff',
                    200: '#c2b9ff',
                    300: '#a396ff',
                    400: '#8b7fff',
                    500: '#6d63ff',
                    600: '#5a52e0',
                    700: '#4741b8',
                    800: '#343190',
                    900: '#212068',
                },
                accent: {
                    DEFAULT: '#a78bfa',
                    light: '#c4b5fd',
                    dark: '#7c3aed',
                },
                cyan: {
                    DEFAULT: '#22d3ee',
                    light: '#67e8f9',
                    dark: '#0891b2',
                },
                surface: {
                    DEFAULT: 'rgba(15, 23, 42, 0.4)',
                    light: 'rgba(255, 255, 255, 0.8)',
                },
            },
            fontFamily: {
                sans: ['DM Sans', 'Inter', 'system-ui', 'sans-serif'],
                heading: ['Syne', 'sans-serif'],
            },
            borderRadius: {
                'xl': '14px',
                '2xl': '20px',
                '3xl': '24px',
            },
            boxShadow: {
                'glow': '0 0 30px rgba(109, 99, 255, 0.15)',
                'glow-lg': '0 0 50px rgba(109, 99, 255, 0.25)',
                'card': '0 12px 40px rgba(0, 0, 0, 0.4)',
                'card-hover': '0 30px 80px rgba(109, 99, 255, 0.15)',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease forwards',
                'fade-up': 'fadeInUp 0.7s ease both',
                'float': 'float 4s ease-in-out infinite',
                'pulse-glow': 'pulseGlow 2s infinite',
                'gradient-shift': 'gradientShift 6s ease infinite',
            },
            keyframes: {
                fadeIn: {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                fadeInUp: {
                    from: { opacity: '0', transform: 'translateY(30px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                pulseGlow: {
                    '0%, 100%': { boxShadow: '0 0 30px rgba(99, 130, 255, 0.12)' },
                    '50%': { boxShadow: '0 0 50px rgba(99, 130, 255, 0.22)' },
                },
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' },
                },
            },
        },
    },
    // Eski CSS bilan conflict bo'lmasin
    corePlugins: {
        preflight: false,
    },
    plugins: [],
}
