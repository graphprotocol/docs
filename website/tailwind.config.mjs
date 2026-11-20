// @ts-check

// @ts-ignore no types available
import { normalize } from 'tailwindcss/lib/util/dataTypes.js'
import plugin from 'tailwindcss/plugin'

import { buildTailwindConfig } from '@edgeandnode/gds'

/** @type {(value: string) => string} */
const normalizeValue = (value) => {
  let normalizedValue = normalize(value)
  if (normalizedValue.startsWith('&')) {
    normalizedValue = normalizedValue.slice(1)
  }
  return normalizedValue
}

export default buildTailwindConfig({
  packages: ['@edgeandnode/go'],
  content: ['./src/**/*.{js,jsx,ts,tsx,md,mdx}'],

  plugins: [
    plugin(({ addComponents, matchVariant }) => {
      addComponents({
        '.text-heading-xlarge': {
          '@apply text-h40 text-pretty': '',
        },
        '.text-heading-large': {
          '@apply text-h32 text-pretty': '',
        },
        '.text-heading-medium': {
          '@apply text-h24 text-pretty': '',
        },
        '.text-heading-small': {
          '@apply text-h20 text-pretty': '',
        },
        '.text-heading-xsmall': {
          '@apply text-h18 text-pretty': '',
        },
        '.text-body-large': {
          '@apply text-p20': '',
        },
        '.text-body-medium': {
          '@apply text-p18': '',
        },
        '.text-body-small': {
          '@apply text-p16': '',
        },
        '.text-body-small-tight': {
          '@apply text-p16 leading-6': '',
        },
        '.text-body-xsmall': {
          '@apply text-p14': '',
        },
        '.text-body-xsmall-tight': {
          '@apply text-p14 leading-5': '',
        },
      })

      matchVariant(
        'mdx',
        (value) => `& :is(${normalizeValue(value)}):not(.graph-docs-not-markdown, .graph-docs-not-markdown *)`,
      )
    }),
  ],
})
