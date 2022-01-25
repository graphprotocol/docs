import { useContext } from 'react'
import {
  Text,
  Flex,
  NewGDSDivider as Divider,
  Icon,
  Spacing,
  buildShadow,
  buildTransition,
} from '@edgeandnode/components'

import { NavContext } from '@/layout'
import { Link } from '@/components'
import { useI18n } from '@/hooks'

export const MDXLayoutPagination = () => {
  const { previousPage, nextPage } = useContext(NavContext)!
  const { translations } = useI18n()

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
                '&:hover': { color: 'White', textShadow: buildShadow('M') },
                transition: buildTransition(),
              }}
            >
              <Flex.Column align="start" gap={Spacing.S} sx={{ textAlign: 'left' }}>
                <Flex.Row align="center" gap={Spacing.S}>
                  <Icon.ArrowLeft size="12px" />
                  <Text.T10>{translations.global.previous}</Text.T10>
                </Flex.Row>
                <Text
                  weight="Semibold"
                  size="16px"
                  color="White88"
                  truncate
                  sx={{
                    m: '-24px',
                    p: '24px',
                    maxWidth: 'calc(100% + 48px)',
                    'a:hover &': { color: 'White' },
                    transition: buildTransition('COLORS'),
                  }}
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
                '&:hover': { color: 'White', textShadow: buildShadow('M') },
                transition: buildTransition(),
              }}
            >
              <Flex.Column align="end" gap={Spacing.S} sx={{ textAlign: 'right' }}>
                <Flex.Row align="center" gap={Spacing.S}>
                  <Text.T10>{translations.global.next}</Text.T10>
                  <Icon.ArrowRight size="12px" />
                </Flex.Row>
                <Text
                  weight="Semibold"
                  size="16px"
                  color="White88"
                  truncate
                  sx={{
                    m: '-24px',
                    p: '24px',
                    maxWidth: 'calc(100% + 48px)',
                    'a:hover &': { color: 'White' },
                    transition: buildTransition('COLORS'),
                  }}
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
