import type { ComponentProps } from 'react'

import { classNames } from '@edgeandnode/gds'

interface ImageProps extends ComponentProps<'img'> {}

export const Image = ({ src, alt, className, ...props }: ImageProps) => {
  return (
    <figure
      className={classNames([
        'graph-docs-not-markdown rounded-8 bg-space-1600 p-2 --:my-8 --:last:mb-0 -:is-[li>*]:my-4',
        className,
      ])}
    >
      <img src={src} alt="" className="w-full rounded-4 bg-space-1800" {...props} />
      {alt ? <figcaption className="text-body-xsmall mt-2 px-1 text-center text-space-700">{alt}</figcaption> : null}
    </figure>
  )
}
