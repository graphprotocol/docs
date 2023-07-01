import { Root } from 'mdast'
import path from 'node:path'
import { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

export const remarkReplaceLinks: Plugin<
  [
    {
      foundPath: string
      basePath: string
      assetsBasePath: string
    }
  ],
  Root
> = ({ foundPath, basePath, assetsBasePath }) => {
  if (!foundPath) throw new Error('remarkReplaceLinks: foundPath is required')
  if (!basePath) throw new Error('remarkReplaceLinks: basePath is required')
  if (!assetsBasePath) throw new Error('remarkReplaceLinks: assetsBasePath is required')

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
    visit(
      tree,
      [
        { type: 'mdxJsxTextElement', name: 'img' },
        { type: 'mdxJsxFlowElement', name: 'img' },
      ],
      (node: any) => {
        const attrs = node.attributes as { name: string; value: string }[]
        const srcAttr = attrs.find((attr) => attr.name === 'src')!
        if (srcAttr.value.includes('.gitbook/assets/')) {
          srcAttr.value = srcAttr.value.replace(
            /.*\.gitbook\/assets\//,
            `https://raw.githubusercontent.com/${assetsBasePath}.gitbook/assets/`
          )
        }
      }
    )
    visit(tree, 'image', (node) => {
      if (node.url.includes('../assets/')) {
        node.url = node.url.replace(/.*\.\.\/assets\//, `https://raw.githubusercontent.com/${assetsBasePath}/assets/`)
      }
    })
    done()
  }
}
