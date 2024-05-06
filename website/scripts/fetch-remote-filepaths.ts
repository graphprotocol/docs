import fs from 'node:fs/promises'
import path from 'node:path'

type Params = {
  user: string
  repo: string
  branch: string
  docsPath: string
  outputPath: string
  filterDocs?: (filePath: string) => boolean
}

async function fetchRemoteFilePaths({ user, repo, branch, docsPath, outputPath, filterDocs }: Params): Promise<void> {
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
  if (filterDocs) {
    result.filePaths = result.filePaths.filter(filterDocs)
  }
  const json = JSON.stringify(result, null, 2)

  await fs.writeFile(outputPath, json, 'utf8')

  console.log(`✅ Remote files from "${url}" saved!`)
}

await fetchRemoteFilePaths({
  user: 'graphprotocol',
  repo: 'graph-client',
  branch: 'main',
  docsPath: 'docs/',
  outputPath: path.join(process.cwd(), 'remote-files', 'graph-client.json'),
})

await fetchRemoteFilePaths({
  user: 'graphprotocol',
  repo: 'graph-tooling',
  branch: 'main',
  docsPath: 'packages/ts/',
  outputPath: path.join(process.cwd(), 'remote-files', 'graph-ts.json'),
})
