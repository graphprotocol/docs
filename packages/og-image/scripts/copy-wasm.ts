import { readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import path from 'node:path'

const require = createRequire(import.meta.url)
const __dirname = new URL('.', import.meta.url).pathname

await writeFile(
  path.join(__dirname, '../vendor/index_bg.wasm'),
  await readFile(require.resolve('@resvg/resvg-wasm/index_bg.wasm')),
)

console.log('✅  @resvg/resvg-wasm/index_bg.wasm copied!')
