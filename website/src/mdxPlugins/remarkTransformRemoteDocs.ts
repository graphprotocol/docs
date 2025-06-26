import type { Heading, Link, Root, Yaml } from 'mdast'
import path from 'node:path'
import { EXIT, visit } from 'unist-util-visit'
import type { VFile } from 'vfile'

import { ENGLISH_PAGES_DIRECTORY, REMOTE_DOCS_REPOS } from '../remoteDocs'

const EXTERNAL_LINK_REGEX = /^(https?:)?\/\//

export default function remarkTransformRemoteDocs() {
  return (tree: Root, file: VFile) => {
    // Only continue if the current file may have been fetched from one of the remote docs repos
    const filePath = file.history[0]
    if (!filePath) return
    const docsAbsolutePath = `/${path.relative(ENGLISH_PAGES_DIRECTORY, filePath)}`
    const repo = REMOTE_DOCS_REPOS.find((repo) => docsAbsolutePath.startsWith(repo.basePath))
    if (!repo) return
    const docsRelativePath = docsAbsolutePath.substring(repo.basePath.length)

    // Rewrite relative links to ensure they work
    visit(tree, 'link', (node: Link) => {
      // Handle links that go up one or more directories, e.g. (foo)[../bar]
      if (node.url.startsWith('../')) {
        // Count how many levels up we're trying to go by counting leading `..` segments
        const upCount = node.url.split('/').findIndex((segment) => segment !== '..')
        // Count how many levels up we're allowed to go while staying in the docs
        const maxUpCount = docsRelativePath.split('/').filter(Boolean).length - 1
        if (upCount > maxUpCount) {
          // Going up beyond our docs root, transform to GitHub URL
          node.url = `https://github.com/${path.join(
            `${repo.user}/${repo.name}/tree/${repo.branch}/${repo.docsPath}${path.dirname(docsRelativePath)}`,
            node.url,
          )}`
          return
        }
      }
      // Stop here if the link is external (including if rewritten from above), internal but absolute, or an anchor on the current page
      if (EXTERNAL_LINK_REGEX.test(node.url) || node.url.startsWith('/') || node.url.startsWith('#')) {
        return
      }
      // Handle other links that are relative to the current path (e.g. (foo)[bar], (foo)[./bar], or even (foo)[../bar] if still within the docs)
      node.url = path.join(repo.basePath, path.dirname(docsRelativePath), node.url)
    })

    // Replace h1 with YAML frontmatter
    visit(tree, { type: 'heading', depth: 1 }, (node: Heading) => {
      const firstChild = node.children[0]
      if (!firstChild || !('value' in firstChild)) return
      const yamlNode = node as unknown as Yaml
      yamlNode.type = 'yaml'
      yamlNode.value = `title: "${firstChild.value}"
remotePageUrl: https://github.com/${repo.user}/${repo.name}/tree/${repo.branch}/${repo.docsPath}${docsRelativePath}`
      // @ts-expect-error: Removing heading properties when converting to YAML
      delete yamlNode.depth
      // @ts-expect-error: Removing heading properties when converting to YAML
      delete yamlNode.children
      delete yamlNode.position
      return EXIT // stop traversing in case there are other h1 nodes
    })
  }
}
