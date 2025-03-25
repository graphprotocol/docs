import { ExperimentalLink, NotFound } from '@edgeandnode/gds'
import { ArrowLeftInteractive } from '@edgeandnode/gds/icons'

import { useI18n } from '@/i18n'

// TODO: Redesign this page
export default function PageNotFound() {
  const { t } = useI18n()

  return (
    <div className="graph-docs-not-markdown col-[container] row-[full] flex flex-col items-center justify-center">
      <NotFound
        title={t('global.notFound.title')}
        subtitle={t('global.notFound.subtitle')}
        link={
          <ExperimentalLink href="/" iconBefore={<ArrowLeftInteractive alt="" />}>
            {t('global.notFound.back')}
          </ExperimentalLink>
        }
      />
    </div>
  )
}
