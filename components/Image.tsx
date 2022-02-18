import { ImgHTMLAttributes } from 'react'

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'children'>

export const Image = ({ src, ...props }: ImageProps) => {
  // If the URL is internal, automatically prepend the base path
  if (src?.startsWith('/')) {
    src = `/${process.env.BASE_PATH}${src}`
  }

  return <img src={src} alt="" {...props} />
}
