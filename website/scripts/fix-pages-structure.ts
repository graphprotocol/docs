/**
 * This script ensures that the pages directory structure is consistent across all locales.
 * It performs these operations in order:
 *
 * 1. Identifies directories in the English locale (`pages/en`) that have content files
 *    (e.g. .mdx, .md, or .json, but really any file that is not hidden or a meta file)
 *
 * 2. Ensures all those directories have a meta file (_meta.js)
 *
 * 3. Synchronizes directories in the other locales with English:
 *    - Creates matching directory structure
 *    - Creates missing _meta.js files and imports from English
 *    - Copies content files, excluding catch-all routes ([[...slug]].mdx)
 *    - Removes files that don't exist in English
 *
 * 4. Cleans up directories:
 *    - Deletes directories that have no content files in English
 *    - Keeps directories in other locales if they have content files in English
 *      (e.g. `graph-client`, which only has a catch-all route in English); this prevents
 *      referencing a non-existent directory in the meta file
 */

import fs from 'node:fs/promises'
import path from 'node:path'

const PAGES_DIRECTORY = path.join(process.cwd(), 'src/pages')
const SOURCE_LOCALE = 'en'
const META_FILENAME = '_meta.js'
const CATCH_ALL_PREFIX = '[[...'
const HIDDEN_FILE_PREFIX = '.'

async function fileExists(filepath: string): Promise<boolean> {
  try {
    await fs.access(filepath)
    return true
  } catch {
    return false
  }
}

function isContentFile(filename: string, excludeCatchAll = false) {
  return (
    filename !== META_FILENAME &&
    !filename.startsWith(HIDDEN_FILE_PREFIX) &&
    (!excludeCatchAll || !filename.startsWith(CATCH_ALL_PREFIX))
  )
}

type PagesStructure = {
  files: string[] // relative paths to all files
  contentDirectories: Set<string> // directories with content files
  directories: string[] // all directories for cleanup
}

async function getPagesStructure(locale: string): Promise<PagesStructure> {
  const localeDirectory = path.join(PAGES_DIRECTORY, locale)
  const files: string[] = []
  const directories: string[] = []

  async function scan(directory: string) {
    const items = await fs.readdir(directory, { withFileTypes: true })
    for (const item of items) {
      const fullPath = path.join(directory, item.name)
      if (item.isDirectory()) {
        directories.push(path.relative(localeDirectory, fullPath))
        await scan(fullPath)
      } else {
        files.push(path.relative(localeDirectory, fullPath))
      }
    }
  }

  await scan(localeDirectory)

  return {
    files,
    directories: directories.sort().reverse(),
    contentDirectories: new Set(
      files.filter((file) => isContentFile(path.basename(file))).map((file) => path.dirname(file)),
    ),
  }
}

async function fixPagesStructure() {
  const sourceDirectory = path.join(PAGES_DIRECTORY, SOURCE_LOCALE)
  const sourceStructure = await getPagesStructure(SOURCE_LOCALE)
  const translatedLocales = (await fs.readdir(PAGES_DIRECTORY))
    .filter((directory) => /^[a-z]{2}$/.test(directory))
    .filter((directory) => directory !== SOURCE_LOCALE)

  // Create/update meta files in source locale directories, except in the root
  for (const directory of sourceStructure.contentDirectories) {
    if (directory === '.') continue
    const sourceMetaPath = path.join(sourceDirectory, directory, META_FILENAME)
    if (!(await fileExists(sourceMetaPath))) {
      const filesInDirectory = sourceStructure.files
        .filter((file) => path.dirname(file) === directory && isContentFile(path.basename(file), true))
        .map((file) => path.basename(file, path.extname(file)))
      console.log(`Creating meta file ${path.join(SOURCE_LOCALE, directory, META_FILENAME)}`)
      await fs.writeFile(
        sourceMetaPath,
        `export default {\n${filesInDirectory.map((page) => `  '${page}': '',`).join('\n')}\n}\n`,
      )
    }
  }

  // Synchronize other locales
  for (const locale of translatedLocales) {
    const localeDirectory = path.join(PAGES_DIRECTORY, locale)
    const localeStructure = await getPagesStructure(locale)

    // Create directories and copy meta files from the source locale
    for (const directory of sourceStructure.contentDirectories) {
      if (directory === '.') continue
      const translatedDirectory = path.join(localeDirectory, directory)
      await fs.mkdir(translatedDirectory, { recursive: true })
      const sourceMetaPath = path.join(sourceDirectory, directory, META_FILENAME)
      const translatedMetaPath = path.join(translatedDirectory, META_FILENAME)
      let shouldCopy = true
      if (await fileExists(translatedMetaPath)) {
        try {
          const sourceContent = await fs.readFile(sourceMetaPath, 'utf8')
          const translatedContent = await fs.readFile(translatedMetaPath, 'utf8')
          shouldCopy = sourceContent !== translatedContent
        } catch {
          // If there's any error reading the files, we'll copy to be safe
          shouldCopy = true
        }
      }
      if (shouldCopy) {
        console.log(
          `Copying meta file from ${path.join(SOURCE_LOCALE, directory, META_FILENAME)} to ${path.join(
            locale,
            directory,
            META_FILENAME,
          )}`,
        )
        await fs.copyFile(sourceMetaPath, translatedMetaPath)
      }
    }

    // Copy missing files
    for (const file of sourceStructure.files) {
      const filename = path.basename(file)
      if (!localeStructure.files.includes(file) && isContentFile(filename, true)) {
        const sourcePath = path.join(sourceDirectory, file)
        const translatedPath = path.join(localeDirectory, file)
        await fs.mkdir(path.dirname(translatedPath), { recursive: true })
        console.log(`Copying ${path.join(SOURCE_LOCALE, file)} to ${path.join(locale, file)}`)
        await fs.copyFile(sourcePath, translatedPath)
      }
    }

    // Remove extra files
    for (const file of localeStructure.files) {
      const filename = path.basename(file)
      if (!sourceStructure.files.includes(file) && isContentFile(filename)) {
        const filePath = path.join(localeDirectory, file)
        console.log(`Removing ${path.join(locale, file)}`)
        await fs.unlink(filePath)
      }
    }
  }

  // Delete directories that have no content files in the source locale
  for (const locale of [SOURCE_LOCALE, ...translatedLocales]) {
    const { directories } = await getPagesStructure(locale)
    for (const directory of directories) {
      // Delete directory if it has no content files in source language AND none of its subdirectories have content files
      const existsInSource =
        sourceStructure.contentDirectories.has(directory) ||
        Array.from(sourceStructure.contentDirectories).some((sourceDir) => sourceDir.startsWith(directory + '/'))
      if (!existsInSource) {
        console.log(`Removing directory ${path.join(locale, directory)}`)
        await fs.rm(path.join(PAGES_DIRECTORY, locale, directory), { recursive: true, force: true })
      }
    }
  }
}

fixPagesStructure().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
