import { LinkInline } from '@graphprotocol/nextra-theme'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { NotFound, Spacing } from '@edgeandnode/gds'

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

const Page: NextPage = () => {
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

export default Page
