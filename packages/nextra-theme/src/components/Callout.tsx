import { buildBorder, Spacing, Text, TextProps } from '@edgeandnode/gds'

export type CalloutProps = Omit<TextProps, 'color'>

export const Callout = ({ children, ...props }: CalloutProps) => {
  return (
    <Text
      sx={{
        my: Spacing['32px'],
        '/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ &:nth-child(1 of :not(style))':
          { mt: 0 },
        '/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ &:nth-last-child(1 of :not(style))':
          { mb: 0 },
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
