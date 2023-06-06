import path from 'node:path'
import { visit } from 'unist-util-visit'

export const remarkReplaceLinks = ({ foundPath, basePath }: { foundPath: string; basePath: string }) => {
  if (!foundPath) throw new Error('remarkReplaceLinks: foundPath is required')
  if (!basePath) throw new Error('remarkReplaceLinks: basePath is required')
  return (tree, _file, done) => {
    // enhance links
    visit(tree, 'link', (node) => {
      const EXTERNAL_LINK_REGEX = /^https?:\/\//
      if (node.url.startsWith('/')) {
        // (foo)[/foo/bar]
        node.url = node.url.replace('/', basePath)
      } else if (!EXTERNAL_LINK_REGEX.test(node.url)) {
        // (foo)[foo.md] or (foo)[./foo.md] or (foo)[../foo.md]
        node.url = path.join(path.dirname(foundPath), node.url)
      }
    })
    done()
  }
}
