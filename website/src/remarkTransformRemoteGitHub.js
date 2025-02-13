import path from 'path'

import { EXIT, visit } from 'unist-util-visit'

const GITHUB_DATA = {
  'graph-ts': {
    user: 'graphprotocol',
    repo: 'graph-tooling',
    branch: 'main',
    docsPath: 'packages/ts/',
    basePath: '/subgraphs/developing/creating/graph-ts/',
  },
  'graph-client': {
    user: 'graphprotocol',
    repo: 'graph-client',
    branch: 'main',
    docsPath: 'docs/',
    basePath: '/subgraphs/querying/graph-client/',
  },
}

const GO_BACK_REPEATED_REGEX = /(\.\.\/)+/

const EXTERNAL_LINK_REGEX = /^(https?:)?\/\//

export const remarkTransformRemoteGitHub = () => (tree, file) => {
  // Rewrite relative links to ensure they work
  const filePath = path.relative(process.cwd(), file.history[0])
  const [fileName, directory] = filePath.split('/').reverse()

  const data = GITHUB_DATA[directory]

  if (!data) {
    return
  }

  const { user, repo, branch, basePath, docsPath } = data

  visit(tree, 'link', (node) => {
    if (node.url.startsWith('../')) {
      node.url = node.url.replace(GO_BACK_REPEATED_REGEX, `https://github.com/${user}/${repo}/tree/${branch}/`)
    }
    // Skip external links and same-page anchor links
    if (EXTERNAL_LINK_REGEX.test(node.url) || node.url.startsWith('#')) {
      return
    }
    if (node.url.startsWith('/')) {
      // Relative to the base path, e.g. (foo)[/bar]
      node.url = node.url.replace('/', basePath)
    } else {
      // Relative to the current path, e.g. (foo)[bar] or (foo)[./bar] or (foo)[../bar]
      node.url = path.join(basePath + path.dirname(fileName), node.url)
    }
  })

  visit(tree, { type: 'heading', depth: 1 }, (node) => {
    // Replace h1 with YAML frontmatter
    node.type = 'yaml'
    node.value = `title: "${node.children[0].value}"
remotePageUrl: https://github.com/${user}/${repo}/tree/${branch}/${docsPath}${fileName}`
    delete node.depth
    delete node.children
    delete node.position

    return EXIT // stop traversing in case there are other h1 nodes
  })
}
