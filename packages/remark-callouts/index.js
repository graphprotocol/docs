import { visit } from 'unist-util-visit'

export default function remarkCallouts() {
  return (tree) => {
    visit(tree, 'blockquote', (node) => {
      if (
        node.children &&
        node.children.length > 0 &&
        node.children[0].type === 'paragraph' &&
        node.children[0].children &&
        node.children[0].children.length > 0 &&
        node.children[0].children[0].type === 'text'
      ) {
        const firstText = node.children[0].children[0]
        // Look for a callout marker like [!NOTE] or [!WARNING]
        const calloutRegex = /^\s*\[!([a-zA-Z]+)\]\s*(.*)/
        const match = calloutRegex.exec(firstText.value)
        if (match) {
          // Extract the callout type (e.g., "note") and remove the marker from the text
          const calloutType = match[1].toLowerCase()
          firstText.value = match[2]

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
