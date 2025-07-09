// vite.config.ts

import path from "path" // Importe o 'path'
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // Adicione o alias aqui
      "@": path.resolve(__dirname, "./src"),
    },
  },
})