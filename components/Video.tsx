import { HTMLAttributes } from 'react'

export type VideoProps = { src: string } & HTMLAttributes<HTMLVideoElement>

export const Video = ({ src, ...props }: VideoProps) => {
  return (
    <figure sx={{ paddingBottom: `${100 / (16 / 9)}%` }} {...props}>
      <iframe
        src={src}
        frameBorder="0"
        allowFullScreen
        sx={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
      />
    </figure>
  )
}
