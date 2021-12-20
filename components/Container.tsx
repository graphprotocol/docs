import { HTMLAttributes } from 'react'

// TODO: Consider moving to `@edgeandnode/components`

export type ContainerProps = HTMLAttributes<HTMLElement>

export const Container = ({ children, ...props }: ContainerProps) => {
  return (
    <div
      sx={{
        px: ['24px', null, '32px'],
      }}
      {...props}
    >
      {children}
    </div>
  )
}
