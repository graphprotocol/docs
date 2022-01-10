import { HTMLAttributes } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Flex, Spacing, BorderRadius, Opacity } from '@edgeandnode/components'

import { Text, Diamond } from '@/components'

export type DropdownProps = HTMLAttributes<HTMLElement>
export type DropdownButtonProps = HTMLAttributes<HTMLElement>
export type DropdownMenuProps = HTMLAttributes<HTMLElement> & Popover.PopoverContentProps
export type DropdownMenuItemProps = HTMLAttributes<HTMLElement> & {
  active?: boolean
}

const Dropdown = ({ children, ...props }: DropdownProps) => {
  return (
    <Popover.Root>
      <div {...props}>{children}</div>
    </Popover.Root>
  )
}

const DropdownButton = ({ children, ...props }: DropdownButtonProps) => {
  return <Popover.Trigger {...props}>{children}</Popover.Trigger>
}

const DropdownMenu = ({ children, ...props }: DropdownMenuProps) => {
  return (
    <Popover.Content
      sideOffset={8}
      sx={{
        padding: Spacing.L_XL,
        borderRadius: BorderRadius.S,
        border: (theme) => `1px solid ${theme.colors!.White4}`,
        background: (theme) => theme.colors!.MidnightGradient,
      }}
      {...props}
    >
      <Flex.Column as="ul" role="list">
        {children}
      </Flex.Column>
    </Popover.Content>
  )
}

const DropdownMenuItem = ({ active = false, onSelect, children, ...props }: DropdownMenuItemProps) => {
  return (
    <li {...props}>
      <Popover.Close
        sx={{
          px: Spacing.XL,
          py: Spacing.M,
          opacity: Opacity['64%'],
          '&:hover': { opacity: Opacity['100%'] },
          '&:focus': { outline: 'none', textDecoration: 'underline' },
          transition: 'opacity 200ms',
        }}
        onClick={onSelect}
      >
        {active && <Diamond sx={{ position: 'absolute', left: '12px', top: 0, bottom: 0, my: 'auto' }} />}
        <Text size="16px">{children}</Text>
      </Popover.Close>
    </li>
  )
}

Dropdown.Button = DropdownButton
Dropdown.Menu = DropdownMenu
DropdownMenu.Item = DropdownMenuItem

export { Dropdown }
