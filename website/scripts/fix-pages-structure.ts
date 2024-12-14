/**
 * This script maintains consistency across different language versions of documentation pages.
 * It performs these operations:
 * 1. If a page exists in English (en) but is missing in other languages,
 *    it copies the English version to those languages
 * 2. If a page exists in other languages but not in English,
 *    it removes those pages (as English is the source of truth)
 * 3. Ensures each directory has a _meta.js file:
 *    - For English: lists all pages in that directory
 *    - For other languages: imports and extends the English version
 */

import fs from 'fs/promises'
import path from 'path'

const PAGES_DIR = path.join(process.cwd(), 'pages')
const SOURCE_LANG = 'en'
const META_FILENAME = '_meta.js'
const FORCE_META = process.argv.includes('--force-meta')

async function getFiles(dir: string): Promise<string[]> {
  const files: string[] = []

  async function scan(directory: string) {
    const items = await fs.readdir(directory, { withFileTypes: true })
    for (const item of items) {
      const fullPath = path.join(directory, item.name)
      if (item.isDirectory()) {
        await scan(fullPath)
      } else {
        files.push(fullPath)
      }
    }
  }

  await scan(dir)
  return files
}

type SourceMetaOptions = {
  files: string[]
  baseDir: string
}

type TranslationMetaOptions = {
  depth: number
  pathAfterLang: string
}

function createMetaContent(type: 'source' | 'translation', options: SourceMetaOptions | TranslationMetaOptions) {
  if (type === 'source') {
    const { files, baseDir } = options as SourceMetaOptions
    const pages = files
      .map((f) => path.relative(baseDir, f))
      .map((f) => path.basename(f, path.extname(f)))
      .filter((f) => f !== path.basename(META_FILENAME, '.js'))
      .filter((f) => !f.startsWith('[[...'))
    return `export default {\n${pages.map((page) => `  '${page}': '',`).join('\n')}\n}\n`
  }

  const createTranslationMeta = (importPath: string) =>
    `import meta from '${importPath}'\n\nexport default {\n  ...meta,\n}\n`

  const { depth, pathAfterLang } = options as TranslationMetaOptions
  const importPath = path.posix.join('../'.repeat(depth), 'en', pathAfterLang, META_FILENAME)
  return createTranslationMeta(importPath)
}

async function main() {
  const langs = (await fs.readdir(PAGES_DIR)).filter((dir) => /^[a-z]{2}$/.test(dir))
  const sourceDir = path.join(PAGES_DIR, SOURCE_LANG)
  const sourceFiles = await getFiles(sourceDir)

  for (const lang of langs) {
    if (lang === SOURCE_LANG) continue
    const langDir = path.join(PAGES_DIR, lang)
    await fs.mkdir(langDir, { recursive: true })

    // Get all directories from source files
    const directories = new Set(sourceFiles.map((f) => path.dirname(path.relative(sourceDir, f))))

    // Process each directory
    for (const dir of directories) {
      const targetDir = path.join(langDir, dir)
      await fs.mkdir(targetDir, { recursive: true })

      // Create meta files
      const sourceMetaPath = path.join(sourceDir, dir, META_FILENAME)
      const targetMetaPath = path.join(targetDir, META_FILENAME)

      // For source (English) meta
      if (FORCE_META || !(await fileExists(sourceMetaPath))) {
        const filesInDir = sourceFiles.filter((f) => path.dirname(path.relative(sourceDir, f)) === dir)
        await fs.writeFile(
          sourceMetaPath,
          createMetaContent('source', {
            files: filesInDir,
            baseDir: path.join(sourceDir, dir),
          }),
        )
      }

      // For translation meta
      if (FORCE_META || !(await fileExists(targetMetaPath))) {
        const relativeDir = path.relative(PAGES_DIR, targetDir)
        const depth = relativeDir.split(path.sep).length
        const pathAfterLang = relativeDir.split(path.sep).slice(1).join('/')
        await fs.writeFile(
          targetMetaPath,
          createMetaContent('translation', {
            depth,
            pathAfterLang,
          }),
        )
      }
    }

    // Sync files
    const langFiles = await getFiles(langDir)
    const relativeSourceFiles = sourceFiles.map((f) => path.relative(sourceDir, f))
    const relativeTargetFiles = langFiles.map((f) => path.relative(langDir, f))

    // Copy missing files
    for (const file of relativeSourceFiles) {
      if (
        !relativeTargetFiles.includes(file) &&
        path.basename(file) !== META_FILENAME &&
        !path.basename(file).startsWith('[[...')
      ) {
        const sourcePath = path.join(sourceDir, file)
        const targetPath = path.join(langDir, file)
        await fs.mkdir(path.dirname(targetPath), { recursive: true })
        console.log(`Copying ${file} to ${lang}`)
        await fs.copyFile(sourcePath, targetPath)
      }
    }

    // Remove extra files
    for (const file of relativeTargetFiles) {
      if (!relativeSourceFiles.includes(file) && path.basename(file) !== META_FILENAME) {
        const filePath = path.join(langDir, file)
        console.log(`Removing ${file} from ${lang}`)
        await fs.unlink(filePath)
      }
    }
  }
}

// Helper function to check if file exists
async function fileExists(filepath: string) {
  try {
    await fs.access(filepath)
    return true
  } catch {
    return false
  }
}

main().catch(console.error)
