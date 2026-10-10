/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'

// grain.school is served from the domain root; SCHOOL_BASE overrides for other hosts.
export default defineConfig({
  base: process.env.SCHOOL_BASE ?? './',
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: { target: 'es2022' },
  test: { environment: 'node' },
})
