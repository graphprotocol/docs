import { useContext, useEffect, useState } from 'react'

import { buildTransition, Divider, Flex, Spacing, Text, useI18n } from '@edgeandnode/gds'

import { EditPageLink, Link } from '@/components'
import { DocumentContext } from '@/layout'

export const MDXLayoutOutline = () => {
  const { headings, highlightedOutlineItemId } = useContext(DocumentContext)!
  const [enableTransition, setEnableTransition] = useState(false)
  const { t } = useI18n<any>()

  // Fix issue where the `translateY` is animated on initial load
  useEffect(() => {
    setTimeout(() => setEnableTransition(true), 0)
  }, [])

  if (headings.length === 0) {
    return <div />
  }

  return (
    <div
      sx={{
        zIndex: 1,
        position: 'sticky',
        top: 0,
        maxHeight: '100vh',
        px: Spacing['8px'],
        py: Spacing['32px'],
        overflowY: 'auto',
        transform: 'translateY(calc(var(--gds-header-height-visible) * var(--gds-header-fixed)))',
        transition: enableTransition ? buildTransition('TRANSFORM', '400ms') : undefined,
      }}
    >
      <Flex.Row>
        <EditPageLink />
      </Flex.Row>
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
                <Link
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
                </Link>
              </li>
            )
          })}
        </Text>
      </nav>
      <div
        sx={{
          height: 'var(--gds-header-height-visible)',
          transition: enableTransition ? buildTransition('height' as any, '400ms') : undefined,
        }}
      />
    </div>
  )
}
