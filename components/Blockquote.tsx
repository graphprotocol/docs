import { HTMLAttributes } from 'react'
import { Spacing } from '@edgeandnode/components'

import { Text, TextProps } from '@/components'

export type BlockquoteProps = Omit<TextProps & HTMLAttributes<HTMLQuoteElement>, 'color'>

export const Blockquote = ({ children, ...props }: BlockquoteProps) => {
  return (
    <Text
      as="blockquote"
      sx={{
        my: Spacing.XL,
        p: Spacing.L_XL,
        borderLeft: (theme) => `4px solid ${theme.colors!.Purple}`,
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
