#!/usr/bin/env node
// Programmatic Vite dev with Web Crypto available on globalThis
import { createServer } from 'vite'

try {
  const { webcrypto } = await import('node:crypto')
  if (webcrypto && !globalThis.crypto) {
    globalThis.crypto = webcrypto
  }
} catch {}

const server = await createServer()
await server.listen()
server.printUrls()

