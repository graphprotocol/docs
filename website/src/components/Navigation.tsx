import {
  type ComponentPropsWithoutRef,
  createContext,
  type MouseEvent,
  type ReactNode,
  useContext,
  useState,
} from 'react'

import {
  ButtonOrLink,
  type ButtonOrLinkProps,
  classNames,
  ExperimentalButton,
  ExperimentalTransition,
} from '@edgeandnode/gds'
import { CaretDown } from '@edgeandnode/gds/icons'

export const NavigationGroup = ({ className, children, ...props }: ComponentPropsWithoutRef<'div'>) => {
  return (
    <div className={classNames(['-mx-4 overflow-clip border-b border-white/8 px-4 py-2', className])} {...props}>
      <NavigationList>{children}</NavigationList>
    </div>
  )
}

export const NavigationListContext = createContext<{
  depth: number
} | null>(null)

export const NavigationList = ({ className, children, ...props }: ComponentPropsWithoutRef<'ul'>) => {
  const ancestorNavigationListContext = useContext(NavigationListContext)
  const depth = ancestorNavigationListContext ? ancestorNavigationListContext.depth + 1 : 0

  return (
    <NavigationListContext.Provider value={{ depth }}>
      <ul data-depth={depth} className={classNames(['group/navigation-list', className])} {...props}>
        {children}
      </ul>
    </NavigationListContext.Provider>
  )
}

declare namespace NavigationItemProps {
  interface BaseProps {
    title: string
    icon?: ReactNode
    selected?: boolean | 'partially'
  }
  interface ButtonProps extends BaseProps, Omit<ButtonOrLinkProps.ButtonProps, 'title' | 'selected'> {}
  interface ExternalLinkProps extends BaseProps, Omit<ButtonOrLinkProps.ExternalLinkProps, 'title' | 'selected'> {}
  interface ClientLinkProps extends BaseProps, Omit<ButtonOrLinkProps.ClientLinkProps, 'title' | 'selected'> {}
}

export type NavigationItemProps =
  | NavigationItemProps.ButtonProps
  | NavigationItemProps.ExternalLinkProps
  | NavigationItemProps.ClientLinkProps

