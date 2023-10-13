import { readFile, writeFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { join } from 'node:path'

const require = createRequire(import.meta.url)
const __dirname = new URL('.', import.meta.url).pathname

await writeFile(
  join(__dirname, '../vender/index_bg.wasm'),
  await readFile(require.resolve('@resvg/resvg-wasm/index_bg.wasm')),
)

// eslint-disable-next-line no-console
console.log('✅  @resvg/resvg-wasm/index_bg.wasm copied!')
