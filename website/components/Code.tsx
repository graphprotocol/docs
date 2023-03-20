import Highlight, { defaultProps, Language, PrismTheme } from 'prism-react-renderer'
import { HTMLAttributes } from 'react'

import { BorderRadius, FontFamily, Spacing } from '@edgeandnode/components'

export type CodeBlockProps = HTMLAttributes<HTMLPreElement>
export type CodeInlineProps = HTMLAttributes<HTMLElement>

import theme from 'prism-react-renderer/themes/duotoneDark'

export const CodeBlock = ({ children, ...props }: CodeBlockProps) => {
  const data = (
    children as {
      props: {
        children: string
        className?: string
      }
    }
  ).props
  const code = data.children.trim()
  let language = data.className?.substring('language-'.length)

  if (!language || language === 'sh') {
    language = 'bash'
  }

  return (
    <div sx={{ my: Spacing['24px'] }}>
      <Highlight {...defaultProps} code={code} language={language as Language} theme={theme}>
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            sx={{
              overflowX: 'auto',
              p: Spacing['16px'],
              borderRadius: BorderRadius.M,
              border: 'White4',
              bg: 'White4',
              fontFamily: FontFamily.MONOSPACE,
              fontSize: '16px',
              lineHeight: '24px',
            }}
            {...props}
          >
            {tokens.map((line, i) => (
              // eslint-disable-next-line react/jsx-key
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  // eslint-disable-next-line react/jsx-key
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  )
}

export const CodeInline = ({ children, ...props }: CodeInlineProps) => {
  return (
    <code
      sx={{
        px: Spacing['4px'],
        py: Spacing['2px'],
        borderRadius: BorderRadius.S,
        border: 'White4',
        bg: 'White4',
        fontFamily: FontFamily.MONOSPACE,
        fontSize: '0.75em',
      }}
      {...props}
    >
      {children}
    </code>
  )
}
