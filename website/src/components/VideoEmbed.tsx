import type { ComponentProps } from 'react'

import { classNames } from '@edgeandnode/gds'

import { useI18n } from '@/i18n'

declare namespace VideoEmbedProps {
  interface BaseProps extends Omit<ComponentProps<'iframe'>, 'src'> {
    title: string
  }
  interface SrcProps extends BaseProps {
    src: string
    youtube?: never
  }
  interface YouTubeProps extends BaseProps {
    src?: never
    youtube: string
  }
}

type VideoEmbedProps = VideoEmbedProps.SrcProps | VideoEmbedProps.YouTubeProps

export const VideoEmbed = ({ title, src, youtube, className, ...props }: VideoEmbedProps) => {
  const { t } = useI18n()

  return (
    <figure
      className={classNames([
        'graph-docs-not-markdown rounded-8 bg-space-1600 --:my-8 --:last:mb-0 -:is-[li>*]:my-4 p-2',
        className,
      ])}
    >
      <iframe
        src={src ?? `https://www.youtube.com/embed/${youtube}`}
        title={t('global.content.video')}
        allowFullScreen
        className="rounded-4 bg-space-1800 aspect-video w-full"
        {...props}
      />
      {title ? (
        <figcaption className="text-body-xsmall text-space-700 mt-2 px-1 text-center">{title}</figcaption>
      ) : null}
    </figure>
  )
}
