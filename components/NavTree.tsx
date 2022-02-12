import { HTMLAttributes, createContext, Context, useState, useContext } from 'react'
import * as Collapsible from '@radix-ui/react-collapsible'
import {
  Diamond,
  DiamondProps,
  NewGDSDivider,
  Text,
  TextProps,
  Flex,
  Icon,
  Spacing,
  buildTransition,
} from '@edgeandnode/components'
import { keyframes } from '@emotion/react'
import { SxProp } from 'theme-ui'

import { Link, LinkProps } from '@/components'
import { useI18n } from '@/hooks'

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
    diamondProps?: DiamondProps & SxProp
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
    <Flex.Column as="nav" {...props}>
      <Text weight="Semibold" size="14px" as="ul" {...textProps}>
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
          color: active ? 'White88' : 'White64',
          '&:hover': { color: 'White' },
          transition: buildTransition('COLORS'),
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
  const { translations } = useI18n()

  return (
    <div sx={{ py: Spacing.M }} {...props}>
      <Collapsible.Trigger
        sx={{
          width: '100%',
          px: Spacing.L_XL,
          py: Spacing.M_L,
          color: context.open || context.active ? 'White88' : 'White64',
          '&:hover': { color: 'White' },
          transition: buildTransition('COLORS'),
          ...buttonSx,
        }}
        {...buttonOtherProps}
      >
        <Flex.Row as="span" justify="space-between" align="center" gap={Spacing.L}>
          <span>{children}</span>
          <Flex.Column
            as="span"
            sx={{
              flexShrink: 0,
              transform: context.open ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: buildTransition('TRANSFORM'),
            }}
          >
            <Icon.CaretRight
              size={['16px', null, null, '14px']}
              title={context.open ? translations.global.collapse : translations.global.expand}
            />
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
        animation: buildTransition((context.open ? animationExpand.toString() : animationCollapse.toString()) as any),
      }}
      {...props}
    >
      <ul sx={{ pl: Spacing.L }}>{children}</ul>
    </Collapsible.Content>
  )
}

const NavTreeDivider = (props: NavTreeDividerProps) => {
  return (
    <li aria-hidden="true" sx={{ my: Spacing.M }} {...props}>
      <NewGDSDivider simple />
    </li>
  )
}

NavTree.Item = NavTreeItem
NavTree.Group = NavTreeGroup
NavTreeGroup.Heading = NavTreeGroupHeading
NavTreeGroup.Content = NavTreeGroupContent
NavTree.Divider = NavTreeDivider

export { NavTree }
