import { type FocusEvent, type MouseEvent, type PointerEvent, useEffect, useRef, useState } from 'react'

import { ExperimentalButton, type ExperimentalButtonProps, Tooltip } from '@edgeandnode/gds'
import { CopyInteractive } from '@edgeandnode/gds/icons'

import { useI18n } from '@/i18n'

/**
 * Turn an "Edit on GitHub" URL (`/blob/` for local pages, `/tree/` for remote pages) into the URL of the raw file.
 */
export function getRawSourceUrl(githubUrl: string) {
  return githubUrl.replace(
    /^https:\/\/github\.com\/([^/]+)\/([^/]+)\/(?:blob|tree)\//,
    'https://raw.githubusercontent.com/$1/$2/',
  )
}

const FENCE = /^\s*(```|~~~)/
const MDX_IMPORT = /^import\s.+\sfrom\s+['"][^'"]+['"];?\s*$|^import\s+['"][^'"]+['"];?\s*$/

/**
 * Turn a page's MDX source into Markdown that can be pasted into an LLM: replace the YAML frontmatter with the
 * page title and its URL, and remove MDX `import` lines. Lines inside code blocks are never removed.
 */
export function toLlmMarkdown(source: string, { title, url }: { title?: string; url: string }) {
  let inFence = false
  const body = source
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
    .split(/\r?\n/)
    .filter((line) => {
      if (FENCE.test(line)) inFence = !inFence
      return inFence || !MDX_IMPORT.test(line)
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
  // Pages sourced from other repos keep their own `# Title`, so only add one when it's missing
  const ownHeading = /^# .*/.exec(body)?.[0]
  const heading = ownHeading ?? (title ? `# ${title}` : null)
  const content = ownHeading ? body.slice(ownHeading.length).trim() : body
  return `${[heading, `Source: ${url}`, content].filter(Boolean).join('\n\n')}\n`
}

interface CopyPageButtonProps extends Omit<ExperimentalButtonProps.ButtonProps, 'children'> {
  /** URL of the page's source file on GitHub (the "Edit on GitHub" URL). */
  sourceUrl: string
  /** Page title, added as a heading since the frontmatter is removed. */
  title?: string
}

/**
 * Copies the current page as Markdown, for pasting into an LLM. Built from the same parts as
 * `ExperimentalCopyButton`, but only confirms once the page has actually been copied.
 */
export function CopyPageButton({ sourceUrl, title, onClick, onFocus, onPointerEnter, ...props }: CopyPageButtonProps) {
  const { t } = useI18n()
  const markdown = useRef<Promise<string> | null>(null)
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle')

  useEffect(() => {
    if (status === 'idle') return
    const timer = setTimeout(() => setStatus('idle'), 2000)
    return () => clearTimeout(timer)
  }, [status])

  // Start loading on hover or focus, so the source is usually ready by the time the button is clicked
  const load = () => {
    if (!markdown.current) {
      const promise = fetch(getRawSourceUrl(sourceUrl))
        .then((response) => {
          if (!response.ok) throw new Error(`Failed to load ${response.url} (${response.status})`)
          return response.text()
        })
        .then((source) => toLlmMarkdown(source, { title, url: window.location.href.split('#')[0]! }))
      // Allow a retry if loading failed
      promise.catch(() => {
        markdown.current = null
      })
      markdown.current = promise
    }
    return markdown.current
  }

  const copy = async () => {
    const text = load()
    // Safari only allows writing to the clipboard during the click itself, so pass it the pending text
    if (typeof ClipboardItem !== 'undefined' && 'write' in navigator.clipboard) {
      const blob = text.then((value) => new Blob([value], { type: 'text/plain' }))
      await navigator.clipboard.write([new ClipboardItem({ 'text/plain': blob })])
    } else {
      await navigator.clipboard.writeText(await text)
    }
  }

  return (
    <Tooltip
      content={{
        text: status === 'failed' ? t('global.page.copyFailed') : t('global.page.copied'),
        type: 'kpi',
      }}
      open={status !== 'idle'}
    >
      <ExperimentalButton
        size="small"
        iconAfter={<CopyInteractive alt="" copied={status === 'copied'} />}
        onPointerEnter={(event: PointerEvent<HTMLButtonElement>) => {
          onPointerEnter?.(event)
          void load()
        }}
        onFocus={(event: FocusEvent<HTMLButtonElement>) => {
          onFocus?.(event)
          void load()
        }}
        onClick={(event: MouseEvent<HTMLButtonElement>) => {
          onClick?.(event)
          setStatus('idle')
          copy().then(
            () => setStatus('copied'),
            () => setStatus('failed'),
          )
        }}
        {...props}
      >
        {t('global.page.copy')}
      </ExperimentalButton>
    </Tooltip>
  )
}
