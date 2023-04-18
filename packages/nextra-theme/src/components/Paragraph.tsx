import { HTMLAttributes } from 'react'

import { Spacing, Text, TextProps } from '@edgeandnode/components'

export type ParagraphProps = Omit<TextProps & HTMLAttributes<HTMLParagraphElement>, 'color'>

export const Paragraph = ({ children, ...props }: ParagraphProps) => {
  return (
    <Text.P18
      sx={{
        mt: Spacing['16px'],
        mb: Spacing['24px'],
        '&:first-of-type': { mt: 0 },
        '&:last-child': { mb: 0 },
      }}
      {...props}
    >
      {children}
    </Text.P18>
  )
}
