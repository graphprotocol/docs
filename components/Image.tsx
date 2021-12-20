import { ImgHTMLAttributes } from 'react'

export type ImageProps = ImgHTMLAttributes<HTMLImageElement>

export const Image = ({ src, ...props }: ImageProps) => {
  // If the URL is internal, automatically prepend the base path
  if (src?.startsWith('/')) {
    src = `${process.env.NEXT_PUBLIC_BASE_PATH}/${src}`.replace(/(\/)\/+/g, '$1')
  }

  return <img src={src} alt="" {...props} />
}
