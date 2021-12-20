import { HTMLAttributes } from 'react'
import { Spacing } from '@edgeandnode/components'

// TODO: Consider moving to `@edgeandnode/components`

export type DividerProps = {
  withVerticalMargin?: boolean
} & HTMLAttributes<HTMLHRElement>

export const Divider = ({ withVerticalMargin = false, ...props }: DividerProps) => {
  return (
    <hr
      sx={{
        margin: `${withVerticalMargin ? Spacing.XL : '0'} 8px`,
        borderTop: (theme) => `1px solid ${theme.colors!.White16}`,
        '&::before, &::after': {
          content: `''`,
          position: 'absolute',
          top: '-3px',
          display: 'block',
          width: '5px',
          height: '5px',
          border: (theme) => `1px solid ${theme.colors!.White48}`,
          transform: 'rotate(45deg)',
        },
        '&::before': {
          left: '-8px',
        },
        '&::after': {
          right: '-8px',
        },
      }}
      {...props}
    />
  )
}
