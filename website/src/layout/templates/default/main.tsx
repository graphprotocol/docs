import { type ComponentPropsWithoutRef, useContext } from 'react'

import { camelToKebab, classNames } from '@edgeandnode/gds'

import { LayoutContext } from '../../shared'
import { Template } from '../../Template'

export default function TemplateDefaultMain({ className, children, ...props }: ComponentPropsWithoutRef<'div'>) {
  const { frontMatter, template, activePath } = useContext(LayoutContext)!

  return (
    <main
      data-template-type={camelToKebab(template.type)}
      className={classNames([
        `grid min-h-[var(--graph-docs-viewport-height)]
        grid-cols-[auto_calc(var(--graph-docs-aside-width)*var(--graph-docs-aside-visible))]
        overflow-x-clip
        transition-[grid-template-columns]
        duration-[var(--graph-docs-layout-transition-duration)]
        [--graph-docs-aside-visible:0]
        [--graph-docs-aside-width:theme(spacing.66)]
        data-[template-type=open-api]:[--graph-docs-aside-width:theme(spacing.111)]
        lg:group-not-data-[sidebar-expanded-on-desktop]/layout-sidebar-grid:has-nested-not-empty/aside-content:[--graph-docs-aside-visible:1]
        xl:has-nested-not-empty/aside-content:[--graph-docs-aside-visible:1]`,
        className,
      ])}
      {...props}
    >
      <article className="graph-docs-content flex flex-col">
        {/* TODO: Merge into the breadcrumbs? */}
        {activePath.length > 1 ? (
          <div className="graph-docs-current-group hidden">
            {activePath
              .slice(0, -1)
              .map((item) => item.title)
              .join(' > ')}
          </div>
        ) : null}
        <Template part="content">{children}</Template>
      </article>

      <div>
        <aside
          className={`
            text-body-xsmall-tight invisible absolute inset-y-0 start-0 w-[var(--graph-docs-aside-width)] transition-[visibility]
            duration-[var(--graph-docs-layout-transition-duration)]
            has-nested-empty/aside-content:hidden
            lg:group-not-data-[sidebar-expanded-on-desktop]/layout-sidebar-grid:visible
            xl:visible
          `}
        >
          <div
            className={`
              nested/aside-content gradient-mask-y sticky top-[var(--graph-docs-header-height)] max-h-[var(--graph-docs-viewport-height)]
              overflow-y-auto overflow-x-clip py-12 pe-6 scrollbar-thin
            `}
          >
            {!frontMatter.hideTableOfContents ? <Template part="aside" /> : null}
          </div>
        </aside>
      </div>
    </main>
  )
}
