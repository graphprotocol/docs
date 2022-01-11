import { HTMLAttributes } from 'react'
import * as Popover from '@radix-ui/react-popover'
import { Flex, Spacing, BorderRadius, Opacity, useUniqueId } from '@edgeandnode/components'

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
        border: 'White4',
        background: (theme) => theme.colors!.MidnightGradient,
      }}
      {...props}
    >
      <Flex.Column as="ul" role="list" tabIndex={0} sx={{ '&:focus': { outline: 'none' } }}>
        {children}
      </Flex.Column>
    </Popover.Content>
  )
}

const DropdownMenuItem = ({ active = false, onSelect, children, ...props }: DropdownMenuItemProps) => {
  const buttonClass = useUniqueId('class')

  return (
    <li {...props}>
      <Popover.Close
        className={buttonClass}
        sx={{
          width: '100%',
          px: Spacing.XL,
          py: Spacing.M,
          color: 'White88',
          '&:hover, &:focus': { color: 'White', outline: 'none' },
          transition: 'color 200ms',
        }}
        onClick={onSelect}
      >
        <Diamond
          sx={{
            position: 'absolute',
            left: '12px',
            top: 0,
            bottom: 0,
            my: 'auto',
            opacity: active ? Opacity['100%'] : Opacity['0%'],
            [`.${buttonClass}:hover &, .${buttonClass}:focus &`]: { opacity: active ? undefined : Opacity['32%'] },
          }}
        />
        <Text size="16px">{children}</Text>
      </Popover.Close>
    </li>
  )
}

Dropdown.Button = DropdownButton
Dropdown.Menu = DropdownMenu
DropdownMenu.Item = DropdownMenuItem

export { Dropdown }
