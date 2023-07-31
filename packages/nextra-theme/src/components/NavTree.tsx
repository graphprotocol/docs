import { keyframes } from '@emotion/react'
import * as Collapsible from '@radix-ui/react-collapsible'
import { AnchorHTMLAttributes, createContext, HTMLAttributes, useContext, useState } from 'react'
import { SxProp } from 'theme-ui'

import {
  buildTransition,
  ButtonOrLink,
  ButtonOrLinkProps,
  Divider,
  Flex,
  Icon,
  IconProps,
  Spacing,
  Text,
  TextProps,
  useI18n,
} from '@edgeandnode/gds'

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
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'target'> & {
    active?: boolean
    linkProps?: HTMLAttributes<HTMLElement> & SxProp
    diamondProps?: Partial<IconProps> & SxProp
  }
export type NavTreeGroupProps = HTMLAttributes<HTMLElement> & {
  active?: boolean
}
export type NavTreeGroupHeadingProps = HTMLAttributes<HTMLElement> & {
  buttonProps?: HTMLAttributes<HTMLElement> & SxProp
}
export type NavTreeGroupContentProps = HTMLAttributes<HTMLElement>
export type NavTreeDividerProps = Omit<HTMLAttributes<HTMLElement>, 'children'>
export type NavTreeHeadingProps = HTMLAttributes<HTMLElement>

const NavTree = ({ children, textProps, ...props }: NavTreeProps) => {
  return (
    <Flex.Column as="nav" {...props}>
      <Text as="ul" weight="SEMIBOLD" size="14px" {...textProps}>
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
    <li {...props}>
      <ButtonOrLink
        href={href}
        target={target}
        sx={{
          display: 'block',
          px: Spacing['24px'],
          py: Spacing['12px'],
          color: active ? 'White88' : 'White64',
          '&:hover': { color: 'White' },
          transition: buildTransition('COLORS'),
          ...linkSx,
        }}
        {...linkOtherProps}
      >
        {children}
        {active ? (
          <Icon.DiamondSolid
            size="12px"
            sx={{
              position: 'absolute',
              left: Spacing['4px'],
              insetInlineStart: Spacing['4px'],
              insetInlineEnd: 'auto',
              top: 0,
              bottom: 0,
              my: 'auto',
              ...diamondSx,
            }}
            {...diamondOtherProps}
          />
        ) : null}
      </ButtonOrLink>
    </li>
  )
}

export const NavTreeGroupContext = createContext({
  active: false,
  open: false,
})

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
  const context = useContext(NavTreeGroupContext)
  const { t } = useI18n<any>()

  return (
    <div {...props}>
      <Collapsible.Trigger
        sx={{
          width: '100%',
          paddingInline: Spacing['24px'],
          py: Spacing['12px'],
          color: context.open || context.active ? 'White88' : 'White64',
          '&:hover': { color: 'White' },
          transition: buildTransition('COLORS'),
          ...buttonSx,
        }}
        {...buttonOtherProps}
      >
        <Flex.Row as="span" justify="space-between" align="center" gap={Spacing['16px']}>
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
              title={context.open ? t('global.collapse') : t('global.expand')}
              size={['16px', null, null, '14px']}
            />
          </Flex.Column>
        </Flex.Row>
      </Collapsible.Trigger>
    </div>
  )
}

const NavTreeGroupContent = ({ children, ...props }: NavTreeGroupContentProps) => {
  const context = useContext(NavTreeGroupContext)
  return (
    <Collapsible.Content
      sx={{
        overflow: 'hidden',
        animation: buildTransition(context.open ? animationExpand.toString() : animationCollapse.toString()),
      }}
      {...props}
    >
      <ul sx={{ paddingInlineStart: Spacing['16px'] }}>{children}</ul>
    </Collapsible.Content>
  )
}

const NavTreeDivider = (props: NavTreeDividerProps) => {
  return (
    <li aria-hidden="true" sx={{ my: Spacing['8px'] }} {...props}>
      <Divider />
    </li>
  )
}

const NavTreeHeading = ({ children, ...props }: NavTreeHeadingProps) => {
  return (
    <li
      sx={{
        mt: Spacing['24px'],
        mb: Spacing['12px'],
        paddingInlineStart: Spacing['24px'],
      }}
      {...props}
    >
      <Text.C12 color="White48">{children}</Text.C12>
    </li>
  )
}

NavTree.Item = NavTreeItem
NavTree.Group = NavTreeGroup
NavTreeGroup.Heading = NavTreeGroupHeading
NavTreeGroup.Content = NavTreeGroupContent
NavTree.Divider = NavTreeDivider
NavTree.Heading = NavTreeHeading

export { NavTree }
