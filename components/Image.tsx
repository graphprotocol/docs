import { ImgHTMLAttributes } from 'react'

export type ImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'children'>

export const Image = ({ src, ...props }: ImageProps) => {
  // If the URL is internal, automatically prepend the asset prefix
  if (src?.startsWith('/')) {
    src = `${process.env.ASSET_PREFIX}${src}`
  }

  return <img src={src} alt="" {...props} />
}
