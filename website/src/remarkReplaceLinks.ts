import { Root } from 'mdast'
import path from 'node:path'
import { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

export const remarkReplaceLinks: Plugin<[{ foundPath: string; basePath: string }], Root> = ({
  foundPath,
  basePath,
}) => {
  if (!foundPath) throw new Error('remarkReplaceLinks: foundPath is required')
  if (!basePath) throw new Error('remarkReplaceLinks: basePath is required')

  return (tree, _file, done) => {
    // Rewrite relative links to ensure they work
    visit(tree, 'link', (node) => {
      // Skip external links and same-page anchor links
      if (/^(https?:)?\/\//.test(node.url) || node.url.startsWith('#')) {
        return
      }
      if (node.url.startsWith('/')) {
        // Relative to the base path, e.g. (foo)[/bar]
        node.url = node.url.replace('/', basePath)
      } else {
        // Relative to the current path, e.g. (foo)[bar] or (foo)[./bar] or (foo)[../bar]
        node.url = path.join(path.dirname(foundPath), node.url)
      }
    })
    done()
  }
}
