import type { ComponentPropsWithoutRef } from 'react'

import { classNames, Text } from '@edgeandnode/gds'

interface TableProps extends ComponentPropsWithoutRef<'table'> {}

export const Table = ({ className, children, ...props }: TableProps) => {
  return (
    <div
      className={classNames([
        'gradient-mask-x overflow-x-auto overflow-y-clip not-first:mt-8 not-last:mb-8',
        className,
      ])}
    >
      <table
        className={`
          min-w-full
          nested-[th,td]:border
          nested-[th,td]:border-white-8
          nested-[td:has(.highlight-cell)]:bg-purple/4
          nested-[th]:bg-white/4
          nested-[tr:has(.highlight-row)_td]:bg-purple/4
          nested-[th,td]:px-4
          nested-[th,td]:py-3
          nested-[th]:text-center
          nested-[th]:font-semibold
        `}
        {...props}
      >
        {children}
      </table>
    </div>
  )
}
