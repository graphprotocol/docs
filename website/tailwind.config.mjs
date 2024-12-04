import { buildTailwindConfig } from '@edgeandnode/gds'

export default buildTailwindConfig({
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],

  theme: {
    extend: {
      colors: {
        background: '#0b091a',
      },
    },
  },
})
