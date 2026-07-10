/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#D2B48C",
          foreground: "#FFFFFF",
          hover: "#BE9C72",
        },
        secondary: {
          DEFAULT: "#F8F4EF",
          foreground: "#222222",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#F8F4EF",
          foreground: "#666666",
        },
        accent: {
          DEFAULT: "#F8F4EF",
          foreground: "#222222",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#222222",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#222222",
        },
        surface: "#FFFFFF",
        cream: "#F8F4EF",
        charcoal: "#222222",
        tan: "#D2B48C",
        "tan-hover": "#BE9C72",
        divider: "#E7DED2",
      },
      borderRadius: {
        'sm': 'calc(var(--radius) - 2px)',
        'DEFAULT': 'var(--radius)',
        'md': 'var(--radius)',
        'lg': 'calc(var(--radius) + 2px)',
        'xl': 'calc(var(--radius) + 4px)',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(210, 180, 140, 0.06), 0 1px 3px 0 rgba(34, 34, 34, 0.03)',
        'DEFAULT': '0 2px 8px -1px rgba(34, 30, 26, 0.04), 0 1px 3px -1px rgba(34, 30, 26, 0.02)',
        'md': '0 4px 16px -2px rgba(34, 30, 26, 0.05), 0 2px 8px -1px rgba(34, 30, 26, 0.03)',
        'lg': '0 12px 24px -4px rgba(34, 30, 26, 0.06), 0 4px 12px -2px rgba(34, 30, 26, 0.04)',
        'xl': '0 20px 32px -6px rgba(34, 30, 26, 0.07), 0 8px 20px -4px rgba(34, 30, 26, 0.04)',
        '2xl': '0 24px 48px -12px rgba(34, 30, 26, 0.08)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.01)',
      },

      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: 0, transform: "translateX(-50px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: 0, transform: "translateX(50px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(210, 180, 140, 0.25)" },
          "50%": { boxShadow: "0 0 40px rgba(210, 180, 140, 0.45)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-in-left": "slide-in-left 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.6s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Butler', 'Poppins', 'Georgia', 'serif'],
        butler: ['Butler', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
}
