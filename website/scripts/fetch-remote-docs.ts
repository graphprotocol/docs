import fs from 'node:fs/promises'
import path from 'node:path'

import { ENGLISH_PAGES_DIRECTORY, REMOTE_DOCS_REPOS, type RemoteDocsRepo } from '../src/remoteDocs'

async function fetchRemoteDocs(repo: RemoteDocsRepo) {
  const url = `https://api.github.com/repos/${repo.user}/${repo.name}/git/trees/${repo.branch}?recursive=1`
  const response = await fetch(url)
  const data = await response.json()
  if (data.message) {
    console.error('❌ GitHub API rate limit exceeded, skipping…', JSON.stringify(data, null, 2))
    process.exit(0)
  }

  const docsRelativePaths = (data.tree as { path: string }[]).flatMap(({ path }) =>
    path.startsWith(repo.docsPath) && path.endsWith('.md') ? [path.substring(repo.docsPath.length)] : [],
  )

  for (const docsRelativePath of docsRelativePaths) {
    const response = await fetch(
      `https://raw.githubusercontent.com/${repo.user}/${repo.name}/${repo.branch}/${repo.docsPath}${docsRelativePath}`,
    )
    if (!response.ok) {
      throw new Error(`Failed to fetch remote file. ${response.status} ${response.statusText}`)
    }
    const text = await response.text()
    const filePath = path.join(ENGLISH_PAGES_DIRECTORY, repo.basePath, docsRelativePath)
    const outputDir = path.dirname(filePath)
    await fs.mkdir(outputDir, { recursive: true })
    await fs.writeFile(filePath, text)
    console.log(
      `Saved remote file ${repo.user}/${repo.name}/${repo.branch}/${repo.docsPath}${docsRelativePath} to ${path.relative(process.cwd(), outputDir)}`,
    )
  }
}

for (const repo of REMOTE_DOCS_REPOS) {
  await fetchRemoteDocs(repo)
}
