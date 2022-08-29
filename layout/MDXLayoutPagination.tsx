import { useContext } from 'react'

import { buildShadow, buildTransition, Flex, Icon, NewGDSDivider, Spacing, Text } from '@edgeandnode/components'

import { Link } from '@/components'
import { useI18n } from '@/i18n'
import { NavContext } from '@/layout'

export const MDXLayoutPagination = () => {
  const { previousPage, nextPage } = useContext(NavContext)!
  const { t } = useI18n()

  return (
    <div>
      <NewGDSDivider diamonds />
      <Flex.Row justify="space-between" sx={{ mt: Spacing['32px'], overflow: 'hidden' }}>
        <div>
          {previousPage ? (
            <Link
              href={previousPage.path}
              sx={{
                display: 'block',
                py: Spacing['24px'],
                paddingInlineStart: [0, null, Spacing['24px']],
                paddingInlineEnd: Spacing['12px'],
                color: 'White64',
                '&:hover': { color: 'White', textShadow: buildShadow('M') },
                transition: buildTransition(),
              }}
            >
              <Flex.Column align="start" gap={Spacing['4px']} sx={{ textAlign: 'start' }}>
                <Flex.Row align="center" gap={Spacing['4px']}>
                  <Icon.ArrowLeft title="" size="12px" />
                  <Text.C10>{t('global.previous')}</Text.C10>
                </Flex.Row>
                <Text
                  weight="SEMIBOLD"
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
          ) : null}
        </div>
        <div>
          {nextPage ? (
            <Link
              href={nextPage.path}
              sx={{
                display: 'block',
                py: Spacing['24px'],
                paddingInlineStart: Spacing['12px'],
                paddingInlineEnd: [0, null, Spacing['24px']],
                color: 'White64',
                '&:hover': { color: 'White', textShadow: buildShadow('M') },
                transition: buildTransition(),
              }}
            >
              <Flex.Column align="end" gap={Spacing['4px']} sx={{ textAlign: 'end' }}>
                <Flex.Row align="center" gap={Spacing['4px']}>
                  <Text.C10>{t('global.next')}</Text.C10>
                  <Icon.ArrowRight title="" size="12px" />
                </Flex.Row>
                <Text
                  weight="SEMIBOLD"
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
          ) : null}
        </div>
      </Flex.Row>
    </div>
  )
}
