import { LinkInline } from '@graphprotocol/theme'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { NotFound, Spacing } from '@edgeandnode/components'

import { supportedLocales, useI18n } from '@/i18n'

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: supportedLocales.map((locale) => ({
      params: { locale, '404': ['404'] },
    })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = () => {
  return { props: {} }
}

const NotFoundPage: NextPage = () => {
  const { t } = useI18n()

  return (
    <div sx={{ pb: Spacing['64px'] }}>
      <NotFound
        title={t('global.notFoundTitle')}
        subtitle={t('global.notFoundSubtitle')}
        link={<LinkInline href="/">{t('global.goHome')}</LinkInline>}
      />
    </div>
  )
}

export default NotFoundPage
