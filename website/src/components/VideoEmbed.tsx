import type { ComponentPropsWithoutRef } from 'react'

import { classNames } from '@edgeandnode/gds'

import { useI18n } from '@/i18n'

declare namespace VideoEmbedProps {
  interface BaseProps extends Omit<ComponentPropsWithoutRef<'iframe'>, 'src'> {
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
        'graph-docs-not-markdown rounded-8 bg-space-1600 p-2 --:my-8 --:last:mb-0 -:is-[li>*]:my-4',
        className,
      ])}
    >
      <iframe
        src={src ?? `https://www.youtube.com/embed/${youtube}`}
        title={t('global.content.video')}
        allowFullScreen
        className="aspect-video w-full rounded-4 bg-space-1800"
        {...props}
      />
      {title ? (
        <figcaption className="text-body-xsmall mt-2 px-1 text-center text-space-700">{title}</figcaption>
      ) : null}
    </figure>
  )
}
