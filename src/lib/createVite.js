// In createVite.js
import fs from 'fs-extra'
import path from 'path'

export default async function createVite(targetDir) {
    const viteConfigPath = path.join(targetDir, 'vite.config.js')
    const viteConfigContent = `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})
`
    await fs.outputFile(viteConfigPath, viteConfigContent)
}