export const NavigationItem = ({
  title,
  icon,
  selected,
  onClick,
  className,
  children,
  ...props
}: NavigationItemProps) => {
  const navigationListContext = useContext(NavigationListContext)
  const depth = navigationListContext?.depth ?? 0
  const [expandedIfChildren, setExpanded] = useState(false)
  const expanded = children ? expandedIfChildren : false

  return (
    <li
      data-expanded={expanded || undefined}
      className={classNames([
        `group/navigation-item
        [--docs-navigation-item-expanded:0]
        [--docs-navigation-item-first:0]
        [--docs-navigation-item-last:0]
        [--docs-navigation-item-no-top-line:0]
        first:[--docs-navigation-item-first:1]
        last:[--docs-navigation-item-last:1]
        data-[expanded]:[--docs-navigation-item-expanded:1]
        nearest-group-[&>li:has(ul:not(:scope_ul_*,[inert]_*)>li:last-child[data-expanded])+]/navigation-list:[--docs-navigation-item-no-top-line:1]`,
        className,
      ])}
    >
      <div className="flex items-center">
        {/* TODO: Focus ring? */}
        <ButtonOrLink
          selected={selected === true}
          data-partially-selected={selected === 'partially' ? true : undefined}
          onClick={(event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
            setExpanded(true)
            onClick?.(event)
          }}
          className="flex flex-1 gap-1.5 p-2 ps-1"
          {...props}
        >
          <span
            className={`
              flex size-6 shrink-0 items-center justify-center text-white/64 transition
              in-clickable-hocus-visible:text-white
              in-clickable-[[aria-current=true]]:text-purple
              in-clickable-[[data-partially-selected]]:text-white
              in-clickable-[[aria-current=true]]:transition-none
              nested-icon:size-4
            `}
          >
            {depth === 0 ? icon : null}
          </span>
          <span
            className={`
              text-p16 text-white/64 transition
              in-clickable-hocus-visible:text-white
              in-clickable-[[aria-current=true]]:text-white
              in-clickable-[[data-partially-selected]]:text-white
              in-clickable-[[aria-current=true]]:transition-none
            `}
          >
            {title}
          </span>
          {depth > 0 ? (
            <span className="absolute inset-y-0 left-3 flex w-1.5 flex-col items-center gap-1">
              <span
                className={`
                  w-px flex-1 bg-white/8 transition duration-150
                  @style-[--docs-navigation-item-no-top-line=1]:opacity-0
                  @style-[--docs-navigation-item-no-top-line=1]:delay-150
                  @style-[--docs-navigation-item-first=1]:not-in-group-data-[depth=2]/navigation-list:opacity-0
                `}
              />
              <span
                className={`
                  size-2 rounded-full bg-white/8 transition
                  in-clickable-hocus-visible:bg-white/16
                  in-clickable-[[aria-current=true]]:bg-purple
                  in-clickable-[[data-partially-selected]]:bg-white/16
                  in-clickable-[[aria-current=true]]:transition-none
                `}
              />
              <span
                className={`
                  w-px flex-1 bg-white/8 transition duration-150
                  @style-[--docs-navigation-item-expanded=0]:@style-[--docs-navigation-item-last:1]:@style-[--docs-previous-navigation-item-last:1]:opacity-0
                  @style-[--docs-navigation-item-expanded=0]:@style-[--docs-navigation-item-last:1]:@style-[--docs-previous-navigation-item-last:1]:delay-150
                  @style-[--docs-navigation-item-expanded=0]:@style-[--docs-navigation-item-last:1]:@style-[--docs-previous-navigation-item-last:1]:duration-300
                `}
              />
            </span>
          ) : null}
        </ButtonOrLink>
        {children ? (
          <ExperimentalButton
            variant="tertiary"
            size="xsmall"
            aria-expanded={expanded}
            onClick={() => setExpanded((expanded) => !expanded)}
          >
            <CaretDown
              alt={expanded ? 'Collapse' : 'Expand'}
              size={3.5}
              className="transition-transform duration-300 in-clickable-[[aria-expanded=true]]:-rotate-180 in-clickable-not-hocus-visible:prop-color-white/64"
            />
          </ExperimentalButton>
        ) : null}
      </div>
      {children ? (
        <div>
          <ExperimentalTransition
            duration={300}
            mode="exit-enter"
            className={`
              not-safari:group-data-[depth=1]/navigation-list:[--gds-transition-enter-translate-x:-16px]
              not-safari:group-data-[depth=1]/navigation-list:[--gds-transition-exit-translate-x:-16px]
              not-in-group-data-[depth=1]/navigation-list:[--gds-transition-enter-opacity:1]
              not-in-group-data-[depth=1]/navigation-list:[--gds-transition-exit-opacity:1]
            `}
          >
            <NavigationList
              key={expanded ? 'expanded' : 'collapsed'}
              className={`
                [--docs-previous-navigation-item-expanded:var(--docs-navigation-item-expanded)]
                [--docs-previous-navigation-item-first:var(--docs-navigation-item-first)]
                [--docs-previous-navigation-item-last:var(--docs-navigation-item-last)]
                group-data-[depth=1]/navigation-list:ps-4
              `}
            >
              {expanded ? children : null}
            </NavigationList>
          </ExperimentalTransition>
          {depth > 0 ? (
            <span className="absolute inset-y-0 left-3.5 z-10 w-[17px] translate-x-[0.5px]">
              <svg
                viewBox="0 0 17 17"
                className={`
                  absolute -top-2 left-0 z-10 aspect-square w-full origin-left bg-background fill-none stroke-white/8 transition duration-150 safari:delay-150
                  @style-[--docs-navigation-item-expanded=0]:opacity-0
                  @style-[--docs-navigation-item-expanded=0]:safari:delay-0
                `}
              >
                <path
                  d="M 0.5 0 C 0.5 13, 16.5 4, 16.5 17"
                  className={`
                    transition-all duration-150
                    [d:path('M_0.5_0_C_0.5_13,_0.5_4,_0.5_17')]
                    @style-[--docs-navigation-item-expanded=1]:delay-150
                    @style-[--docs-navigation-item-expanded=1]:[d:path('M_0.5_0_C_0.5_13,_16.5_4,_16.5_17')]
                  `}
                />
              </svg>
              <span
                className={`
                  absolute inset-y-0 left-0 w-px bg-white/8 transition delay-75 duration-75
                  @style-[--docs-navigation-item-expanded=1]:opacity-0
                  @style-[--docs-navigation-item-expanded=1]:delay-150
                `}
              />
              <svg
                viewBox="0 0 17 17"
                className={`
                  absolute -bottom-2 left-0 aspect-square w-full origin-left bg-background fill-none stroke-white/8 transition duration-150 safari:delay-150
                  nearest-group-[&:has(ul:not(:scope_ul_*,[inert]_*)>li:last-child[data-expanded])]/navigation-item:opacity-0
                  nearest-group-[&:has(ul:not(:scope_ul_*,[inert]_*)>li:last-child[data-expanded])]/navigation-item:delay-150
                  @style-[--docs-navigation-item-expanded=0]:opacity-0
                  @style-[--docs-navigation-item-last=1]:opacity-0
                  @style-[--docs-navigation-item-expanded=0]:safari:delay-0
                `}
              >
                <path
                  d="M 16.5 0 C 16.5 13, 0.5 4, 0.5 17"
                  className={`
                    transition-all duration-150
                    [d:path('M_0.5_0_C_0.5_13,_0.5_4,_0.5_17')]
                    @style-[--docs-navigation-item-expanded=1]:delay-150
                    @style-[--docs-navigation-item-expanded=1]:[d:path('M_16.5_0_C_16.5_13,_0.5_4,_0.5_17')]
                  `}
                />
              </svg>
            </span>
          ) : null}
        </div>
      ) : null}
    </li>
  )
}
