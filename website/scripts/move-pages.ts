/**
 * This script moves pages or directories of pages to a new location.
 * It performs these operations in order:
 *
 * 1. Prepares the move using English locale:
 *    - Gets list of files to move (scanning directory if needed)
 *    - Errors if files would be overwritten (except _meta.js)
 *
 * 2. Moves files in all locales:
 *    - Creates destination directories as needed
 *    - Skips files that don't exist or would be overwritten
 *
 * 3. Runs `fix-pages-structure` to:
 *    - Clean up any orphaned directories
 *    - Create missing meta files
 *    - Ensure directory structure is consistent
 */

import { execFile } from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'

const execFileAsync = promisify(execFile)

const PAGES_DIRECTORY = path.join(process.cwd(), 'pages')
const SOURCE_LOCALE = 'en'
const META_FILENAME = '_meta.js'

type FileToMove = {
  sourcePath: string // Relative to locale directory
  destinationPath: string // Relative to locale directory
}

async function fileExists(filepath: string): Promise<boolean> {
  try {
    await fs.access(filepath)
    return true
  } catch {
    return false
  }
}

async function getSourceFiles(sourcePath: string): Promise<string[]> {
  const sourceDirectory = path.join(PAGES_DIRECTORY, SOURCE_LOCALE)
  const fullPath = path.join(sourceDirectory, sourcePath)

  if (!(await fileExists(fullPath))) {
    throw new Error(`Source path '${sourcePath}' does not exist in source locale (${SOURCE_LOCALE})`)
  }

  const fileStat = await fs.stat(fullPath)
  if (fileStat.isDirectory()) {
    const files: string[] = []

    async function scan(directory: string) {
      const items = await fs.readdir(directory, { withFileTypes: true })
      for (const item of items) {
        const itemPath = path.join(directory, item.name)
        if (item.isDirectory()) {
          await scan(itemPath)
        } else {
          files.push(path.relative(sourceDirectory, itemPath))
        }
      }
    }

    await scan(fullPath)
    return files
  }

  return [sourcePath]
}

async function main() {
  const [sourcePath, destinationDirectory] = process.argv.slice(2)
  if (!sourcePath || !destinationDirectory) {
    throw new Error(
      'Usage: pnpm run move-pages <source-path> <destination-directory>\n' +
        'Example: pnpm run move-pages creating-a-subgraph.mdx developing/guides\n' +
        'Example: pnpm run move-pages old-dir/nested new-dir/structure',
    )
  }

  // Normalize paths and validate destination is a directory
  const normalizedSource = path.normalize(sourcePath).replace(/^[/\\]|[/\\]$/g, '')
  const normalizedDestination = path.normalize(destinationDirectory).replace(/^[/\\]|[/\\]$/g, '')
  if (path.extname(normalizedDestination)) {
    throw new Error('Destination must be a directory (no file extension)')
  }

  // Get list of files to move from source locale
  const sourceFiles = await getSourceFiles(normalizedSource)

  // Build destination paths
  const isFile = (await fs.stat(path.join(PAGES_DIRECTORY, SOURCE_LOCALE, normalizedSource))).isFile()
  const filesToMove = sourceFiles.map((file) => {
    if (isFile) {
      // When moving a single file to a directory, keep the filename
      return {
        sourcePath: file,
        destinationPath: path.join(normalizedDestination, path.basename(file)),
      }
    } else {
      // When moving a directory, preserve the relative paths
      const relativePath = path.relative(normalizedSource, file)
      return {
        sourcePath: file,
        destinationPath: path.join(normalizedDestination, relativePath),
      }
    }
  })

  // Validate moves in English locale
  const sourceDirectory = path.join(PAGES_DIRECTORY, SOURCE_LOCALE)
  for (const { sourcePath, destinationPath } of filesToMove) {
    // Allow _meta.js files to exist in destination since we skip them during move if they exist
    if (path.basename(destinationPath) === META_FILENAME) {
      continue
    }

    // Don't allow overwriting existing files
    const destinationFile = path.join(sourceDirectory, destinationPath)
    if (await fileExists(destinationFile)) {
      throw new Error(`Destination path '${destinationPath}' already exists in source locale (${SOURCE_LOCALE})`)
    }
  }

  // Get all locales
  const locales = (await fs.readdir(PAGES_DIRECTORY)).filter((directory) => /^[a-z]{2}$/.test(directory))

  // Move files in each locale
  for (const locale of locales) {
    const localeDirectory = path.join(PAGES_DIRECTORY, locale)

    // First create all necessary destination directories
    const destinationDirs = new Set(filesToMove.map(({ destinationPath }) => path.dirname(destinationPath)))
    for (const dir of destinationDirs) {
      await fs.mkdir(path.join(localeDirectory, dir), { recursive: true })
    }

    // Then move the files
    for (const { sourcePath, destinationPath } of filesToMove) {
      const sourceFile = path.join(localeDirectory, sourcePath)
      const destinationFile = path.join(localeDirectory, destinationPath)

      // Skip if source doesn't exist or would overwrite an existing _meta.js
      if (
        !(await fileExists(sourceFile)) ||
        (path.basename(destinationPath) === META_FILENAME && (await fileExists(destinationFile)))
      ) {
        continue
      }

      console.log(`Moving ${path.join(locale, sourcePath)}`)
      console.log(`  to ${path.join(locale, destinationPath)}`)
      await fs.rename(sourceFile, destinationFile)
    }
    console.log() // Add blank line between locales
  }

  // Run fix-pages-structure to clean up and update meta files
  console.log('\nRunning fix-pages-structure...')
  await execFileAsync('tsx', ['scripts/fix-pages-structure.ts'])
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
