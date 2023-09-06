import { HTMLAttributes } from 'react'

import { List, Spacing } from '@edgeandnode/gds'

export const ListOrdered = (props: HTMLAttributes<HTMLOListElement>) => {
  return (
    <List.Numbers
      sx={{
        mt: Spacing['16px'],
        mb: Spacing['24px'],
        '/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ &:nth-last-child(1 of :not(style))':
          { mb: 0 },
      }}
      {...props}
    />
  )
}

export const ListUnordered = (props: HTMLAttributes<HTMLUListElement>) => {
  return (
    <List.Arrows
      sx={{
        mt: Spacing['16px'],
        mb: Spacing['24px'],
        '/* emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason */ &:nth-last-child(1 of :not(style))':
          { mb: 0 },
      }}
      {...props}
    />
  )
}

export const ListItem = (props: HTMLAttributes<HTMLLIElement>) => {
  return <List.Item {...props} />
}
