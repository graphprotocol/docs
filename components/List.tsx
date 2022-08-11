import { HTMLAttributes } from 'react'
import { Text, TextProps, Spacing } from '@edgeandnode/components'

export type ListProps = Omit<
  Omit<TextProps, 'as'> & {
    as: 'ol' | 'ul'
  } & HTMLAttributes<HTMLElement>,
  'color'
>

export type ListSpecificProps = Omit<ListProps, 'as'>

export const List = ({ as, children, ...props }: ListProps) => {
  return (
    <Text
      as={as}
      size="18px"
      sx={{
        mt: Spacing.L,
        mb: Spacing.L_XL,
        paddingInlineStat: Spacing.XL,
        listStyleType: as === 'ol' ? 'decimal' : 'disc',
        '& > li': {
          display: 'list-item',
          my: Spacing.L,
        },
      }}
      {...props}
    >
      {children}
    </Text>
  )
}

export const ListOrdered = (props: ListSpecificProps) => {
  return <List as="ol" {...props} />
}

export const ListUnordered = (props: ListSpecificProps) => {
  return <List as="ul" {...props} />
}
