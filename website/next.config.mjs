import nextra from 'nextra'

const env = {
  BASE_PATH: process.env.NODE_ENV === 'production' ? '/docs' : '',
  ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
  ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
  MIXPANEL_TOKEN:
    process.env.ENVIRONMENT === 'production' ? 'cfeac8baf33c9b4d255f28d57f3c9148' : 'e57a9892339b2acfd02943c86b746d32',
}

const withNextra = nextra({
  theme: './layout/index.ts',
  flexsearch: false,
  staticImage: true,
  codeHighlight: false,
  // defaultShowCopyCode: true,
  transform(content, { route }) {
    if (route) {
      return `
import { getNavItems } from '@/navigation'

${content}

export const getStaticProps = async () => {
  const navItems = await getNavItems('${route.split('/')[1]}')
  return {
    props: { navItems }
  }
}`
    }
    return content
  },
})

export default withNextra({
  experimental: {
    // Fix scroll restoration (see https://github.com/vercel/next.js/issues/37893#issuecomment-1221335543)
    scrollRestoration: true,
  },
  env,
  pageExtensions: ['tsx'],
  reactStrictMode: true,
  basePath: env.BASE_PATH,
  trailingSlash: true,
  redirects: () => [
    {
      source: '/',
      destination: '/en/',
      permanent: false,
    },
  ],
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
})
