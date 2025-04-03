import { memo } from 'react'

import { ExperimentalSearch, ExperimentalToggleChip } from '@edgeandnode/gds'

import { useI18n } from '@/i18n'

interface NetworkFiltersProps {
  searchQuery: string
  setSearchQuery: (value: string) => void
  showTestnets: boolean
  onToggleTestnets: () => void
}

export const NetworkFilters = ({
  searchQuery,
  setSearchQuery,
  showTestnets,
  onToggleTestnets,
}: NetworkFiltersProps) => {
  const { t } = useI18n()

  return (
    <div className="mb-4 flex items-center gap-4">
      <div className="flex-grow">
        <ExperimentalSearch
          placeholder={t('index.supportedNetworks.search')}
          size="small"
          value={searchQuery}
          onChange={(value) => setSearchQuery(value)}
          className="w-full"
        />
      </div>
      <ExperimentalToggleChip size="small" onChange={onToggleTestnets} checked={showTestnets}>
        {t('index.supportedNetworks.showTestnets')}
      </ExperimentalToggleChip>
    </div>
  )
}
