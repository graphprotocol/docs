import mdx from '@next/mdx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'

import { remarkMdxLayout } from './lib/remarkMdxLayout.mjs'

const env = {
  BASE_PATH: process.env.NODE_ENV === 'production' ? '/docs' : '',
  ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
  ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
  MIXPANEL_TOKEN:
    process.env.ENVIRONMENT === 'production' ? 'cfeac8baf33c9b4d255f28d57f3c9148' : 'e57a9892339b2acfd02943c86b746d32',
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
  experimental: {
    // Fix scroll restoration (see https://github.com/vercel/next.js/issues/37893#issuecomment-1221335543)
    scrollRestoration: true,
  },

  env,
  pageExtensions: ['tsx', 'mdx'],
  reactStrictMode: true,
  basePath: env.BASE_PATH,
  trailingSlash: true,

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
