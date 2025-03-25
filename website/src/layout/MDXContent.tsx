import { useSet } from '@react-hookz/web'
import type { NextraMDXContent } from 'nextra'
import type { ComponentPropsWithoutRef } from 'react'

import { MDXContentContext } from './shared'
import { Template } from './Template'

export function MDXContent({ toc: headings, children }: ComponentPropsWithoutRef<NextraMDXContent>) {
  const headingIdsInOrAboveView = useSet<string>()

  const markHeading = (id: string, inOrAboveView: boolean) => {
    if (inOrAboveView) {
      headingIdsInOrAboveView.add(id)
    } else {
      headingIdsInOrAboveView.delete(id)
    }
  }

  const headingIsInOrAboveView = (id: string) => headingIdsInOrAboveView.has(id)

  return (
    <MDXContentContext.Provider
      value={{
        headings,
        markHeading,
        headingIsInOrAboveView,
      }}
    >
      <Template part="main">{children}</Template>
    </MDXContentContext.Provider>
  )
}
