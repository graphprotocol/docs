import { useContext } from 'react'
import { Text, Flex, NewGDSDivider, Icon, Spacing, buildShadow, buildTransition } from '@edgeandnode/components'

import { NavContext } from '@/layout'
import { Link } from '@/components'
import { useI18n } from '@/i18n'

export const MDXLayoutPagination = () => {
  const { previousPage, nextPage } = useContext(NavContext)!
  const { t } = useI18n()

  return (
    <div>
      <NewGDSDivider diamonds />
      <Flex.Row justify="space-between" sx={{ mt: Spacing.XL, overflow: 'hidden' }}>
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
                  <Icon.ArrowLeft title="" size="12px" />
                  <Text.C10>{t('global.previous')}</Text.C10>
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
                  <Text.C10>{t('global.next')}</Text.C10>
                  <Icon.ArrowRight title="" size="12px" />
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
