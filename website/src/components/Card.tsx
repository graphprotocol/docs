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
        [--gds-card-border-hover:theme(colors.space-1400)]
        [--gds-card-border:theme(colors.space-1500)]
        [--gds-card-bg:transparent]`,
        className,
      ])}
      {...props}
    >
      <div className="xs:flex-row flex h-full flex-col gap-6">
        {videoThumbnailSrc ? (
          <div className="peer max-xs:mb-0 xs:me-0 xs:w-1/2 xs:max-w-64 xs:self-center -m-4 aspect-video">
            <img src={videoThumbnailSrc} alt="" className="rounded-6 size-full object-cover" />
          </div>
        ) : null}
        <div className="xs:peer-[:has(img)]:self-center flex flex-1 flex-col gap-6">
          {icon && iconPosition === 'top' ? (
            <div className="nested-icon:default-size-6 shrink-0 grow-[9999]">{icon}</div>
          ) : null}
          <div className="flex grow gap-4">
            {icon && iconPosition === 'side' ? <div className="nested-icon:default-size-6 shrink-0">{icon}</div> : null}
            <div className="flex flex-col gap-2">
              {slotAboveTitle ? <div className="mb-1">{slotAboveTitle}</div> : null}
              <h3 className="text-body-small-tight text-space-200 -my-0.5 font-medium">{title}</h3>
              {description ? <p className="text-space-700 -mb-1">{description}</p> : null}
              {slotBelowDescription ? <div className="mt-1">{slotBelowDescription}</div> : null}
              {cta ? <div className="text-body-xsmall-tight mt-1 -mb-0.5">{cta}</div> : null}
            </div>
          </div>
        </div>
      </div>
    </ExperimentalCard>
  )
}
