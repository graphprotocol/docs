import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { NotFound, Spacing } from '@edgeandnode/components'

import { LinkInline } from '@/components'
import { useI18n, Locale } from '@/i18n'
import { getNavItems } from '@/navigation'

// TODO: Make DRY
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.values(Locale).map((locale) => ({
      params: { locale, '404': ['404'] },
    })),
    fallback: true,
  }
}

// TODO: Make DRY
export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.params!.locale as Locale
  const navItems = await getNavItems(locale)

  return {
    props: {
      locale,
      navItems,
    },
  }
}

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
