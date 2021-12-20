import { useContext } from 'react'
import { Spacing } from '@edgeandnode/components'

import { DocumentContext } from '@/layout'
import { Text, Link } from '@/components'

export type OutlineItem = {
  id: string
  title: string
  level: 1 | 2 | 3 | 4 | 5 | 6
}

export const MDXLayoutOutline = () => {
  const { outline, highlightedOutlineItemId } = useContext(DocumentContext)!

  if (outline.length === 0) {
    return <div />
  }

  return (
    <div
      sx={{
        zIndex: 1,
        position: 'sticky',
        top: '-1px',
        maxHeight: 'calc(100vh + 2px)',
        pr: '16px',
        py: '16px',
        border: (theme) => `1px solid ${theme.colors!.White16}`,
        borderLeft: 0,
        borderRight: 0,
        overflowY: 'auto',
      }}
    >
      <Text as="div" size="14px" color="White64">
        <ul role="list">
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
                    pl: `${16 + 16 * Math.max(0, outlineItem.level - 2)}px`,
                    py: Spacing.M_L,
                    color: outlineItem.id === highlightedOutlineItemId ? 'White' : undefined,
                    '&:hover': { color: 'White' },
                    transition: 'color 200ms',
                  }}
                >
                  {outlineItem.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </Text>
    </div>
  )
}
