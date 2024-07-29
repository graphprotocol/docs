import { useContext } from 'react'

import { buildTransition, Divider, Flex, Icon, Link, Spacing, Text, useI18n } from '@edgeandnode/gds'

import { NavContext } from './NavContext'

export const MDXLayoutPagination = () => {
  const { flatDocsDirectories, activeIndex } = useContext(NavContext)!
  const { t } = useI18n<any>()

  const prev = flatDocsDirectories[activeIndex - 1]
  const next = flatDocsDirectories[activeIndex + 1]

  if (!prev && !next) return null

  return (
    <div>
      <Divider diamonds />
      <Flex.Row justify="space-between" sx={{ my: Spacing['32px'] }}>
        <div>
          {prev ? (
            <Link.Unstyled
              href={prev.route}
              sx={{
                display: 'block',
                py: Spacing['24px'],
                paddingInlineStart: [0, null, Spacing['24px']],
                paddingInlineEnd: Spacing['12px'],
                color: 'White64',
                '&:hover': { color: 'White' },
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
                  {prev.title}
                </Text>
              </Flex.Column>
            </Link.Unstyled>
          ) : null}
        </div>
        <div>
          {next ? (
            <Link.Unstyled
              href={next.route}
              sx={{
                display: 'block',
                py: Spacing['24px'],
                paddingInlineStart: Spacing['12px'],
                paddingInlineEnd: [0, null, Spacing['24px']],
                color: 'White64',
                '&:hover': { color: 'White' },
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
                  {next.title}
                </Text>
              </Flex.Column>
            </Link.Unstyled>
          ) : null}
        </div>
      </Flex.Row>
    </div>
  )
}
