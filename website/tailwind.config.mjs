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
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],

  theme: {
    extend: {
      colors: {
        background: '#080618',
        text: '#c8c8cc',
      },
    },
  },

  plugins: [
    plugin(({ addComponents, matchVariant }) => {
      // TODO: Change the default line heights in GDS to match some of the ones below?
      addComponents({
        '.text-heading-xlarge': {
          '@apply font-medium text-balance text-40': '',
        },
        '.text-heading-large': {
          '@apply font-medium text-balance text-32 leading-11': '',
        },
        '.text-heading-medium': {
          '@apply font-medium text-balance text-24 leading-9': '',
        },
        '.text-heading-small': {
          '@apply font-medium text-balance text-20 leading-8': '',
        },
        '.text-heading-xsmall': {
          '@apply font-medium text-balance text-18 leading-7': '',
        },
        '.text-body-large': {
          '@apply font-regular text-pretty text-20 leading-9': '',
        },
        '.text-body-medium': {
          '@apply font-regular text-pretty text-18 leading-8': '',
        },
        '.text-body-small': {
          '@apply font-regular text-pretty text-16': '',
        },
        '.text-body-xsmall': {
          '@apply font-regular text-pretty text-14': '',
        },
      })

      matchVariant(
        'mdx',
        (value) => `& :is(${normalizeValue(value)}):not(.graph-docs-not-markdown, .graph-docs-not-markdown *)`,
      )
    }),
  ],
})
