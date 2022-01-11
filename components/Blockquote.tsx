import { HTMLAttributes } from 'react'
import { Spacing, buildBorder } from '@edgeandnode/components'

import { Text, TextProps } from '@/components'

export type BlockquoteProps = Omit<TextProps & HTMLAttributes<HTMLQuoteElement>, 'color'>

export const Blockquote = ({ children, ...props }: BlockquoteProps) => {
  return (
    <Text
      as="blockquote"
      sx={{
        my: Spacing.XL,
        p: Spacing.L_XL,
        borderLeft: buildBorder('Purple', '4px' as any),
        bg: 'Purple8',
        '& > p': {
          my: 0,
        },
      }}
      {...props}
    >
      {children}
    </Text>
  )
}
