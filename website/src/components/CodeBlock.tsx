import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { classNames, ExperimentalCodeBlock, type ExperimentalCodeBlockProps } from '@edgeandnode/gds'

interface CodeBlockProps extends Omit<ComponentPropsWithoutRef<'pre'>, 'children'> {
  children?:
    | ReactNode
    | {
        props: {
          children: string
          className?: string
        }
      }
}

export const CodeBlock = ({ className, children, ...props }: CodeBlockProps) => {
  const code = (
    children && typeof children === 'object' && 'props' in children
      ? String(children.props.children ?? '')
      : String(children ?? '')
  ).trim()
  const language =
    children && typeof children === 'object' && 'props' in children
      ? String(children.props.className ?? '').substring('language-'.length) || null
      : null
  const lineCount = code.split('\n').length
  return (
    <ExperimentalCodeBlock
      language={language as ExperimentalCodeBlockProps['language']}
      lineNumbers={lineCount > 1}
      className={classNames(['graph-docs-not-markdown --:my-8 --:last:mb-0 -:is-[li>*]:my-4', className])}
      {...(props as ComponentPropsWithoutRef<'div'>)}
    >
      {code}
    </ExperimentalCodeBlock>
  )
}
