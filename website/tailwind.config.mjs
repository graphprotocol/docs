import { buildTailwindConfig } from '@edgeandnode/gds'

export default buildTailwindConfig({
  packages: ['@edgeandnode/go'],
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}', '../packages/nextra-theme/src/**/*.{js,jsx,ts,tsx,mdx}'],
})
