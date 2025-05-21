import colors from "tailwindcss/colors"
import { type Config } from "tailwindcss"

const config: Config = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.violet,       // основной акцент (фиолетовый)
        secondary: colors.indigo,     // вторичный (синий)
        background: colors.zinc,      // для тёмных и светлых блоков
      },
    },
  },
  plugins: [],
}
export default config