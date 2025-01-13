import type NextImage from 'next/image'
import type { ComponentProps, ImgHTMLAttributes } from 'react'

export type ImageProps = {
  src?: ComponentProps<typeof NextImage>['src']
} & Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'children'>

export const Image = ({ src: passedSrc, ...props }: ImageProps) => {
  let src = typeof passedSrc === 'object' ? ('default' in passedSrc ? passedSrc.default.src : passedSrc.src) : passedSrc

  // If the URL is internal, automatically prepend the base path
  if (src?.startsWith('/')) {
    src = `${process.env.BASE_PATH ?? ''}${src}`
  }

  return <img src={src} alt="" {...props} />
}
