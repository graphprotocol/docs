import { useContext, useState, useEffect } from 'react'
import { Text, Flex, NewGDSDivider, Spacing, buildTransition } from '@edgeandnode/components'

import { DocumentContext } from '@/layout'
import { Link, EditPageLink } from '@/components'
import { useI18n } from '@/i18n'

export const MDXLayoutOutline = () => {
  const { outline, highlightedOutlineItemId } = useContext(DocumentContext)!
  const [enableTransition, setEnableTransition] = useState(false)
  const { t } = useI18n()

  // Fix issue where the `translateY` is animated on initial load
  useEffect(() => {
    setTimeout(() => setEnableTransition(true), 0)
  }, [])

  if (outline.length === 0) {
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
      <NewGDSDivider sx={{ my: Spacing['32px'] }} />
      <nav sx={{ paddingInlineEnd: '16px' }}>
        <Text.C10 as="header" color="White64" sx={{ mb: Spacing['12px'] }}>
          {t('global.pageSections')}
        </Text.C10>
        <Text as="ul" size="14px" color="White48">
          {outline.map((outlineItem, outlineItemIndex) => {
            if (outlineItem.level > 3) {
              return null
            }
            return (
              <li key={outlineItemIndex}>
                <Link
                  href={`#${outlineItem.id}`}
                  sx={{
                    display: 'block',
                    paddingInlineStart: `${8 * Math.max(0, outlineItem.level - 2)}px`,
                    py: '6px',
                    color: outlineItem.id === highlightedOutlineItemId ? 'White88' : undefined,
                    '&:hover': { color: 'White' },
                    transition: buildTransition('COLORS'),
                  }}
                >
                  {outlineItem.title}
                </Link>
              </li>
            )
          })}
        </Text>
      </nav>
    </div>
  )
}
