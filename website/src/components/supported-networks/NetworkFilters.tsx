import { memo } from 'react'

import { ExperimentalSearch, ExperimentalToggleChip } from '@edgeandnode/gds'

import { useI18n } from '@/i18n'

interface NetworkFiltersProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
  showTestnets: boolean
  isLoadingTestnets: boolean
  onToggleTestnets: () => void
}

export const NetworkFilters = memo(
  ({ searchQuery, setSearchQuery, showTestnets, isLoadingTestnets, onToggleTestnets }: NetworkFiltersProps) => {
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
        <ExperimentalToggleChip
          size="small"
          onChange={onToggleTestnets}
          checked={showTestnets}
          disabled={isLoadingTestnets}
        >
          {t('index.supportedNetworks.showTestnets')}
        </ExperimentalToggleChip>
      </div>
    )
  },
)
