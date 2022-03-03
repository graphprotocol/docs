import { HTMLAttributes, useContext } from 'react'
import { Text, TextProps, Spacing, Opacity, buildShadow, buildTransition, useUniqueId } from '@edgeandnode/components'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { useInView } from 'react-intersection-observer'
import { useDebounce } from 'react-use'

import { DocumentContext } from '@/layout'
import { LinkInline } from '@/components'
import { useI18n } from '@/i18n'

export type HeadingProps = TextProps & {
  level: 1 | 2 | 3 | 4 | 5 | 6
} & HTMLAttributes<HTMLHeadingElement>

export type HeadingSpecificProps = Omit<HeadingProps, 'level' | 'color'>

const BaseHeading = ({ level, id, className, children, ...props }: HeadingProps) => {
  const rootClass = useUniqueId('class')
  const { markOutlineItem } = useContext(DocumentContext)!
  const { ref, inView: inOrAboveView } = useInView({
    rootMargin: '99999px 0px -90% 0px', // consider it "in or above view" if it's anywhere above 10% from the top of the viewport
  })
  useDebounce(
    () => {
      if (id) {
        markOutlineItem(id, inOrAboveView)
      }
    },
    100,
    [id, inOrAboveView, markOutlineItem]
  )
  const { t } = useI18n()

  return (
    <Text
      ref={ref}
      as={`h${level}`}
      id={id}
      weight="Semibold"
      color="White"
      className={`${rootClass} ${className}`}
      sx={{ whiteSpace: 'nowrap' }}
      {...props}
    >
      <span sx={{ whiteSpace: 'normal' }}>{children}</span>
      {id && (
        <span
          sx={{
            ml: '0.35em',
            opacity: Opacity['0%'],
            [`.${rootClass}:hover &, &:focus-within`]: { opacity: Opacity['100%'] },
            transition: buildTransition('OPACITY'),
          }}
        >
          <LinkInline href={`#${id}`}>
            <span aria-hidden="true">#</span>
            <VisuallyHidden.Root>{t('global.linkToThisSection')}</VisuallyHidden.Root>
          </LinkInline>
        </span>
      )}
    </Text>
  )
}

const H1 = (props: HeadingSpecificProps) => {
  return <BaseHeading level={1} size="48px" sx={{ mb: Spacing.L, textShadow: buildShadow('L') }} {...props} />
}

const H2 = (props: HeadingSpecificProps) => {
  return (
    <BaseHeading
      level={2}
      size="32px"
      sx={{
        mt: Spacing.XL_XXL,
        mb: Spacing.L_XL,
        textShadow: buildShadow('M'),
      }}
      {...props}
    />
  )
}

const H3 = (props: HeadingSpecificProps) => {
  return (
    <BaseHeading
      level={3}
      size="24px"
      sx={{ mt: Spacing.XL, mb: Spacing.L_XL, textShadow: buildShadow('M') }}
      {...props}
    />
  )
}

const H4 = (props: HeadingSpecificProps) => {
  return (
    <BaseHeading
      level={4}
      size="20px"
      sx={{ mt: Spacing.XL, mb: Spacing.L, textShadow: buildShadow('S') }}
      {...props}
    />
  )
}

const H5 = (props: HeadingSpecificProps) => {
  return (
    <BaseHeading
      level={5}
      size="18px"
      sx={{ mt: Spacing.XL, mb: Spacing.L, textShadow: buildShadow('S') }}
      {...props}
    />
  )
}

const H6 = (props: HeadingSpecificProps) => {
  return (
    <BaseHeading
      level={6}
      size="16px"
      sx={{ mt: Spacing.XL, mb: Spacing.L, textShadow: buildShadow('S') }}
      {...props}
    />
  )
}

const Heading = Object.assign({}, BaseHeading, {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
})

export { Heading }
