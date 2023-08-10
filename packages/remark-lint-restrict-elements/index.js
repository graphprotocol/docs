import { lintRule } from 'unified-lint-rule'
import { visit } from 'unist-util-visit'

export default lintRule(
  {
    origin: 'remark-lint:restrict-elements',
    url: '',
  },
  /** @type {import('unified-lint-rule').Rule<Root, void>} */
  (tree, file, settings) => {
    if (!settings) {
      throw new Error('Missing config with restrict elements')
    }
    const selectors = Array.isArray(settings) ? settings : [settings]

    for (const selector of selectors) {
      visit(tree, settings, (node) => {
        file.message(`Element ${JSON.stringify(selector)} is restricted`, node)
      })
    }
  },
)
