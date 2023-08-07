import { HTMLAttributes, ReactNode } from 'react'

import { Code, Spacing } from '@edgeandnode/gds'

export type CodeBlockProps = {
  children?:
    | ReactNode
    | {
        props: {
          children: string
          className?: string
        }
      }
} & Omit<HTMLAttributes<HTMLPreElement>, 'children'>

export const CodeBlock = ({ children, ...props }: CodeBlockProps) => {
  const code =
    children && typeof children === 'object' && 'props' in children
      ? children.props.children.trim()
      : (children as string)
  let language =
    children && typeof children === 'object' && 'props' in children
      ? children.props.className?.substring('language-'.length)
      : null

  if (!language || language === 'sh') {
    language = 'bash'
  }

  return (
    <Code.Block
      language={language}
      sx={{
        my: Spacing['24px'],
        '/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ &:nth-child(1 of :not(style))':
          { mt: 0 },
        '/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ &:nth-last-child(1 of :not(style))':
          { mb: 0 },
      }}
      {...props}
    >
      {code}
    </Code.Block>
  )
}

export const CodeInline = ({ children, ...props }: HTMLAttributes<HTMLElement>) => {
  return <Code.Inline {...props}>{children as string}</Code.Inline>
}
