import { HTMLAttributes } from 'react'
import { Text, Spacing, FontWeight, buildBorder, buildColor } from '@edgeandnode/components'

export type TableProps = Omit<HTMLAttributes<HTMLTableElement>, 'color'>

export const Table = ({ children, ...props }: TableProps) => {
  return (
    <Text as="div" size="16px" sx={{ mt: Spacing['24px'], mb: Spacing['32px'], overflowX: 'auto' }}>
      <table
        sx={{
          width: 'auto',
          '&, & th, & td': {
            p: Spacing['16px'],
            // Border color has to be opaque because collapsed borders overlap
            border: buildBorder(buildColor(['Background', 'White16'])),
          },
          '& th': {
            bg: 'White4',
            fontWeight: FontWeight.SEMIBOLD,
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
