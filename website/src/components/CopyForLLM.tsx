import { useEffect, useRef, useState } from 'react'

interface CopyForLLMProps {
  /** URL to the raw Markdown source of this page */
  rawUrl: string
}

/**
 * A "Copy page" button with a dropdown that lets users:
 * 1. Copy the page's raw Markdown to the clipboard (great for LLMs)
 * 2. Open the raw Markdown in a new tab
 */
export function CopyForLLM({ rawUrl }: CopyForLLMProps) {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'copying' | 'copied'>('idle')
  const menuRef = useRef<HTMLDivElement>(null)

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const copyMarkdown = async () => {
    setOpen(false)
    setStatus('copying')
    try {
      const res = await fetch(rawUrl)
      const text = await res.text()
      await navigator.clipboard.writeText(text)
      setStatus('copied')
      setTimeout(() => setStatus('idle'), 2000)
    } catch {
      setStatus('idle')
    }
  }

  const label = status === 'copied' ? 'Copied!' : status === 'copying' ? 'Copying…' : 'Copy page'

  return (
    <div ref={menuRef} className="relative flex items-center">
      {/* Primary button */}
      <button
        onClick={() => void copyMarkdown()}
        className="
          rounded-s text-body-xsmall flex
          items-center gap-1.5 border
          border-space-1400 px-2.5
          py-1 text-space-700
          outline-offset-2 transition
          hover:border-space-1200 hover:text-space-300
        "
      >
        <ClipboardIcon />
        {label}
      </button>

      {/* Chevron toggle */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="More options"
        aria-expanded={open}
        className="
          rounded-e flex
          items-center border border-s-0 border-space-1400
          px-1.5 py-1
          text-space-700
          outline-offset-2 transition
          hover:border-space-1200 hover:text-space-300
        "
      >
        <ChevronIcon open={open} />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="rounded absolute end-0 top-full z-20 mt-1.5 w-64 overflow-hidden border border-space-1400 bg-space-1700 shadow-lg">
          <button
            onClick={() => void copyMarkdown()}
            className="flex w-full items-start gap-3 px-4 py-3 text-start transition hover:bg-space-1600"
          >
            <ClipboardIcon className="mt-0.5 shrink-0 text-space-500" size={16} />
            <div>
              <div className="text-body-small text-white">Copy page</div>
              <div className="text-body-xsmall text-space-600">Copy page as Markdown for LLMs</div>
            </div>
          </button>

          <a
            href={rawUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex items-start gap-3 px-4 py-3 transition hover:bg-space-1600"
          >
            <MarkdownIcon className="mt-0.5 shrink-0 text-space-500" />
            <div>
              <div className="text-body-small text-white">View as Markdown ↗</div>
              <div className="text-body-xsmall text-space-600">View this page as plain text</div>
            </div>
          </a>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// Inline SVG icons (avoids adding an icon library dependency)
// ---------------------------------------------------------------------------

function ClipboardIcon({ className, size = 14 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="9" y="2" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d={open ? 'M1 7l4-4 4 4' : 'M1 3l4 4 4-4'} />
    </svg>
  )
}

function MarkdownIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  )
}
