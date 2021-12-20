import { HTMLAttributes, createContext, Context, useState, useContext } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Flex, Spacing, Opacities } from '@edgeandnode/components'
import { keyframes } from '@emotion/react'
import { SxProp } from 'theme-ui'

import { Text, TextProps, Link, LinkProps, Icon, Diamond } from '@/components'

const animationExpand = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-collapsible-content-height)' },
})

const animationCollapse = keyframes({
  from: { height: 'var(--radix-collapsible-content-height)' },
  to: { height: 0 },
})

export type NavTreeProps = HTMLAttributes<HTMLElement> & {
  textProps?: TextProps
}
export type NavTreeItemProps = HTMLAttributes<HTMLElement> &
  Pick<LinkProps, 'href' | 'target'> & {
    active?: boolean
    linkProps?: LinkProps & SxProp
    diamondProps?: HTMLAttributes<HTMLElement> & SxProp
  }
export type NavTreeGroupProps = HTMLAttributes<HTMLElement> & {
  active?: boolean
}
export type NavTreeGroupHeadingProps = HTMLAttributes<HTMLElement> & {
  buttonProps?: HTMLAttributes<HTMLElement> & SxProp
}
export type NavTreeGroupContentProps = HTMLAttributes<HTMLElement>
export type NavTreeDividerProps = Omit<HTMLAttributes<HTMLElement>, 'children'>

const NavTree = ({ children, textProps, ...props }: NavTreeProps) => {
  return (
    <Flex.Column {...props}>
      <Text weight="SemiBold" size="14px" as="ul" role="list" {...textProps}>
        {children}
      </Text>
    </Flex.Column>
  )
}

const NavTreeItem = ({
  href,
  target,
  active = false,
  children,
  linkProps = {},
  diamondProps = {},
  ...props
}: NavTreeItemProps) => {
  const { sx: linkSx, ...linkOtherProps } = linkProps
  const { sx: diamondSx, ...diamondOtherProps } = diamondProps
  return (
    <li sx={{ py: Spacing.M }} {...props}>
      <Link
        href={href}
        target={target}
        sx={{
          display: 'block',
          px: Spacing.L_XL,
          py: Spacing.M_L,
          opacity: !active ? Opacities[64] : undefined,
          '&:hover': { opacity: Opacities[100] },
          transition: 'opacity 200ms',
          ...linkSx,
        }}
        {...linkOtherProps}
      >
        {children}
        {active && (
          <Diamond
            sx={{
              position: 'absolute',
              left: '6px',
              top: 0,
              bottom: 0,
              my: 'auto',
              ...diamondSx,
            }}
            {...diamondOtherProps}
          />
        )}
      </Link>
    </li>
  )
}

export const NavTreeGroupContext = createContext(null) as Context<{
  active: boolean
  open: boolean
} | null>

const NavTreeGroup = ({ active = false, children, ...props }: NavTreeGroupProps) => {
  const [open, setOpen] = useState(active)
  return (
    <NavTreeGroupContext.Provider value={{ active, open }}>
      <li {...props}>
        <Collapsible.Root open={open} onOpenChange={setOpen}>
          {children}
        </Collapsible.Root>
      </li>
    </NavTreeGroupContext.Provider>
  )
}

const NavTreeGroupHeading = ({ children, buttonProps = {}, ...props }: NavTreeGroupHeadingProps) => {
  const { sx: buttonSx, ...buttonOtherProps } = buttonProps
  const context = useContext(NavTreeGroupContext)!
  return (
    <div sx={{ py: Spacing.M }} {...props}>
      <Collapsible.Trigger
        sx={{
          width: '100%',
          px: Spacing.L_XL,
          py: Spacing.M_L,
          opacity: context.open || context.active ? Opacities[100] : Opacities[64],
          '&:hover': { opacity: Opacities[100] },
          transition: 'opacity 200ms',
          ...buttonSx,
        }}
        {...buttonOtherProps}
      >
        <Flex.Row as="span" justify="space-between" align="center">
          <span>{children}</span>
          <Flex.Column
            as="span"
            sx={{
              ml: Spacing.L,
              flex: 'none',
              transform: context.open ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 200ms',
            }}
          >
            <Icon icon="Caret" direction="right" />
          </Flex.Column>
        </Flex.Row>
      </Collapsible.Trigger>
    </div>
  )
}

const NavTreeGroupContent = ({ children, ...props }: NavTreeGroupContentProps) => {
  const context = useContext(NavTreeGroupContext)!
  return (
    <Collapsible.Content
      sx={{
        overflow: 'hidden',
        animation: `${context.open ? animationExpand : animationCollapse} 200ms ease-out`,
      }}
      {...props}
    >
      <ul role="list" sx={{ pl: Spacing.L }}>
        {children}
      </ul>
    </Collapsible.Content>
  )
}

const NavTreeDivider = (props: NavTreeDividerProps) => {
  return (
    <li
      aria-hidden="true"
      sx={{ my: Spacing.M, borderTop: (theme) => `1px solid ${theme.colors!.White16}` }}
      {...props}
    />
  )
}

NavTree.Item = NavTreeItem
NavTree.Group = NavTreeGroup
NavTreeGroup.Heading = NavTreeGroupHeading
NavTreeGroup.Content = NavTreeGroupContent
NavTree.Divider = NavTreeDivider

export { NavTree }
