import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      "crust": '#11111b',
      "mantle": '#181825',
      "base": '#1e1e2e',
      "surface0": '#313244',
      "cpink": '#f5c2e7',
      "main-text": '#cdd6f4',
      "mognolia": '#f3eff5',
      "cfooter": '#181923',
    },
  },
  plugins: [],
}
export default config
