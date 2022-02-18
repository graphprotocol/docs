import mdx from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import { remarkMdxFrontmatter } from 'remark-mdx-frontmatter'

import { remarkMdxLayout } from './lib/remarkMdxLayout.mjs'

const env = {
  APP_PREFIX: '/docs',
  ASSET_PREFIX: process.env.NODE_ENV === 'production' ? '/docs' : '',
}

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter, [remarkMdxFrontmatter, { name: 'frontmatter' }], remarkMdxLayout],
    providerImportSource: '@mdx-js/react',
    jsxImportSource: 'theme-ui',
  },
})

export default withMDX({
  env,
  pageExtensions: ['tsx', 'mdx'],
  trailingSlash: true,
  assetPrefix: env.ASSET_PREFIX,
  reactStrictMode: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
})
