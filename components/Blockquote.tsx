import { HTMLAttributes } from 'react'

import { buildBorder, Spacing, Text, TextProps } from '@edgeandnode/components'

export type BlockquoteProps = Omit<TextProps & HTMLAttributes<HTMLQuoteElement>, 'color'>

export const Blockquote = ({ children, ...props }: BlockquoteProps) => {
  return (
    <Text
      as="blockquote"
      sx={{
        my: Spacing['32px'],
        p: Spacing['24px'],
        borderInlineStart: buildBorder('Purple', '4px'),
        bg: 'Purple8',
      }}
      {...props}
    >
      {children}
    </Text>
  )
}
