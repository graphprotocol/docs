import type { ReactNode } from 'react'

import { classNames, ExperimentalCard, type ExperimentalCardProps } from '@edgeandnode/gds'

type OmittedExperimentalCardProps = 'children' | 'title' | 'variant'

export declare namespace CardProps {
  interface BaseProps {
    title: ReactNode
    description?: ReactNode
    cta?: ReactNode
    icon?: ReactNode
    /** @default "top" */
    iconPosition?: 'top' | 'side'
    slotAboveTitle?: ReactNode
    slotBelowDescription?: ReactNode
    videoThumbnailSrc?: string
  }
  interface ButtonProps extends BaseProps, Omit<ExperimentalCardProps.ButtonProps, OmittedExperimentalCardProps> {}
  interface ExternalLinkProps
    extends BaseProps,
      Omit<ExperimentalCardProps.ExternalLinkProps, OmittedExperimentalCardProps> {}
  interface ClientLinkProps
    extends BaseProps,
      Omit<ExperimentalCardProps.ClientLinkProps, OmittedExperimentalCardProps> {}
  interface OtherElementProps
    extends BaseProps,
      Omit<ExperimentalCardProps.OtherElementProps, OmittedExperimentalCardProps> {}
}

type CardProps =
  | CardProps.ButtonProps
  | CardProps.ExternalLinkProps
  | CardProps.ClientLinkProps
  | CardProps.OtherElementProps

export const Card = ({
  title,
  description,
  cta,
  icon,
  iconPosition = 'top',
  slotAboveTitle,
  slotBelowDescription,
  videoThumbnailSrc,
  className,
  ...props
}: CardProps) => {
  return (
    <ExperimentalCard
      className={classNames([
        `text-body-xsmall
        [--gds-card-bg-hover:theme(colors.white/4%)]
        [--gds-card-bg:transparent]
        [--gds-card-border-hover:theme(colors.white/8%)]`,
        className,
      ])}
      {...props}
    >
      <div className="flex h-full flex-col gap-6 xs:flex-row">
        {videoThumbnailSrc ? (
          <div className="peer -m-4 aspect-video max-xs:mb-0 xs:me-0 xs:w-1/2 xs:max-w-64">
            <img src={videoThumbnailSrc} alt="" className="size-full rounded-6 object-cover" />
          </div>
        ) : null}
        <div className="flex flex-1 flex-col gap-6 xs:peer-[:has(img)]:self-center">
          {icon && iconPosition === 'top' ? (
            <div className="shrink-0 grow-[9999] nested-icon:default-size-6">{icon}</div>
          ) : null}
          <div className="flex grow gap-4">
            {icon && iconPosition === 'side' ? <div className="shrink-0 nested-icon:default-size-6">{icon}</div> : null}
            <div className="flex flex-col gap-1">
              {slotAboveTitle}
              <h3 className="text-body-small font-medium text-white/88">{title}</h3>
              {description ? <p className="text-white/48">{description}</p> : null}
              {slotBelowDescription}
              {cta ? <div className="mt-auto pt-1">{cta}</div> : null}
            </div>
          </div>
        </div>
      </div>
    </ExperimentalCard>
  )
}
