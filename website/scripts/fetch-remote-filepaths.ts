/* eslint-disable no-console */
import fs from 'node:fs/promises'
import path from 'node:path'
import prettier from 'prettier'

type Params = {
  user: string
  repo: string
  branch: string
  docsPath: string
  outputPath: string
}

async function fetchRemoteFilePaths({ user, repo, branch, docsPath, outputPath }: Params): Promise<void> {
  const url = `https://api.github.com/repos/${user}/${repo}/git/trees/${branch}?recursive=1`
  const response = await fetch(url)

  const data = await response.json()
  if (data.message) {
    console.error('❌ GitHub API rate limit exceeded, skipping…', JSON.stringify(data, null, 2))
    process.exit(0)
  }
  const filePaths = (data.tree as { path: string }[])
    .filter((item) => item.path.startsWith(docsPath))
    .map((item) => item.path.replace(docsPath, ''))

  const result = {
    user,
    repo,
    branch,
    docsPath,
    filePaths: filePaths.filter((filePath) => /\.mdx?$/.test(filePath)),
  }
  const json = JSON.stringify(result, null, 2)

  await fs.writeFile(outputPath, prettier.format(json, { parser: 'json' }), 'utf8')

  console.log(`✅ Remote files from "${url}" saved!`)
}

fetchRemoteFilePaths({
  user: 'streamingfast',
  repo: 'substreams',
  branch: 'develop',
  docsPath: 'docs/',
  outputPath: path.join(process.cwd(), 'remote-files', 'substreams.json'),
})
