import { HTMLAttributes } from 'react'
import { Spacing, FontWeight, Opacities, darkModeColors } from '@edgeandnode/components'
import Color from 'color'

import { Text } from '@/components'

// Using `color` to get an opaque version of `White16` for the table's borders, since a color with an alpha channel is ugly due to borders overlapping
const WhiteColor = Color(darkModeColors.White)
const MidnightColor = Color(darkModeColors.Midnight)
const BorderColor = MidnightColor.mix(WhiteColor, Opacities[16])

export type TableProps = Omit<HTMLAttributes<HTMLTableElement>, 'color'>

export const Table = ({ children, ...props }: TableProps) => {
  return (
    <Text as="div" size="16px" sx={{ mt: Spacing.L_XL, mb: Spacing.XL, overflowX: 'auto' }}>
      <table
        sx={{
          width: 'auto',
          '&, & th, & td': {
            p: Spacing.L,
            border: `1px solid ${BorderColor.hex()}`,
          },
          '& th': {
            bg: 'White4',
            fontWeight: FontWeight.SemiBold,
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
