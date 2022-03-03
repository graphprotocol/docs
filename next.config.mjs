import mdx from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import { remarkMdxFrontmatter } from 'remark-mdx-frontmatter'

import { remarkMdxLayout } from './lib/remarkMdxLayout.mjs'

const env = {
  BASE_PATH: process.env.NODE_ENV === 'production' ? '/docs' : '',
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
  basePath: env.BASE_PATH,
  pageExtensions: ['tsx', 'mdx'],
  trailingSlash: true,
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/en/',
        permanent: false,
      },
    ]
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
})
