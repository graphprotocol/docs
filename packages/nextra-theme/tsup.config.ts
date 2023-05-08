import { defineConfig } from 'tsup'

import tsconfig from './tsconfig.json'

export default defineConfig({
  name: 'nextra-theme',
  entry: ['src/index.tsx'],
  format: 'esm',
  dts: true,
  external: ['react'],
  outExtension: () => ({ js: '.js' }),
  target: tsconfig.compilerOptions.target as 'es2016',
})
