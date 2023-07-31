import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { HTMLAttributes, useContext } from 'react'
import { useInView } from 'react-intersection-observer'
import { useDebounce } from 'react-use'

import { buildTransition, Opacity, Spacing, Text, TextProps, useI18n } from '@edgeandnode/gds'

import { LinkInline } from '@/components'
import { DocumentContext } from '@/layout/DocumentContext'

export type HeadingProps = TextProps & {
  level: 1 | 2 | 3 | 4 | 5 | 6
} & HTMLAttributes<HTMLHeadingElement>

const BaseHeading = ({ level, id, children, ...props }: HeadingProps) => {
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
    [id, inOrAboveView, markOutlineItem],
  )
  const { t } = useI18n<any>()

  return (
    <Text ref={ref} as={`h${level}`} id={id} weight="SEMIBOLD" color="White" {...props}>
      {children}
      {id ? (
        <span
          sx={{
            marginInlineStart: '0.35em',
            opacity: Opacity['0%'],
            [`h${level}:hover &, &:focus-within`]: { opacity: Opacity['100%'] },
            transition: buildTransition('OPACITY'),
          }}
        >
          {/* Non-breaking invisible space, to prevent a line break between the `#` and the previous word */}
          &#8288;
          <LinkInline href={`#${id}`}>
            <span aria-hidden="true">#</span>
            <VisuallyHidden.Root>{t('global.linkToThisSection')}</VisuallyHidden.Root>
          </LinkInline>
        </span>
      ) : null}
    </Text>
  )
}

export type HeadingSpecificProps = Omit<HeadingProps, 'level' | 'color'>

const H1 = (props: HeadingSpecificProps) => {
  return <BaseHeading level={1} size="48px" sx={{ mb: Spacing['16px'] }} {...props} />
}

const H2 = (props: HeadingSpecificProps) => {
  return (
    <BaseHeading
      level={2}
      size="32px"
      sx={{
        mt: Spacing['48px'],
        mb: Spacing['24px'],
      }}
      {...props}
    />
  )
}

const H3 = (props: HeadingSpecificProps) => {
  return <BaseHeading level={3} size="24px" sx={{ mt: Spacing['32px'], mb: Spacing['24px'] }} {...props} />
}

const H4 = (props: HeadingSpecificProps) => {
  return <BaseHeading level={4} size="20px" sx={{ mt: Spacing['32px'], mb: Spacing['16px'] }} {...props} />
}

const H5 = (props: HeadingSpecificProps) => {
  return <BaseHeading level={5} size="18px" sx={{ mt: Spacing['32px'], mb: Spacing['16px'] }} {...props} />
}

const H6 = (props: HeadingSpecificProps) => {
  return <BaseHeading level={6} size="16px" sx={{ mt: Spacing['32px'], mb: Spacing['16px'] }} {...props} />
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
