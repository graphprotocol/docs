import { HTMLAttributes } from 'react'

export type VideoProps = (
  | {
      /** Video embed URL. */
      src: string
      youtube?: never
    }
  | {
      /** YouTube video ID. */
      youtube: string
      src?: never
    }
) &
  HTMLAttributes<HTMLElement>

export const VideoEmbed = ({ src, youtube, ...props }: VideoProps) => {
  return (
    <figure sx={{ paddingBottom: `${100 / (16 / 9)}%` }} {...props}>
      <iframe
        src={src ?? `https://www.youtube.com/embed/${youtube}`}
        allowFullScreen
        sx={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
      />
    </figure>
  )
}
