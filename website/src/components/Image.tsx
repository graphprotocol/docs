import type { ComponentProps } from 'react'

import { classNames } from '@edgeandnode/gds'

interface ImageProps extends ComponentProps<'img'> {}

export const Image = ({ src, alt, className, ...props }: ImageProps) => {
  return (
    <figure
      className={classNames([
        'graph-docs-not-markdown rounded-8 bg-space-1600 --:my-8 --:last:mb-0 -:is-[li>*]:my-4 p-2',
        className,
      ])}
    >
      <img src={src} alt="" className="rounded-4 bg-space-1800 w-full" {...props} />
      {alt ? <figcaption className="text-body-xsmall text-space-700 mt-2 px-1 text-center">{alt}</figcaption> : null}
    </figure>
  )
}
