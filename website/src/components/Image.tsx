import type NextImage from 'next/image'
import type { ComponentPropsWithoutRef } from 'react'

import { classNames } from '@edgeandnode/gds'

interface ImageProps extends Omit<ComponentPropsWithoutRef<'img'>, 'src'> {
  src?: ComponentPropsWithoutRef<typeof NextImage>['src']
}

export const Image = ({ src: passedSrc, alt, className, ...props }: ImageProps) => {
  const src =
    typeof passedSrc === 'object' ? ('default' in passedSrc ? passedSrc.default.src : passedSrc.src) : passedSrc
  return (
    <figure className={classNames(['graph-docs-not-markdown mt-8 rounded-8 bg-white/4 p-2 not-last:mb-8', className])}>
      <img src={src} alt="" className="w-full rounded-4 bg-background" {...props} />
      {alt ? <figcaption className="text-body-xsmall mt-2 px-1 text-center text-white/48">{alt}</figcaption> : null}
    </figure>
  )
}
