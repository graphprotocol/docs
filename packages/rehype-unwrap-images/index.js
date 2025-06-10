/**
 * @import {Root} from 'hast'
 */

import { whitespace } from 'hast-util-whitespace'
import { SKIP, visit } from 'unist-util-visit'

const isImage = (node) =>
  (node.type === 'element' && node.tagName === 'img') || (node.type === 'mdxJsxFlowElement' && node.name === 'img')

/**
 * This plugin does two things:
 * 1. Removes the `p` tag when it only contains images (and whitespace)
 * 2. Adds data attributes to help with image rendering:
 *    - `data-wrapping-image` to links that contain an image
 *    - `data-inline-image` to images that are in a paragraph with other content (text, links, etc.)
 *
 * @returns
 *   Transform.
 */
export default function rehypeUnwrapImages() {
  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    visit(tree, 'element', function (node, index, parent) {
      if (node.tagName === 'p' && parent && typeof index === 'number') {
        // First pass: check if the paragraph contains any non-image content
        const hasNonImageContent = node.children.some((child) => {
          if (child.type === 'text') {
            return !whitespace(child.value)
          } else {
            return !isImage(child)
          }
        })

        // Second pass: add data attributes
        node.children.forEach((child) => {
          if (child.type === 'element' && child.tagName === 'a' && child.children.some(isImage)) {
            child.properties = child.properties || {}
            child.properties['data-wrapping-image'] = true
          } else if (isImage(child) && hasNonImageContent) {
            if (child.type === 'mdxJsxFlowElement') {
              child.attributes = child.attributes || []
              child.attributes.push({ type: 'mdxJsxAttribute', name: 'data-inline-image', value: true })
            } else {
              child.properties = child.properties || {}
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
