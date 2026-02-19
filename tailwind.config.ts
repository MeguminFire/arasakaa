import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        body: ['"Inter"', 'sans-serif'],
        headline: ['"Inter"', 'sans-serif'],
        code: ['"Share Tech Mono"', 'monospace'],
        michroma: ['"Michroma"', 'sans-serif'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        'neon-red': '0 0 5px hsl(var(--destructive)), 0 0 10px hsl(var(--destructive)), 0 0 15px hsl(var(--destructive))',
        'neon-red-card': '0 0 8px hsl(var(--destructive) / 0.7)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'text-focus-in': {
          '0%': {
            filter: 'blur(8px)',
            opacity: '0',
          },
          '100%': {
            filter: 'blur(0px)',
            opacity: '1',
          },
        },
        'glitch': {
            '0%': { transform: 'translate(0)' },
            '20%': { transform: 'translate(-1px, 1px)' },
            '40%': { transform: 'translate(-1px, -1px)' },
            '60%': { transform: 'translate(1px, 1px)' },
            '80%': { transform: 'translate(1px, -1px)' },
            '100%': { transform: 'translate(0)' },
        },
        'scroll-text': {
          'from': { transform: 'translateY(0)' },
          'to': { transform: 'translateY(-50%)' },
        },
        'fill-progress': {
          'from': { width: '0%' },
          'to': { width: '100%' },
        },
        'hacker-glitch': {
          '0%, 100%': {
            color: 'hsl(var(--destructive))',
            textShadow: '0 0 5px hsl(var(--destructive)), 0 0 10px hsl(var(--destructive))',
            transform: 'skewX(0deg)',
          },
          '25%': {
            color: 'hsl(var(--foreground))',
            textShadow: 'none',
            transform: 'skewX(-3deg)',
          },
          '50%': {
            color: 'hsl(var(--destructive))',
            textShadow: '0 0 2px hsl(var(--destructive))',
            transform: 'skewX(3deg)',
          },
          '75%': {
            color: 'hsl(var(--foreground))',
            textShadow: 'none',
            transform: 'skewX(0deg)',
          },
        },
        'flicker': {
            '0%, 100%': { opacity: '1' },
            '98.5%': { opacity: '1' },
            '99%': { opacity: '0.97' },
            '99.5%': { opacity: '1' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'text-focus-in': 'text-focus-in 1s cubic-bezier(0.550, 0.085, 0.680, 0.530) both',
        'glitch': 'glitch 0.15s linear infinite',
        'scroll-text': 'scroll-text 20s linear infinite',
        'fill-progress': 'fill-progress 1s ease-in-out forwards',
        'hacker-glitch': 'hacker-glitch 1.5s ease-in-out infinite',
        'flicker': 'flicker 4s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
