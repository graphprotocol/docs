import { HTMLAttributes } from 'react'

export type VideoProps = { src: string } & HTMLAttributes<HTMLElement>

export const VideoEmbed = ({ src, ...props }: VideoProps) => {
  return (
    <figure sx={{ paddingBottom: `${100 / (16 / 9)}%` }} {...props}>
      <iframe src={src} allowFullScreen sx={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }} />
    </figure>
  )
}
