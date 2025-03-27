import type { ComponentPropsWithoutRef } from 'react'

import { classNames } from '@edgeandnode/gds'
import { HourglassDynamic } from '@edgeandnode/gds/icons'

import { useI18n } from '@/i18n'

export interface TimeIconProps extends ComponentPropsWithoutRef<'div'> {
  variant: 'reading' | 'duration'
  minutes: number
}

export function TimeIcon({ variant, minutes, className, ...props }: TimeIconProps) {
  const { t } = useI18n()
  return (
    <div className={classNames(['flex items-center gap-1 leading-none', className])} {...props}>
      <HourglassDynamic
        size={3.5}
        alt={variant === 'reading' ? t('index.time.reading') : t('index.time.duration')}
        filledPercentage={(minutes / 15) * 100}
      />
      {minutes} {t('index.time.minutes')}
    </div>
  )
}
