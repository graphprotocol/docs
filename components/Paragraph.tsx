import { HTMLAttributes } from 'react'
import { Spacing } from '@edgeandnode/components'

import { Text, TextProps } from '@/components'

export type ParagraphProps = Omit<TextProps & HTMLAttributes<HTMLParagraphElement>, 'color'>

export const Paragraph = ({ children, ...props }: ParagraphProps) => {
  return (
    <Text as="p" size="18px" sx={{ mt: Spacing.L, mb: Spacing.L_XL }} {...props}>
      {children}
    </Text>
  )
}
