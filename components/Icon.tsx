import { ElementType, HTMLAttributes } from 'react'
import * as Icons from '@/icons'

// TODO: Consider moving to `@edgeandnode/components`

export type IconProps = {
  icon: keyof typeof Icons | ElementType
  size?: number | string
  direction?: 'right' | 'down' | 'left' | 'up'
} & HTMLAttributes<HTMLElement>

export const Icon = ({ icon, size = '1em', direction = 'right', ...props }: IconProps) => {
  const IconSvg =
    typeof icon === 'string' && Object.keys(Icons).includes(icon) ? Icons[icon as keyof typeof Icons] : icon
  const finalSize = typeof size === 'number' ? `${size}px` : size
  const angle = {
    right: 0,
    down: 90,
    left: 180,
    up: 270,
  }[direction]

  return (
    <span
      sx={{
        display: 'inline-block',
        width: finalSize,
        height: finalSize,
        fill: 'currentColor',
        transform: `rotate(${angle}deg)`,
      }}
      {...props}
    >
      <IconSvg />
    </span>
  )
}
