import type { ComponentProps, ReactNode } from 'react'

import { classNames, ExperimentalCodeBlock, type ExperimentalCodeBlockProps } from '@edgeandnode/gds'

interface CodeBlockProps extends Omit<ComponentProps<'pre'>, 'children'> {
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
      className={classNames([
        `graph-docs-not-markdown
        --:not-in-group/code-block-tabs:my-8
        --:not-in-group/code-block-tabs:last:mb-0
        -:not-in-group/code-block-tabs:is-[li>*]:my-4`,
        className,
      ])}
      {...(props as ComponentProps<'div'>)}
    >
      {code}
    </ExperimentalCodeBlock>
  )
}

export const CodeBlockTabs = ({ className, ...props }: ComponentProps<typeof ExperimentalCodeBlock.Tabs>) => {
  return (
    <ExperimentalCodeBlock.Tabs
      className={classNames(['graph-docs-not-markdown --my-8 -:is-[li>*]:my-4', className])}
      {...props}
    />
  )
}
