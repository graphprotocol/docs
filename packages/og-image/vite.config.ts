import { defaultExclude, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    setupFiles: 'setup-file.ts',
    exclude: [...defaultExclude, '**/*.d.ts'],
  },
})
