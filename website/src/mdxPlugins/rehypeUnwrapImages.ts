import type { Element, Node, Root } from 'hast'
import { whitespace } from 'hast-util-whitespace'
import type { MdxJsxFlowElement, MdxJsxTextElement } from 'mdast-util-mdx-jsx'
import { SKIP, visit } from 'unist-util-visit'

function isElement(node: Node): node is Element {
  return node.type === 'element'
}

function isMdxElement(node: Node): node is MdxJsxFlowElement | MdxJsxTextElement {
  return node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement'
}

function isImage(node: Node): boolean {
  return (isElement(node) && node.tagName === 'img') || (isMdxElement(node) && node.name === 'img')
}

/**
 * This plugin does two things:
 * 1. Removes the `p` tag when it only contains images (and whitespace)
 * 2. Adds data attributes to help with image rendering:
 *    - `data-wrapping-image` to links that contain an image
 *    - `data-inline-image` to images that are in a paragraph with other content (text, links, etc.)
 */
export default function rehypeUnwrapImages() {
  return function (tree: Root) {
    visit(tree, 'element', function (node, index, parent) {
      if (node.tagName === 'p' && typeof index === 'number' && parent) {
        // First pass: check if the paragraph contains any non-image content
        const hasNonImageContent = node.children.some((child) => {
          if (child.type === 'text') {
            return !whitespace(child.value)
          }
          return !isImage(child)
        })

        // Second pass: add data attributes
        node.children.forEach((child) => {
          if (child.type === 'element' && child.tagName === 'a' && child.children.some(isImage)) {
            child.properties['data-wrapping-image'] = true
          } else if (isImage(child) && hasNonImageContent) {
            // See https://github.com/rehypejs/rehype-unwrap-images/pull/1
            if (isMdxElement(child)) {
              child.attributes.push({ type: 'mdxJsxAttribute', name: 'data-inline-image', value: 'true' })
            } else if (child.type === 'element') {
              child.properties['data-inline-image'] = true
            }
          }
        })

        // If the paragraph only contains images (and whitespace), remove it
        if (!hasNonImageContent) {
          parent.children.splice(index, 1, ...node.children)
          return [SKIP, index]
        }
      }
    })
  }
}
