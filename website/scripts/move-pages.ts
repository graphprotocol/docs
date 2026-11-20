/**
 * This script moves and/or renames pages or directories of pages.
 * It performs these operations in order:
 *
 * 1. Prepares the move using English locale:
 *    - Gets list of files to move (scanning directory if needed)
 *    - Errors if files would be overwritten (except _meta.js)
 *
 * 2. Moves files in all locales:
 *    - Creates destination directories as needed
 *    - Skips files that don't exist or would be overwritten
 *    - When moving a directory, moves _meta.js in English (it will be recreated in other locales by `fix-pages-structure`)
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

const PAGES_DIRECTORY = path.join(process.cwd(), 'src/pages')
const SOURCE_LOCALE = 'en'
const META_FILENAME = '_meta.js'

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

async function movePages() {
  const [sourcePath, destinationPath] = process.argv.slice(2)
  if (!sourcePath || !destinationPath) {
    throw new Error(
      'Usage: pnpm run move-pages <source-path> <destination>\n' +
        'Examples:\n' +
        '  pnpm run move-pages page.mdx new-directory             Move page (keeping name)\n' +
        '  pnpm run move-pages page.mdx new-name.mdx              Rename page\n' +
        '  pnpm run move-pages page.mdx new-dir/new-name.mdx      Move and rename page\n' +
        '  pnpm run move-pages developing subgraphs/developing    Move directory\n' +
        '  pnpm run move-pages developing subgraphs               Rename directory\n',
    )
  }

  // Normalize paths
  const normalizedSource = path.normalize(sourcePath).replace(/^[/\\]|[/\\]$/g, '')
  const normalizedDestination = path.normalize(destinationPath).replace(/^[/\\]|[/\\]$/g, '')

  // Get list of files to move from source locale
  const sourceFiles = await getSourceFiles(normalizedSource)

  // Build destination paths
  const isFile = (await fs.stat(path.join(PAGES_DIRECTORY, SOURCE_LOCALE, normalizedSource))).isFile()
  const filesToMove = sourceFiles.map((file) => {
    if (isFile) {
      // When moving a single file:
      // - If destination has extension, use it as the new filename
      // - Otherwise treat destination as directory and keep original filename
      const destinationHasExtension = path.extname(normalizedDestination) !== ''
      const newPath = destinationHasExtension
        ? normalizedDestination
        : path.join(normalizedDestination, path.basename(file))

      return {
        sourcePath: file,
        destinationPath: newPath,
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

  // Validate moves in the source locale
  const sourceDirectory = path.join(PAGES_DIRECTORY, SOURCE_LOCALE)
  for (const { destinationPath } of filesToMove) {
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

      // Skip if source doesn't exist or destination would be overwritten
      if (!(await fileExists(sourceFile)) || (await fileExists(destinationFile))) {
        continue
      }

      // For translations, skip _meta.js (they'll be recreated by `fix-pages-structure`)
      // For the source locale, move _meta.js to preserve customizations
      if (locale !== SOURCE_LOCALE && path.basename(destinationPath) === META_FILENAME) {
        continue
      }

      console.log(`Moving ${path.join(locale, sourcePath)}`)
      console.log(`  to ${path.join(locale, destinationPath)}`)
      await fs.rename(sourceFile, destinationFile)
    }
    console.log() // Add blank line between locales
  }

  // Run `fix-pages-structure` to clean up and update meta files
  console.log('\nRunning fix-pages-structure...')
  await execFileAsync('tsx', ['scripts/fix-pages-structure.ts'])
}

movePages().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
