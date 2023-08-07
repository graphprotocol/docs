import { XMLParser } from 'fast-xml-parser'
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import config from '../next.config.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml')
const lockfilePath = path.join(__dirname, '..', 'route-lockfile.txt')

async function main() {
  const parser = new XMLParser()

  const d = parser.parse(await fs.readFile(sitemapPath, 'utf8'))

  // TODO: `process.env.SITE_URL` never seems to be set here, so it always falls back to the default value
  const routes = d.urlset.url.map((url) => url.loc.replace(process.env.SITE_URL || 'https://thegraph.com/docs', ''))

  const redirectsPointingToNonExistingStuff = []

  const redirects = await config.redirects()

  for (const redirect of redirects) {
    if (routes.includes(redirect.destination) === false) {
      redirectsPointingToNonExistingStuff.push(redirect)
    }
    routes.push(`${redirect.source} -> ${redirect.destination}`)
  }

  if (redirectsPointingToNonExistingStuff.length) {
    console.error(
      `The following routes do not point to a route:\n\n` +
        redirectsPointingToNonExistingStuff.map((redirect) => `- "${redirect.source}" -> "${redirect.destination}"`) +
        `\n`,
    )
    throw new Error('Redirect pointing to nothing.')
  }

  await fs.writeFile(lockfilePath, routes.sort().join('\n') + '\n', 'utf8')
}

main()
