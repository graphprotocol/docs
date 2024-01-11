import { useContext, useEffect, useState } from 'react'

import { buildTransition, Divider, Flex, Link, Spacing, Text, useI18n } from '@edgeandnode/gds'

import { EditPageLink } from '@/components'
import { DocumentContext } from '@/layout'

export const MDXLayoutOutline = () => {
  const { headings, highlightedOutlineItemId } = useContext(DocumentContext)!
  const [enableTransition, setEnableTransition] = useState(false)
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
        py: Spacing['32px'],
        overflowY: 'auto',
      }}
    >
      <Flex.Row>
        <EditPageLink />
      </Flex.Row>
      {headings.length > 0 ? (
        <>
          <Divider sx={{ my: Spacing['32px'] }} />
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
                      {heading.value}
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
