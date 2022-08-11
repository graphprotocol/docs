import { HTMLAttributes } from 'react'
import { Text, TextProps, Spacing, buildBorder } from '@edgeandnode/components'

export type BlockquoteProps = Omit<TextProps & HTMLAttributes<HTMLQuoteElement>, 'color'>

export const Blockquote = ({ children, ...props }: BlockquoteProps) => {
  return (
    <Text
      as="blockquote"
      sx={{
        my: Spacing.XL,
        p: Spacing.L_XL,
        borderInlineStart: buildBorder('Purple', '4px'),
        bg: 'Purple8',
      }}
      {...props}
    >
      {children}
    </Text>
  )
}
