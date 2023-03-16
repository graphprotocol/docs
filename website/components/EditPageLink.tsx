import { HTMLAttributes, useContext } from 'react'

import { BorderRadius, buildShadow, buildTransition, Flex, Icon, Opacity, Spacing, Text } from '@edgeandnode/components'

import { useI18n } from '../i18n'
import { NavContext } from '../layout/NavContext'

import { Link } from './Link'

export type EditPageLinkProps = {
  mobile?: boolean
} & Omit<HTMLAttributes<HTMLElement>, 'children'>

export const EditPageLink = ({ mobile = false, ...props }: EditPageLinkProps) => {
  const { t } = useI18n()

  // If the current page is in a language other than English, link to the English version, as translations are handled by Crowdin
  const { pagePath: _pagePath } = useContext(NavContext)!
  const pagePathSegments = _pagePath.split('/')
  pagePathSegments[1] = ['en', '[locale]'].includes(pagePathSegments[1]) ? pagePathSegments[1] : 'en'
  const pagePath = pagePathSegments.join('/')

  return (
    <Link
      href={`https://github.com/graphprotocol/docs/blob/main/website/${pagePath}`}
      target="_blank"
      sx={{
        display: 'block',
        py: Spacing['4px'],
        borderRadius: BorderRadius.S,
        '&:hover': { color: 'White', textShadow: buildShadow('M') },
        transition: buildTransition(),
      }}
      {...props}
    >
      <Flex.Row as="span" align="center" gap={Spacing['8px']}>
        <Icon.LogoGitHub title="" />
        <Text weight="SEMIBOLD" size={mobile ? '16px' : '14px'}>
          {t('global.editPage')}
        </Text>
        <Icon.ExternalLink
          sx={{
            opacity: Opacity['0%'],
            'a:hover &': { opacity: Opacity['32%'] },
            transition: buildTransition('OPACITY'),
          }}
        />
      </Flex.Row>
    </Link>
  )
}
