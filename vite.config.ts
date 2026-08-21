import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const entry = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // repo name: thanet-profile-
  base: '/thanet-profile-/',
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      // multi-page: the portfolio plus one HTML entry per case study,
      // so each case study gets a real URL instead of a hash route
      input: {
        main: entry('index.html'),
        'gitlab-migration': entry('case-studies/gitlab-migration.html'),
        hauction: entry('case-studies/hauction.html'),
      },
    },
  },
})
