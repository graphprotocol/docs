import { HTMLAttributes } from 'react'
import { Text, TextProps, Spacing } from '@edgeandnode/components'

export type ParagraphProps = Omit<TextProps & HTMLAttributes<HTMLParagraphElement>, 'color'>

export const Paragraph = ({ children, ...props }: ParagraphProps) => {
  return (
    <Text.P18
      sx={{
        mt: Spacing.L,
        mb: Spacing.L_XL,
        '&:first-child': { mt: 0 },
        '&:last-child': { mb: 0 },
      }}
      {...props}
    >
      {children}
    </Text.P18>
  )
}
