import { type ComponentPropsWithoutRef, useContext } from 'react'

import { ButtonOrLink, classNames, ExperimentalDivider, ExperimentalLink } from '@edgeandnode/gds'
import { ArrowLeft, ArrowRight, CalendarDynamic, HourglassDynamic, SocialGitHub } from '@edgeandnode/gds/icons'

import { useI18n } from '@/i18n'

import { LayoutContext } from '../../shared'

export default function TemplateDefaultContent({ className, children, ...props }: ComponentPropsWithoutRef<'div'>) {
  const { filePath, frontMatter, lastUpdated, readingTime, remotePageUrl, flatDocsDirectories, activeIndex } =
    useContext(LayoutContext)!
  const { t, locale } = useI18n()

  const previousPage = flatDocsDirectories[activeIndex - 1] ?? null
  const nextPage = flatDocsDirectories[activeIndex + 1] ?? null

  const editPageUrl =
    remotePageUrl ??
    (() => {
      const [_src, _pages, locale, ...segments] = filePath.split('/')
      // If the current page is in a language other than English, link to the English version, as translations are handled by Crowdin
      return `https://github.com/graphprotocol/docs/blob/main/website/src/pages/${encodeURIComponent(
        locale === 'en' || locale === '[locale]' ? locale : 'en',
      )}/${segments.map(encodeURIComponent).join('/')}`
    })()

  return (
    <div
      data-hide-content-header={frontMatter.hideContentHeader || undefined}
      data-unwrap-content={frontMatter.unwrapContent || undefined}
      className={classNames([
        `group/layout-content-grid grid grow
        grid-cols-[1fr_[container-start]_minmax(auto,theme(spacing.192))_[container-end]_1fr]
        grid-rows-[[header]_auto_[content]_1fr_[footer]_auto]
        gap-x-[var(--graph-docs-content-padding)]
        transition-[gap]
        duration-[var(--graph-docs-layout-transition-duration)]`,
        className,
      ])}
      {...props}
    >
      {!frontMatter.hideContentHeader ? (
        <header className="col-[container] row-[header] pt-12 transition-[padding] duration-[var(--graph-docs-layout-transition-duration)]">
          {readingTime ? (
            <span className="mb-3 flex items-center gap-1 text-space-700">
              <HourglassDynamic
                alt={t('global.page.readingTime.minutes')}
                filledPercentage={(readingTime.minutes / 15) * 100}
              />
              <p className="text-body-small">
                {Math.ceil(readingTime.minutes)} {t('global.page.readingTime.minutes')}
              </p>
            </span>
          ) : null}
          {frontMatter.title ? (
            <h1 className="text-heading-large text-white xs:text-heading-xlarge">{frontMatter.title}</h1>
          ) : null}
        </header>
      ) : null}
      <section
        className={`
          text-body-medium col-[container] row-[content] pb-12 text-space-300
          -:mdx-[h2]:text-heading-medium
          -:mdx-[h3]:text-heading-small
          -:mdx-[h4,h5,h6]:text-heading-xsmall
          -:xs:mdx-[h2]:text-heading-large
          -:xs:mdx-[h3]:text-heading-medium
          -:xs:mdx-[h4]:text-heading-small
          group-data-[unwrap-content]/layout-content-grid:col-span-full
          group-data-[unwrap-content]/layout-content-grid:grid
          group-data-[unwrap-content]/layout-content-grid:auto-rows-max
          group-data-[unwrap-content]/layout-content-grid:grid-cols-subgrid
          ${/* The following allows one child to be full height by setting `row-[full]`; see https://codepen.io/benface/pen/PwoaKJg */ ''}
          group-data-[unwrap-content]/layout-content-grid:grid-rows-[repeat(auto-fit,minmax(0,max-content))_[full]_minmax(0,1fr)]
          -:group-data-[unwrap-content]/layout-content-grid:*:col-span-full
          -:group-not-data-[hide-content-header]/layout-content-grid:first:*:mt-6
          -:nested-[div:has(>svg.flowchart):not(:last-child)]:mb-8
          -:nested-[div:has(>svg.flowchart)]:mt-8
          -:mdx-[hr]:my-12
          -:mdx-[:is(h2,h3)]:mt-12
          -:mdx-[:is(h2,h3,h4,h5,h6):not(:last-child)]:mb-3
          -:mdx-[:is(h4,h5,h6)]:mt-8
          -:mdx-[:is(p,ul,ol):not(:last-child,:is(ul,ol)_*)]:mb-6
          -:mdx-[:is(ul,ol)_:is(ul,ol,p+p)]:mt-2
          -:mdx-[ul,ol]:flex
          -:mdx-[hr]:h-px
          -:mdx-[ol]:list-decimal
          -:mdx-[ul,ol]:flex-col
          -:mdx-[ul,ol]:gap-2
          -:mdx-[hr]:bg-space-1500
          -:mdx-[li]:ps-1.5
          -:mdx-[ul,ol]:ps-5
          -:mdx-[b,strong]:text-white
          -:mdx-[h2,h3,h4,h5,h6]:text-white
          -:mdx-[b,strong]:font-medium
          -:mdx-[ul>li]:after:absolute
          -:mdx-[ul>li]:after:-start-4.5
          -:mdx-[ul>li]:after:top-[calc(0.5lh-1px)]
          -:mdx-[ul>li]:after:h-0.5
          -:mdx-[ul>li]:after:w-3
          -:mdx-[ul>li]:after:bg-space-1100
          -:mdx-[ul>li]:after:content-['']
          md:pb-16
          -:md:mdx-[hr]:my-16
        `}
      >
        {children}
      </section>
      {!frontMatter.hideContentFooter ? (
        <footer className="col-[container] row-[footer]">
          <div className="text-body-xsmall flex items-center pb-12">
            {lastUpdated ? (
              <div className="text-body-xsmall flex items-center gap-1 text-space-700">
                <CalendarDynamic alt={t('global.page.lastUpdated')} date={lastUpdated.getDate()} />
                <time
                  dateTime={lastUpdated.toISOString()}
                  // Removes hydration errors because `toLocaleDateString` show different results in Node.js and in browser for some languages like `ar`
                  suppressHydrationWarning
                >
                  {lastUpdated.toLocaleDateString(locale, {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </div>
            ) : null}
            <ExperimentalLink
              href={editPageUrl}
              target="_blank"
              iconBefore={<SocialGitHub alt="" />}
              className="ms-auto text-space-700"
            >
              {t('global.page.edit')}
            </ExperimentalLink>
          </div>
          <ExperimentalDivider variant="subtle" />
          <div
            className={`
              text-body-xsmall flex gap-8 py-12 text-space-300 lg:text-body-small
              *:flex *:max-w-[min(theme(spacing.50),50%)] *:flex-col *:gap-2 *:outline-offset-8 *:transition hover:*:text-white
              md:pb-16
            `}
          >
            {previousPage ? (
              <ButtonOrLink href={previousPage.route}>
                <span className="absolute -inset-2" />
                <ArrowLeft alt={t('global.page.previous')} size={4} />
                <span className="line-clamp-2 text-ellipsis">{previousPage.title}</span>
              </ButtonOrLink>
            ) : null}
            {nextPage ? (
              <ButtonOrLink href={nextPage.route} className="ms-auto items-end text-end">
                <span className="absolute -inset-2" />
                <ArrowRight alt={t('global.page.next')} size={4} />
                <span className="line-clamp-2 text-ellipsis">{nextPage.title}</span>
              </ButtonOrLink>
            ) : null}
          </div>
        </footer>
      ) : null}
    </div>
  )
}
