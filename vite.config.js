import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Ensure Node has Web Crypto API available for tooling expecting browser-like crypto
try {
  // eslint-disable-next-line n/no-unsupported-features/node-builtins
  const { webcrypto } = await import('node:crypto')
  if (webcrypto && !globalThis.crypto) {
    // attach once to avoid surprises
    // @ts-ignore
    globalThis.crypto = webcrypto
  }
} catch {}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})

