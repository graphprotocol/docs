import { TableHTMLAttributes } from 'react'

import { buildBorder, buildColor, FontWeight, Spacing, Text } from '@edgeandnode/gds'

export type TableProps = Omit<TableHTMLAttributes<HTMLTableElement>, 'color'>

export const Table = ({ children, ...props }: TableProps) => {
  return (
    <Text as="div" size="16px" sx={{ mt: Spacing['24px'], mb: Spacing['32px'], overflowX: 'auto' }}>
      <table
        sx={{
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
          '& tr:has(.highlight-row) td, & td:has(.highlight-cell)': {
            bg: 'Purple8',
          },
        }}
        {...props}
      >
        {children}
      </table>
    </Text>
  )
}
