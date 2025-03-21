import type { ComponentPropsWithoutRef } from 'react'

import { classNames, Text } from '@edgeandnode/gds'

interface TableProps extends ComponentPropsWithoutRef<'table'> {}

export const Table = ({ className, children, ...props }: TableProps) => {
  return (
    <div
      className={classNames([
        'gradient-mask-x overflow-x-auto overflow-y-clip --:my-8 --:last:mb-0 -:is-[li>*]:my-4',
        className,
      ])}
    >
      <table
        className={`
          min-w-full
          nested-[th,td]:border
          nested-[th,td]:border-space-1500
          nested-[td:has(.highlight-cell)]:bg-purple-1200
          nested-[th]:bg-space-1600
          nested-[tr:has(.highlight-row)_td]:bg-purple-1200
          nested-[th,td]:px-4
          nested-[th,td]:py-2.5
          nested-[th]:text-center
          nested-[th]:font-medium
        `}
        {...props}
      >
        {children}
      </table>
    </div>
  )
}
