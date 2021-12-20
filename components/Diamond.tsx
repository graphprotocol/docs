import { HTMLAttributes } from 'react'

// TODO: Consider moving to `@edgeandnode/components`

export type DiamondProps = {
  size?: number
  outline?: boolean
} & HTMLAttributes<HTMLSpanElement>

export const Diamond = ({ size = 5, outline = false, ...props }: DiamondProps) => {
  return (
    <span
      sx={{
        width: `${size}px`,
        height: `${size}px`,
        border: outline ? '1px solid currentColor' : undefined,
        bg: outline ? undefined : 'currentColor',
        transform: 'rotate(45deg)',
      }}
      {...props}
    />
  )
}
