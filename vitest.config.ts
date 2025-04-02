import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    watch: false,
    silent: true,
    include: [
      "tests/**/*.test.ts"
    ],
    env: {
      API_HOST: "http://localhost:5000",
      API_TOKEN: "xablau",
    },
  },
})