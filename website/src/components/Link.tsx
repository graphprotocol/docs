import { type ForwardedRef, forwardRef, type ReactNode } from 'react'

import {
  ButtonOrLink,
  type ButtonOrLinkElement,
  type ButtonOrLinkProps,
  classNames,
  ExperimentalIcon,
} from '@edgeandnode/gds'
import { ArrowUpRightInteractive } from '@edgeandnode/gds/icons'

// TODO: Add to GDS as `ExperimentalLink`
// TODO: Add logic from legacy `Link` where it can be rendered in a `ButtonOrLink`, in which case it renders a `span` and the hover state is triggered on the ancestor's hover
// TODO: Add `variant` CSS prop

export declare namespace LinkProps {
  interface BaseProps {
    /** @default "primary" */
    iconBefore?: ReactNode
    /** Defaults to `ArrowUpRightInteractive` if `href` is set and `target` is `_blank`. */
    iconAfter?: ReactNode
  }
  interface ButtonProps extends BaseProps, ButtonOrLinkProps.ButtonProps {}
  interface ExternalLinkProps extends BaseProps, ButtonOrLinkProps.ExternalLinkProps {}
  interface ClientLinkProps extends BaseProps, ButtonOrLinkProps.ClientLinkProps {}
}

export type LinkProps = LinkProps.ButtonProps | LinkProps.ExternalLinkProps | LinkProps.ClientLinkProps

export const Link = forwardRef(
  (
    { iconBefore, iconAfter: passedIconAfter, className, style, children, ...props }: LinkProps,
    ref: ForwardedRef<ButtonOrLinkElement>,
  ) => {
    return (
      <span className={classNames(['gds-link', className])}>
        <ButtonOrLink
          ref={ref}
          {...(props.href === undefined ? { asSpan: true } : {})}
          className={`
            group/link -mx-1 whitespace-nowrap rounded-4 border border-transparent box-decoration-clone px-1 py-0.5 text-[#4c9eff] outline-none transition
            hover:text-[#70b1ff]
            focus-visible:border-current
            active:text-[#3f80d1]
            active:transition-none
            +:disabled:text-white/48
            nested-icon:top-[0.075em]
            nested-icon:inline-block
          `}
          {...props}
        >
          {({ href, target }) => {
            const iconAfter =
              passedIconAfter !== undefined ? (
                passedIconAfter
              ) : href !== undefined && target === '_blank' ? (
                <ArrowUpRightInteractive alt="" />
              ) : undefined
            return (
              <>
                {iconBefore ? (
                  <>
                    <ExperimentalIcon alt="">{iconBefore}</ExperimentalIcon>&#8288;
                  </>
                ) : null}
                {children ? (
                  <span
                    className={`
                      truncate whitespace-normal from-current to-current bg-right-bottom pb-0.5 transition-[background-size] duration-200
                      [background-size:0%_1px]
                      not-first:ms-0.5
                      not-last:me-0.5
                      group-enabled/link:group-hover/link:bg-left-bottom
                      group-enabled/link:group-hover/link:[background-size:100%_1px]
                      group-disabled/link:[background-size:100%_1px]
                      group-not-focus-visible/link:bg-gradient-to-b
                    `}
                  >
                    {children}
                  </span>
                ) : null}
                {iconAfter ? (
                  <>
                    &#8288;<ExperimentalIcon alt="">{iconAfter}</ExperimentalIcon>
                  </>
                ) : null}
              </>
            )
          }}
        </ButtonOrLink>
      </span>
    )
  },
)
