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

async function fetchRemoteDocs({ user, repo, branch, docsPath, outputPath, filterDocs }: Params) {
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
    filePaths: filePaths.filter((filePath) => filePath.endsWith('.md')),
  }
  if (filterDocs) {
    result.filePaths = result.filePaths.filter(filterDocs)
  }
  for (const fp of result.filePaths) {
    const response = await fetch(`https://raw.githubusercontent.com/${user}/${repo}/${branch}/${docsPath}${fp}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch remote file. ${response.status} ${response.statusText}`)
    }
    const text = await response.text()
    const filePath = path.join(outputPath, fp)
    await fs.writeFile(filePath, text)
    console.log(
      `Saved remote file ${user}/${repo}/${branch}/${docsPath}${fp} to ${path.relative(process.cwd(), path.dirname(filePath))}`,
    )
  }
}

await fetchRemoteDocs({
  user: 'graphprotocol',
  repo: 'graph-tooling',
  branch: 'main',
  docsPath: 'packages/ts/',
  outputPath: path.join(process.cwd(), 'src/pages/en/subgraphs/developing/creating/graph-ts'),
})

await fetchRemoteDocs({
  user: 'graphprotocol',
  repo: 'graph-client',
  branch: 'main',
  docsPath: 'docs/',
  outputPath: path.join(process.cwd(), 'src/pages/en/subgraphs/querying/graph-client'),
})
