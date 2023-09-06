import { Root } from 'mdast'
import { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

export const remarkReplaceImages: Plugin<[{ assetsBasePath: string }], Root> = ({ assetsBasePath }) => {
  if (!assetsBasePath) throw new Error('remarkReplaceImages: assetsBasePath is required')

  return (tree, _file, done) => {
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
            `https://raw.githubusercontent.com/${assetsBasePath}.gitbook/assets/`,
          )
        }
      },
    )
    visit(tree, 'image', (node) => {
      if (node.url.includes('../assets/')) {
        node.url = node.url.replace(/.*\.\.\/assets\//, `https://raw.githubusercontent.com/${assetsBasePath}assets/`)
      }
    })
    done()
  }
}
