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
    <div className={classNames(['overflow-clip border-b border-white/8 px-4 py-2', className])} {...props}>
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

type NavigationItemProps =
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
        nearest-group-[>li:has(ul:not(:scope_ul_*,[inert]_*)>li:last-child[data-expanded])+]/navigation-list:[--docs-navigation-item-no-top-line:1]`,
        className,
      ])}
    >
      <div data-selected={selected || undefined} className="group/navigation-item-trigger flex items-center py-0.5">
        <ButtonOrLink
          selected={selected === true}
          onClick={(event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => {
            setExpanded(true)
            onClick?.(event)
          }}
          className={`
            text-body-small flex flex-1 gap-1.5 py-1.5 pe-2 ps-1 text-white/64 transition
            hocus-visible:text-white
            group-data-[selected]/navigation-item-trigger:text-white
            group-data-[selected]/navigation-item-trigger:transition-none
          `}
          {...props}
        >
          <span className="flex size-6 shrink-0 items-center justify-center nested-icon:size-4">
            {depth === 0 ? icon : null}
          </span>
          <span>{title}</span>
        </ButtonOrLink>
        {depth > 0 ? (
          <span className="absolute inset-y-0 start-3 flex w-1.5 flex-col items-center gap-1">
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
                nearest-group-[:has(:is(a,button):is(:hover,:focus-visible))]/navigation-item:bg-white/16
                +:group-data-[selected=partially]/navigation-item-trigger:bg-white/32
                +:group-data-[selected=true]/navigation-item-trigger:bg-purple
                +:group-data-[selected]/navigation-item-trigger:transition-none
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
              className={`
                transition duration-300 prop-color-white/64
                group-data-[selected]/navigation-item-trigger:prop-color-white
                in-clickable-hocus-visible:prop-color-white
                in-clickable-[[aria-expanded=true]]:-rotate-180
              `}
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
              rtl:not-safari:group-data-[depth=1]/navigation-list:[--gds-transition-enter-translate-x:16px]
              rtl:not-safari:group-data-[depth=1]/navigation-list:[--gds-transition-exit-translate-x:16px]
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
            <span className="absolute inset-y-0 start-3.5 z-10 w-[17px] translate-x-[0.5px] rtl:translate-x-[-0.5px]">
              <svg
                viewBox="0 0 17 17"
                className={`
                  absolute -top-2 start-0 z-10 aspect-square w-full origin-[start] bg-background fill-none stroke-white/8 transition duration-150
                  safari:delay-150
                  @style-[--docs-navigation-item-expanded=0]:opacity-0
                  @style-[--docs-navigation-item-expanded=0]:safari:delay-0
                  rtl:-scale-x-100
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
                  absolute inset-y-0 start-0 w-px bg-white/8 transition delay-75 duration-75
                  @style-[--docs-navigation-item-expanded=1]:opacity-0
                  @style-[--docs-navigation-item-expanded=1]:delay-150
                `}
              />
              <svg
                viewBox="0 0 17 17"
                className={`
                  absolute -bottom-2 start-0 aspect-square w-full origin-[start] bg-background fill-none stroke-white/8 transition duration-150
                  safari:delay-150
                  nearest-group-[:has(ul:not(:scope_ul_*,[inert]_*)>li:last-child[data-expanded])]/navigation-item:opacity-0
                  nearest-group-[:has(ul:not(:scope_ul_*,[inert]_*)>li:last-child[data-expanded])]/navigation-item:delay-150
                  @style-[--docs-navigation-item-expanded=0]:opacity-0
                  @style-[--docs-navigation-item-last=1]:opacity-0
                  @style-[--docs-navigation-item-expanded=0]:safari:delay-0
                  rtl:-scale-x-100
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
