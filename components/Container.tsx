import { HTMLAttributes } from 'react'

// TODO: Move to `@edgeandnode/components`

// TODO: Add `maxWidth` and `padding` props
export type ContainerProps = HTMLAttributes<HTMLElement>

export const Container = ({ children, ...props }: ContainerProps) => {
  return (
    <div
      sx={{
        '--container-max-width': '1280px',
        '--container-padding': ['20px', null, '32px'],
        mx: 'auto',
        maxWidth: 'calc(var(--container-max-width) + 2 * var(--container-padding))',
        px: 'var(--container-padding)',
      }}
      {...props}
    >
      {children}
    </div>
  )
}
