// vite.config.ts

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const newMap: { [key: string]: string | undefined } = {}
  Object.entries(env).forEach(([k, v]) => {
    if (k.startsWith("VITE_")) {
      newMap[`process.env.${k}`] = v || undefined;
    }
  })
  process.env = Object.assign(process.env, newMap)

  return {
    plugins: [react()],
    optimizeDeps: {
      include: ['@emotion/styled'],
    },
  }
})