import { HTMLAttributes } from 'react'

import { useI18n } from '@/i18n'

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
) & {
  /** Video title */
  title?: string
} & HTMLAttributes<HTMLElement>

export const VideoEmbed = ({ src, youtube, title, ...props }: VideoProps) => {
  const { t } = useI18n()

  return (
    <figure sx={{ paddingBottom: `${100 / (16 / 9)}%` }} {...props}>
      <iframe
        src={src ?? `https://www.youtube.com/embed/${youtube}`}
        title={`${t('global.video')}${title ? `: ${title}` : ''}`}
        allowFullScreen
        sx={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
      />
    </figure>
  )
}
