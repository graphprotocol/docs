import type { ComponentPropsWithoutRef } from 'react'

import { classNames } from '@edgeandnode/gds'

interface TableProps extends ComponentPropsWithoutRef<'table'> {
  variant?: 'default' | 'supported-networks'
}

export const Table = ({ className, children, variant = 'default', ...props }: TableProps) => {
  const isSupportedNetworks = variant === 'supported-networks'
  //TODO: @hayderkg Fix when we decide if having variants or not
  return (
    <div
      className={classNames([
        'gradient-mask-x overflow-x-auto overflow-y-clip -:text-body-small --:my-8 --:last:mb-0 -:is-[li>*]:my-4',
        className,
      ])}
    >
      <table
        className={`
          h-max min-w-full overflow-clip
          ${
            isSupportedNetworks
              ? '-:nested-[td]:border-y -:nested-[td:not(:first-child)]:border-l -:nested-[td:not(:last-child)]:border-r -:nested-[td]:border-space-1500'
              : '-:nested-[th,td]:border -:nested-[th,td]:border-space-1500'
          }
          -:nested-[td:has(.highlight-cell)]:bg-purple-1200
          ${isSupportedNetworks ? '-:nested-[th]:h-8 -:nested-[th]:whitespace-nowrap' : '-:nested-[th]:whitespace-normal -:nested-[th]:bg-space-1700'}
          -:nested-[tr:has(.highlight-row)_td]:bg-purple-1200
          -:nested-[th,td]:px-3.5
          -:nested-[th,td]:py-2.5
          ${isSupportedNetworks ? '-:nested-[td]:h-16 -:nested-[td]:align-middle' : '-:nested-[td]:align-top'}
          -:nested-[th]:font-medium
          mdx-[:is(p,ul,ol):not(:last-child,:is(ul,ol)_*)]:mb-3
          mdx-[ul,ol]:gap-1
        `}
        {...props}
      >
        {children}
      </table>
    </div>
  )
}
