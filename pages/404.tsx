import { NotFound, Spacing } from '@edgeandnode/components'

import { LinkInline } from '@/components'
import { useI18n } from '@/hooks'

const Page = () => {
  const { translations } = useI18n()

  return (
    <div sx={{ pb: Spacing.XXL }}>
      <NotFound
        title={translations.global.notFoundTitle}
        subtitle={translations.global.notFoundSubtitle}
        link={<LinkInline href="/">{translations.global.goHome}</LinkInline>}
      />
    </div>
  )
}

export default Page
