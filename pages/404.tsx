import { NextPage } from 'next'
import { NotFound, Spacing } from '@edgeandnode/components'

import { LinkInline } from '@/components'
import { useI18n } from '@/i18n'

const NotFoundPage: NextPage<{}> = () => {
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

export default NotFoundPage
