import { useContext } from 'react'
import { Spacing, BorderRadius, Flex, Icon } from '@edgeandnode/components'

import { DocumentContext } from '@/layout'
import { Text, Link } from '@/components'
import { useLocale } from '@/hooks'

export type OutlineItem = {
  id: string
  title: string
  level: 1 | 2 | 3 | 4 | 5 | 6
}

export const MDXLayoutOutline = () => {
  const { currentLocale, currentPathWithoutLocale } = useLocale()
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
        overflowY: 'auto',
      }}
    >
      {/* TODO: Replace with `Button` component from the new GDS when it's ready */}
      <Link
        href={`https://github.com/graphprotocol/docs/edit/main/pages/${currentLocale}${currentPathWithoutLocale}${
          currentPathWithoutLocale.endsWith('/') ? 'index' : ''
        }.mdx`}
        target="_blank"
        sx={{
          display: 'flex',
          px: Spacing.M,
          py: Spacing.S,
          borderRadius: BorderRadius.S,
          '&:hover': { bg: 'White8' },
          transition: 'background-color 200ms',
        }}
      >
        <Flex.Row as="span" align="center" gap={Spacing.S}>
          <Icon.LogoGitHub />
          <Text size="14px">Edit page</Text>
        </Flex.Row>
      </Link>
      <div
        sx={{
          mt: Spacing.XL,
          pr: '16px',
          py: '16px',
          border: (theme) => `1px solid ${theme.colors!.White16}`,
          borderLeft: 0,
          borderRight: 0,
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
    </div>
  )
}
