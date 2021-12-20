import { HTMLAttributes, useContext } from 'react'
import { useUniqueId, Spacing, Glow } from '@edgeandnode/components'
import classnames from 'classnames'
import { useInView } from 'react-intersection-observer'
import { useDebounce } from 'react-use'

import { Text, TextProps, LinkInline } from '@/components'
import { DocumentContext } from '@/layout'

export type HeadingProps = TextProps & {
  level: 1 | 2 | 3 | 4 | 5 | 6
} & HTMLAttributes<HTMLHeadingElement>

export type HeadingSpecificProps = Omit<HeadingProps, 'level' | 'color'>

export const Heading = ({ level, id, className, children, ...props }: HeadingProps) => {
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

  return (
    <Text
      innerRef={ref}
      as={`h${level}`}
      id={id}
      weight="SemiBold"
      color="White"
      className={classnames(rootClass, className)}
      sx={{ whiteSpace: 'nowrap' }}
      {...props}
    >
      <span sx={{ whiteSpace: 'normal' }}>{children}</span>
      {id && (
        <span
          sx={{
            ml: '0.35em',
            opacity: 0,
            [`.${rootClass}:hover &`]: { opacity: 1 },
            transition: 'opacity 200ms',
          }}
        >
          <LinkInline href={`#${id}`}>#</LinkInline>
        </span>
      )}
    </Text>
  )
}

export const H1 = (props: HeadingSpecificProps) => {
  return <Heading level={1} size="48px" sx={{ mb: Spacing.L, textShadow: Glow.L }} {...props} />
}

export const H2 = (props: HeadingSpecificProps) => {
  return (
    <Heading
      level={2}
      size="32px"
      sx={{
        mt: Spacing.XL_XXL,
        mb: Spacing.L_XL,
        textShadow: Glow.M,
      }}
      {...props}
    />
  )
}

export const H3 = (props: HeadingSpecificProps) => {
  return <Heading level={3} size="24px" sx={{ mt: Spacing.XL, mb: Spacing.L_XL, textShadow: Glow.M }} {...props} />
}

export const H4 = (props: HeadingSpecificProps) => {
  return <Heading level={4} size="20px" sx={{ mt: Spacing.XL, mb: Spacing.L, textShadow: Glow.S }} {...props} />
}

export const H5 = (props: HeadingSpecificProps) => {
  return <Heading level={5} size="18px" sx={{ mt: Spacing.XL, mb: Spacing.L, textShadow: Glow.S }} {...props} />
}

export const H6 = (props: HeadingSpecificProps) => {
  return <Heading level={6} size="16px" sx={{ mt: Spacing.XL, mb: Spacing.L, textShadow: Glow.S }} {...props} />
}
