import { HTMLAttributes } from 'react'
import { Spacing, BorderRadius, Flex, Icon, buildShadow } from '@edgeandnode/components'

import { Text, Link } from '@/components'
import { useLocale } from '@/hooks'

export type EditPageLinkProps = {
  mobile?: boolean
} & Omit<HTMLAttributes<HTMLElement>, 'children'>

export const EditPageLink = ({ mobile = false, ...props }: EditPageLinkProps) => {
  const { currentLocale, currentPathWithoutLocale } = useLocale()

  return (
    <Link
      href={`https://github.com/graphprotocol/docs/blob/main/pages/${currentLocale}${currentPathWithoutLocale}${
        currentPathWithoutLocale.endsWith('/') ? 'index' : ''
      }.mdx`}
      target="_blank"
      sx={{
        display: 'block',
        py: Spacing.S,
        borderRadius: BorderRadius.S,
        '&:hover': { color: 'White', textShadow: buildShadow('M') },
        transition: 'color 200ms, text-shadow 200ms',
      }}
    >
      <Flex.Row as="span" align="center" gap={Spacing.M}>
        <Icon.LogoGitHub />
        <Text weight={mobile ? 'Semibold' : 'Normal'} size={mobile ? '16px' : '14px'}>
          Edit page
        </Text>
      </Flex.Row>
    </Link>
  )
}
