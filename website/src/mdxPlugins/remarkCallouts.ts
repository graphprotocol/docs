import type { Root } from 'mdast'
import { visit } from 'unist-util-visit'

import 'mdast-util-to-hast'

export default function remarkCallouts() {
  return (tree: Root) => {
    visit(tree, 'blockquote', (node) => {
      const firstChild = node.children[0]
      if (firstChild?.type === 'paragraph' && firstChild.children[0]?.type === 'text') {
        const firstText = firstChild.children[0]
        // Look for a callout marker like [!NOTE] or [!WARNING]
        const calloutRegex = /^\s*\[!([a-zA-Z]+)\]\s*(.*)/
        const match = calloutRegex.exec(firstText.value)
        if (match?.[1]) {
          // Extract the callout type (e.g., "note") and remove the marker from the text
          const calloutType = match[1].toLowerCase()
          firstText.value = match[2] ?? ''

          // Attach the callout type as a data attribute
          node.data = node.data || {}
          node.data.hProperties = node.data.hProperties || {}
          node.data.hProperties['data-callout-type'] = calloutType

          // If the remaining text is empty (or only whitespace), remove the first paragraph and show a default title instead
          if (firstText.value.trim() === '') {
            node.children.shift()
            node.data.hProperties['data-callout-type-show-title'] = true
          }
        }
      }
    })
  }
}
