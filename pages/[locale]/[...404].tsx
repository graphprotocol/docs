import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { NotFound, Spacing } from '@edgeandnode/components'

import { LinkInline } from '@/components'
import { AppLocale, supportedLocales, useI18n } from '@/i18n'
import { getNavItems } from '@/navigation'

// TODO: Make DRY
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: supportedLocales.map((locale) => ({
      params: { locale, '404': ['404'] },
    })),
    fallback: true,
  }
}

// TODO: Make DRY
export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.params!.locale as AppLocale
  const navItems = await getNavItems(locale)

  return {
    props: {
      locale,
      navItems,
    },
  }
}

const NotFoundPage: NextPage<{}> = () => {
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
