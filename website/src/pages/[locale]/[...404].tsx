import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import { Link } from '@edgeandnode/gds'
import { NotFound } from '@edgeandnode/gds'

import { supportedLocales, useI18n } from '@/i18n'

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: supportedLocales.map((locale) => ({
      params: { locale, '404': ['404'] },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = () => {
  return { props: {} }
}

// TODO: Redesign this page
const Page: NextPage = () => {
  const { t } = useI18n()

  return (
    <NotFound
      title={t('global.notFound.title')}
      subtitle={t('global.notFound.subtitle')}
      link={<Link.Inline href="/">{t('global.notFound.back')}</Link.Inline>}
    />
  )
}

export default Page
