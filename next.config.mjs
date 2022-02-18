import mdx from '@next/mdx'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import { remarkMdxFrontmatter } from 'remark-mdx-frontmatter'

import { remarkMdxLayout } from './lib/remarkMdxLayout.mjs'
import { recmaInitialProps } from './lib/recmaInitialProps.mjs'

const env = {
  BASE_PATH: process.env.NODE_ENV === 'production' ? 'docs' : undefined,
}

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm, remarkFrontmatter, [remarkMdxFrontmatter, { name: 'frontmatter' }], remarkMdxLayout],
    recmaPlugins: [recmaInitialProps],
    providerImportSource: '@mdx-js/react',
    jsxImportSource: 'theme-ui',
  },
})

export default withMDX({
  env,
  pageExtensions: ['tsx', 'mdx'],
  trailingSlash: true,
  reactStrictMode: true,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },

  async exportPathMap(defaultPathMap) {
    if (process.env.NODE_ENV !== 'production') {
      return
    }

    const locales = ['en', 'es', 'ar', 'ko', 'zh', 'ja', 'vi']

    const newPathMap = Object.fromEntries(
      Object.entries(defaultPathMap).flatMap(([path, { page }]) => {
        let entries = []
        const pathParts = path.split('/')
        if (locales.includes(pathParts[1])) {
          // This path is already localized, just insert the base path after the locale
          pathParts.splice(2, 0, env.BASE_PATH)
          const newPath = pathParts.join('/')
          entries.push([
            newPath,
            {
              page,
              query: { locale: pathParts[1] },
            },
          ])
        } else {
          // This path is not localized, create localized versions
          locales.forEach((locale) => {
            const newPath = `/${locale}/${env.BASE_PATH}${path}`
            entries.push([
              newPath,
              {
                page,
                query: path !== '/404' ? { locale } : undefined,
              },
            ])
          })
        }
        return entries
      })
    )

    console.log({ newPathMap })

    return newPathMap
  },
})
