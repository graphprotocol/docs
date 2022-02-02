import { HTMLAttributes, useContext } from 'react'
import {
  Text,
  Flex,
  Icon,
  Spacing,
  BorderRadius,
  Opacity,
  buildShadow,
  buildTransition,
  useUniqueId,
} from '@edgeandnode/components'

import { NavContext } from '@/layout'
import { Link } from '@/components'
import { useI18n } from '@/hooks'

export type EditPageLinkProps = {
  mobile?: boolean
} & Omit<HTMLAttributes<HTMLElement>, 'children'>

export const EditPageLink = ({ mobile = false, ...props }: EditPageLinkProps) => {
  const { pagePath } = useContext(NavContext)!
  const { translations } = useI18n()
  const linkClass = useUniqueId('class')

  return (
    <Link
      className={linkClass}
      href={`https://github.com/graphprotocol/docs/blob/main/pages/${pagePath}`}
      target="_blank"
      sx={{
        display: 'block',
        py: Spacing.S,
        borderRadius: BorderRadius.S,
        '&:hover': { color: 'White', textShadow: buildShadow('M') },
        transition: buildTransition(),
      }}
      {...props}
    >
      <Flex.Row as="span" align="center" gap={Spacing.M}>
        <Icon.LogoGitHub />
        <Text weight="Semibold" size={mobile ? '16px' : '14px'}>
          {translations.global.editPage}
        </Text>
        <Icon.ExternalLink
          sx={{
            opacity: Opacity['0%'],
            [`.${linkClass}:hover &`]: { opacity: Opacity['32%'] },
            transition: buildTransition('OPACITY'),
          }}
        />
      </Flex.Row>
    </Link>
  )
}
