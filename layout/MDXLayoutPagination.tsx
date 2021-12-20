import { useContext, useMemo } from 'react'
import { Spacing, Flex, Glow } from '@edgeandnode/components'

import { NavContext } from '@/layout'
import { Divider, Icon, Link, Text } from '@/components'
import { useLocale } from '@/hooks'

export const MDXLayoutPagination = () => {
  const { previousPage, nextPage } = useContext(NavContext)!

  return (
    <div>
      <Divider />
      <Flex.Row justify="space-between" sx={{ mt: Spacing.XL }}>
        <div>
          {previousPage && (
            <Link
              href={previousPage.path}
              sx={{
                display: 'block',
                py: Spacing.L_XL,
                pl: [0, null, Spacing.L_XL],
                pr: Spacing.M_L,
                color: 'White64',
                '&:hover': { color: 'White', textShadow: Glow.M },
                transition: 'color 200ms, text-shadow 200ms',
              }}
            >
              <Flex.Column gap={Spacing.S} align="start" sx={{ textAlign: 'left' }}>
                <Flex.Row align="center" gap={Spacing.S}>
                  <Icon icon="Arrow" direction="left" size={12} />
                  <Text weight="Medium" size="10px" uppercase>
                    Previous
                  </Text>
                </Flex.Row>
                <Text
                  weight="SemiBold"
                  size="16px"
                  color="White"
                  truncate
                  sx={{ m: '-24px', p: '24px', maxWidth: 'calc(100% + 48px)' }}
                >
                  {previousPage.title}
                </Text>
              </Flex.Column>
            </Link>
          )}
        </div>
        <div>
          {nextPage && (
            <Link
              href={nextPage.path}
              sx={{
                display: 'block',
                py: Spacing.L_XL,
                pl: Spacing.M_L,
                pr: [0, null, Spacing.L_XL],
                color: 'White64',
                '&:hover': { color: 'White', textShadow: Glow.M },
                transition: 'color 200ms, text-shadow 200ms',
              }}
            >
              <Flex.Column gap={Spacing.S} align="end" sx={{ textAlign: 'right' }}>
                <Flex.Row align="center" gap={Spacing.S}>
                  <Text weight="Medium" size="10px" uppercase>
                    Next
                  </Text>
                  <Icon icon="Arrow" direction="right" size={12} />
                </Flex.Row>
                <Text
                  weight="SemiBold"
                  size="16px"
                  color="White"
                  truncate
                  sx={{ m: '-24px', p: '24px', maxWidth: 'calc(100% + 48px)' }}
                >
                  {nextPage.title}
                </Text>
              </Flex.Column>
            </Link>
          )}
        </div>
      </Flex.Row>
    </div>
  )
}
