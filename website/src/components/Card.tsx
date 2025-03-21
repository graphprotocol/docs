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
      // TODO: Add these colors as a new Card variant in GDS?
      className={classNames([
        `text-body-xsmall
        [--gds-card-bg-hover:theme(colors.space-1600)]
        [--gds-card-bg:transparent]
        [--gds-card-border-hover:theme(colors.space-1400)]
        [--gds-card-border:theme(colors.space-1500)]`,
        className,
      ])}
      {...props}
    >
      <div className="flex h-full flex-col gap-6 xs:flex-row">
        {videoThumbnailSrc ? (
          <div className="peer -m-4 aspect-video max-xs:mb-0 xs:me-0 xs:w-1/2 xs:max-w-64 xs:self-center">
            <img src={videoThumbnailSrc} alt="" className="size-full rounded-6 object-cover" />
          </div>
        ) : null}
        <div className="flex flex-1 flex-col gap-6 xs:peer-[:has(img)]:self-center">
          {icon && iconPosition === 'top' ? (
            <div className="shrink-0 grow-[9999] nested-icon:default-size-6">{icon}</div>
          ) : null}
          <div className="flex grow gap-4">
            {icon && iconPosition === 'side' ? <div className="shrink-0 nested-icon:default-size-6">{icon}</div> : null}
            <div className="flex flex-col gap-2">
              {slotAboveTitle ? <div className="mb-1">{slotAboveTitle}</div> : null}
              <h3 className="text-body-small-tight -my-0.5 text-space-200 font-medium">{title}</h3>
              {description ? <p className="-mb-1 text-space-700">{description}</p> : null}
              {slotBelowDescription ? <div className="mt-1">{slotBelowDescription}</div> : null}
              {cta ? <div className="text-body-xsmall-tight -mb-0.5 mt-1">{cta}</div> : null}
            </div>
          </div>
        </div>
      </div>
    </ExperimentalCard>
  )
}
