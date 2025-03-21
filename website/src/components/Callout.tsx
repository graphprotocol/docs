import type { ComponentPropsWithoutRef } from 'react'

import { classNames } from '@edgeandnode/gds'
import { Lightbulb } from '@edgeandnode/gds/icons'

import { useI18n } from '@/i18n'

interface CalloutProps extends ComponentPropsWithoutRef<'blockquote'> {}

// TODO: Add `important` variant
export const Callout = ({ className, children, ...props }: CalloutProps) => {
  const { t } = useI18n()

  return (
    <div
      className={classNames([
        'flex gap-2 rounded-8 border border-blue/48 bg-blue/8 p-4 ps-3 --:my-8 --:last:mb-0 -:is-[li>*]:my-4',
        className,
      ])}
      {...(props as ComponentPropsWithoutRef<'div'>)}
    >
      <div className="flex size-7 shrink-0 items-center justify-center">
        <Lightbulb size={4} color="blue" alt={t('global.content.note')} />
      </div>
      <div
        className={`
          text-body-small flex-1
          first:*:text-white
          +:not-first:*:mt-3
          +:not-last:*:mb-3
          mdx-[ul]:list-disc
          mdx-[ul,ol]:gap-0
          mdx-[ul>li]:after:content-none
        `}
      >
        {children}
      </div>
    </div>
  )
}
