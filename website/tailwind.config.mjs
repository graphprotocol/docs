import * as dataTypes from 'tailwindcss/lib/util/dataTypes.js'
import plugin from 'tailwindcss/plugin'

import { buildTailwindConfig } from '@edgeandnode/gds'

const normalizeValue = (value) => {
  let normalizedValue = dataTypes.normalize(value)
  if (normalizedValue.startsWith('&')) {
    normalizedValue = normalizedValue.slice(1)
  }
  return normalizedValue
}

export default buildTailwindConfig({
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],

  theme: {
    extend: {
      colors: {
        background: '#0b091a',
      },
    },
  },

  plugins: [
    plugin(({ matchVariant }) => {
      matchVariant(
        'mdx',
        (value) => `& :is(${normalizeValue(value)}):not(.graph-docs-not-markdown, .graph-docs-not-markdown *)`,
      )
    }),
  ],
})
