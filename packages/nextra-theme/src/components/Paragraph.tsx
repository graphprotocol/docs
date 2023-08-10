import { HTMLAttributes } from 'react'

import { Spacing, Text, TextProps } from '@edgeandnode/gds'

export type ParagraphProps = Omit<TextProps & HTMLAttributes<HTMLParagraphElement>, 'color'>

export const Paragraph = ({ children, ...props }: ParagraphProps) => {
  return (
    <Text.P18
      sx={{
        mt: Spacing['16px'],
        '/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ &:nth-child(1 of :not(style))':
          { mt: 0 },
        mb: Spacing['24px'],
        '*:where(ol, ul) &': { mb: Spacing['16px'] },
        '/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ &:nth-last-child(1 of :not(style))':
          { mb: 0 },
      }}
      {...props}
    >
      {children}
    </Text.P18>
  )
}
