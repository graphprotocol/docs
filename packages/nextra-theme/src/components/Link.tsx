import { AnchorHTMLAttributes } from 'react'

import { Link } from '@edgeandnode/gds'

export type LinkInlineProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type'>

export const LinkInline = (props: LinkInlineProps) => {
  return <Link.Inline href="#" {...props} />
}
