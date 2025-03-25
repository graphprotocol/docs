import { motion } from 'motion/react'
import { type ComponentPropsWithoutRef, type CSSProperties, useContext } from 'react'

import { ButtonOrLink, reactNodeToString } from '@edgeandnode/gds'

import { useI18n } from '@/i18n'

import { LayoutContext, MAX_HEADING_DEPTH, MDXContentContext } from '../../shared'

export default function TemplateDefaultAside(props: ComponentPropsWithoutRef<'div'>) {
  const { activeIndex } = useContext(LayoutContext)!
  const { headings, headingIsInOrAboveView } = useContext(MDXContentContext)!
  const { t } = useI18n()

  if (headings.length === 0) return null

  let highlightedHeadingId = null
  for (const heading of headings) {
    if (heading.depth <= MAX_HEADING_DEPTH && headingIsInOrAboveView(heading.id)) {
      highlightedHeadingId = heading.id
    }
  }

  return (
    <div {...props}>
      <header className="mb-4">{t('global.page.onThisPage')}</header>
      <nav
        aria-label={t('global.page.tableOfContents')}
        className="flow-root overflow-y-clip border-s border-space-1500"
      >
        <ul className="-my-1 -ms-px">
          {headings.map((heading, headingIndex) => {
            if (heading.depth > MAX_HEADING_DEPTH) {
              return null
            }
            const active = heading.id === highlightedHeadingId
            return (
              <li key={headingIndex}>
                {active ? (
                  <motion.span
                    className="absolute inset-y-1 start-0 w-px bg-purple-500"
                    // Using the page's `activeIndex` to ensure the indicator doesn't transition between pages
                    layoutId={`active-heading-indicator-${activeIndex}`}
                  />
                ) : null}
                <ButtonOrLink
                  href={`#${heading.id}`}
                  data-active={active ? 'true' : undefined}
                  className={`
                    block py-1.5 ps-[calc((var(--depth)-1)*theme(spacing.3))] text-space-700 transition
                    hover:text-white
                    data-[active]:text-space-200
                  `}
                  style={{ '--depth': heading.depth } as CSSProperties}
                >
                  {/* Calling `reactNodeToString` because the types are lying and `heading.value` can be a `ReactNode` that contains links, inline code, etc. */}
                  {reactNodeToString(heading.value)}
                </ButtonOrLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}
