import { memo } from 'react'

import { Skeleton } from '@edgeandnode/gds'

export const SkeletonRow = memo(() => {
  return (
    <tr className="h-16">
      <td className="w-48">
        <div className="flex items-center gap-2">
          <Skeleton borderRadius="FULL" height="20px" width="20px" />
          <Skeleton borderRadius="XS" height="12px" width="100px" />
        </div>
      </td>
      <td className="w-48">
        <Skeleton borderRadius="XS" height="12px" width="80px" />
      </td>
      <td align="center">
        <Skeleton borderRadius="FULL" height="14px" width="14px" className="mx-auto" />
      </td>
      <td align="center">
        <Skeleton borderRadius="FULL" height="14px" width="14px" className="mx-auto" />
      </td>
      <td align="center">
        <Skeleton borderRadius="FULL" height="14px" width="14px" className="mx-auto" />
      </td>
      <td align="center">
        <Skeleton borderRadius="FULL" height="14px" width="14px" className="mx-auto" />
      </td>
    </tr>
  )
})
