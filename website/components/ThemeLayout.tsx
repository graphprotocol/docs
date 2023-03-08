import { NextraThemeLayoutProps } from 'nextra'
import { ReactElement } from 'react'

import { MDXLayout } from '@/layout'

export default function Layout({ children, pageOpts, pageProps }: NextraThemeLayoutProps): ReactElement {
  return (
    <MDXLayout
      pagePath={pageOpts.filePath}
      navItems={pageProps.navItems}
      frontmatter={pageOpts.frontMatter}
      outline={pageOpts.headings.map(({ depth, value, id }) => ({
        id,
        level: depth,
        title: value,
      }))}
    >
      {children}
    </MDXLayout>
  )
}
