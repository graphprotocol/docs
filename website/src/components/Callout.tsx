import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import { classNames } from '@edgeandnode/gds'
import { ExclamationMark, Lightbulb } from '@edgeandnode/gds/icons'

import { useI18n } from '@/i18n'

type CalloutType = (typeof calloutTypes)[number]

const calloutTypes = ['note', 'tip', 'important', 'warning', 'caution'] as const
const importantCalloutTypes: CalloutType[] = ['important', 'warning', 'caution']

interface CalloutProps extends Omit<ComponentPropsWithoutRef<'blockquote'>, 'title'> {
  /**
   * Defaults to `info`, or to `important` if `data-callout-type` is set to either `important`, `warning`, or `caution`.
   */
  variant?: 'info' | 'important'
  /**
   * If `data-callout-type` is set to any valid callout type and `data-callout-type-show-title` is `true`, defaults to a
   * translated title representing the callout type.
   */
  title?: ReactNode
}

export const Callout = ({
  variant: passedVariant,
  title: passedTitle,
  className,
  children,
  ...props
}: CalloutProps) => {
  const { t } = useI18n()

  const type = 'data-callout-type' in props ? (props['data-callout-type'] as string) : null
  const showTypeTitle =
    type && calloutTypes.includes(type as CalloutType) && 'data-callout-type-show-title' in props
      ? Boolean(props['data-callout-type-show-title'])
      : false
  const variant = passedVariant ?? (type && importantCalloutTypes.includes(type as CalloutType) ? 'important' : 'info')
  const title = passedTitle ?? (showTypeTitle ? t(`global.content.callout.${type as CalloutType}`) : null)

  return (
    <div
      data-variant={variant}
      className={classNames([
        `flex gap-2 rounded-8 border p-4 ps-3
        data-[variant=important]:border-solar-500/50
        data-[variant=info]:border-astro-500/50
        data-[variant=important]:bg-solar-500/10
        data-[variant=info]:bg-astro-500/10
        --:my-8 --:last:mb-0 -:is-[li>*]:my-4`,
        className,
      ])}
      {...(props as ComponentPropsWithoutRef<'div'>)}
    >
      <div className="flex size-7 shrink-0 items-center justify-center">
        {variant === 'info' ? (
          <Lightbulb size={4} color="astro-500" alt={!title ? t('global.content.callout.note') : ''} />
        ) : (
          <ExclamationMark size={4} color="solar-500" alt={!title ? t('global.content.callout.important') : ''} />
        )}
      </div>
      <div
        className={`
          text-body-xsmall flex-1
          first:*:text-white
          mdx-[:is(p,ul,ol):not(:last-child,:is(ul,ol)_*)]:mb-3
          mdx-[ul,ol]:gap-1
        `}
      >
        {typeof title === 'string' ? <p>{title}</p> : title}
        {children}
      </div>
    </div>
  )
}
