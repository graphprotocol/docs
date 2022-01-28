import { HTMLAttributes } from 'react'
import { Text, Spacing, FontWeight, buildBorder, buildColor } from '@edgeandnode/components'

export type TableProps = Omit<HTMLAttributes<HTMLTableElement>, 'color'>

export const Table = ({ children, ...props }: TableProps) => {
  return (
    <Text as="div" size="16px" sx={{ mt: Spacing.L_XL, mb: Spacing.XL, overflowX: 'auto' }}>
      <table
        sx={{
          width: 'auto',
          '&, & th, & td': {
            p: Spacing.L,
            // Border color has to be opaque because collapsed borders overlap
            border: buildBorder(buildColor('White16', { opaque: true })),
          },
          '& th': {
            bg: 'White4',
            fontWeight: FontWeight.Semibold,
            textAlign: 'center',
          },
        }}
        {...props}
      >
        {children}
      </table>
    </Text>
  )
}
