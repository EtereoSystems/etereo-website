import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // multi-page: projects/index.html builds to dist/projects/index.html, which
    // Apache serves at /projects/ with no rewrite rules and no client router
    rollupOptions: {
      input: {
        main: "index.html",
        projects: "projects/index.html",
        about: "about/index.html",
        blog: "blog/index.html",
      },
    },
  },
})
