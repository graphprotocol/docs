import { Button, DottedRingsSpinner, Text } from '@edgeandnode/gds'
import { EyeClosed } from '@edgeandnode/gds/icons'

import { useI18n } from '@/i18n'

interface EmptySearchResultsProps {
  searchQuery: string
  onClearSearch: () => void
  showTestnets: boolean
  onToggleTestnets: () => void
}

export const EmptySearchResults = ({ searchQuery, onClearSearch }: EmptySearchResultsProps) => {
  const { t } = useI18n()

  return (
    <div className="mb-16 flex flex-col items-center justify-center border-b border-space-1400 py-16 pb-16 text-center">
      <div className="text-space-700">
        <DottedRingsSpinner>
          <EyeClosed
            size="36px"
            color="purple-100"
            alt="Information"
            sx={{
              stroke: 'purple-100',
              transform: 'translate(1px, -1.5px)',
            }}
          />
        </DottedRingsSpinner>
      </div>
      <Text.P20 className="mb-2 mt-0 font-medium">{t('index.supportedNetworks.emptySearch.title')}</Text.P20>
      <Text.P16 className="mb-6 max-w-md text-space-700">
        {t('index.supportedNetworks.emptySearch.description', [searchQuery])}
      </Text.P16>
      <div className="flex flex-wrap justify-center gap-3">
        <Button onClick={onClearSearch} variant="secondary" size="medium">
          {t('index.supportedNetworks.emptySearch.clearSearch')}
        </Button>
      </div>
    </div>
  )
}
