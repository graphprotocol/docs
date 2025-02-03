import type { Heading } from 'nextra'
import { removeLinks } from 'nextra/remove-links'
import { useContext, useEffect, useMemo, useState } from 'react'

import { buildTransition, Divider, Link, Spacing, Text, useI18n } from '@edgeandnode/gds'

import { EditPageLink } from '@/components'

import { DocumentContext } from './DocumentContext'

export const MDXLayoutOutline = ({ toc: headings }: { toc: Heading[] }) => {
  const { outlineItemIsInOrAboveView } = useContext(DocumentContext)!
  // Compute `highlightedOutlineItemId` for the `DocumentContext` based on outline items that have been marked as "in or above view"
  const highlightedOutlineItemId = useMemo(() => {
    let _highlightedOutlineItemId = null
    for (const heading of headings) {
      if (heading.depth <= 3 && outlineItemIsInOrAboveView(heading.id)) {
        _highlightedOutlineItemId = heading.id
      }
    }
    return _highlightedOutlineItemId
  }, [headings, outlineItemIsInOrAboveView])

  const [_enableTransition, setEnableTransition] = useState(false)
  const { t } = useI18n<any>()

  // Fix issue where the `translateY` is animated on initial load
  useEffect(() => {
    setTimeout(() => setEnableTransition(true), 20)
  }, [])

  return (
    <div
      sx={{
        zIndex: 1,
        position: 'sticky',
        top: 'var(--gds-header-height-visible)',
        maxHeight: 'calc(100vh - var(--gds-header-height-visible))',
        px: Spacing['8px'],
        py: Spacing['24px'],
        overflowY: 'auto',
      }}
    >
      <EditPageLink sx={{ mt: Spacing['4px'] }} />
      {headings.length > 0 ? (
        <>
          <Divider sx={{ mt: '20px', mb: Spacing['24px'] }} />
          <nav sx={{ paddingInlineEnd: '16px' }}>
            <Text.C10 as="header" color="White64" sx={{ mb: Spacing['12px'] }}>
              {t('global.pageSections')}
            </Text.C10>
            <Text as="ul" size="14px" color="White48">
              {headings.map((heading, outlineItemIndex) => {
                if (heading.depth > 3) {
                  return null
                }
                return (
                  <li key={outlineItemIndex}>
                    <Link.Unstyled
                      href={`#${heading.id}`}
                      sx={{
                        display: 'block',
                        paddingInlineStart: `${8 * Math.max(0, heading.depth - 2)}px`,
                        py: '6px',
                        color: heading.id === highlightedOutlineItemId ? 'White88' : undefined,
                        '&:hover': { color: 'White' },
                        transition: buildTransition('COLORS'),
                      }}
                    >
                      {removeLinks(heading.value)}
                    </Link.Unstyled>
                  </li>
                )
              })}
            </Text>
          </nav>
        </>
      ) : null}
    </div>
  )
}
