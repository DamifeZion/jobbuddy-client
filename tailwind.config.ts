import type { Config } from "tailwindcss";

const config = {
   darkMode: ["class"],

   content: [
      "./pages/**/*.{ts,tsx}",
      "./components/**/*.{ts,tsx}",
      "./app/**/*.{ts,tsx}",
      "./src/**/*.{ts,tsx}",
   ],

   prefix: "",

   theme: {
      container: {
         center: false,
         padding: "1.5rem",
      },

      extend: {
         screens: {
            300: "300px",
            400: "400px",
            500: "500px",
            600: "600px",
            700: "700px",
            800: "800px",
            900: "900px",
            1000: "1000px",
            1100: "1100px",
            1200: "1200px",
            1300: "1300px",
            1400: "1400px",
            1500: "1500px",
            "3xl": "1920px",
            "4xl": "2560px",
            "5xl": "3000px",
         },

         fontSize: {
            xsm: "12px",
            sm: "14px",
            md: "16px",
            lg: "18px",
            xl: "20px",
         },

         colors: {
            border: "hsl(var(--border))",
            input: "hsl(var(--input))",
            ring: "hsl(var(--ring))",
            background: "hsl(var(--background))",
            foreground: "hsl(var(--foreground))",
            white: "hsl(var(--white))",
            skyBlue: "hsl(var(--sky-blue))",
            premium: "hsl(var(--premium))",
            primary: {
               DEFAULT: "hsl(var(--primary))",
               foreground: "hsl(var(--primary-foreground))",
            },
            secondary: {
               DEFAULT: "hsl(var(--secondary))",
               foreground: "hsl(var(--secondary-foreground))",
            },
            destructive: {
               DEFAULT: "hsl(var(--destructive))",
               foreground: "hsl(var(--destructive-foreground))",
            },
            muted: {
               DEFAULT: "hsl(var(--muted))",
               foreground: "hsl(var(--muted-foreground))",
            },
            accent: {
               DEFAULT: "hsl(var(--accent))",
               foreground: "hsl(var(--accent-foreground))",
            },
            popover: {
               DEFAULT: "hsl(var(--popover))",
               foreground: "hsl(var(--popover-foreground))",
            },
            card: {
               DEFAULT: "hsl(var(--card))",
               foreground: "hsl(var(--card-foreground))",
            },
         },

         borderRadius: {
            "3xl": "calc(var(--radius) + 0.75rem)",
            "2xl": "calc(var(--radius) + 0.5rem)",
            "1xl": "calc(var(--radius) + 0.25rem)",
            xl: "calc(var(--radius) + 1rem)",
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
         },

         keyframes: {
            "accordion-down": {
               from: { height: "0" },
               to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
               from: { height: "var(--radix-accordion-content-height)" },
               to: { height: "0" },
            },
            "caret-blink": {
               "0%,70%,100%": { opacity: "1" },
               "20%,50%": { opacity: "0" },
            },
         },

         animation: {
            "accordion-down": "accordion-down 0.2s ease-out",
            "accordion-up": "accordion-up 0.2s ease-out",
            "caret-blink": "caret-blink 1.25s ease-out infinite",
         },
      },
   },
   plugins: [
      require("tailwindcss-animate"),
      require("tailwindcss-debug-screens"),
   ],
} satisfies Config;

export default config;
