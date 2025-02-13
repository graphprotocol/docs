import { NotFound } from '@edgeandnode/gds'

import { Link } from '@/components'
import { useI18n } from '@/i18n'

// TODO: Redesign this page
export default function PageNotFound() {
  const { t } = useI18n()

  return (
    <div className="graph-docs-not-markdown col-[container] flex flex-col items-center justify-center">
      <NotFound
        title={t('global.notFound.title')}
        subtitle={t('global.notFound.subtitle')}
        link={<Link href="/">{t('global.notFound.back')}</Link>}
      />
    </div>
  )
}
