import { PropsWithChildren, useMemo } from 'react'
import NextLink from 'next/link'
import { NavigationMarketing, Footer, LanguageSwitcher, Flex, objectEntries } from '@edgeandnode/components'

import { Container } from '@/components'
import { useI18n, Locale } from '@/i18n'

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  const { locale, localesDetails, setLocale, translations } = useI18n()

  const languages = useMemo(
    () =>
      objectEntries(localesDetails).map(([locale, localeDetails]) => {
        return {
          ...localeDetails,
          value: locale,
        }
      }),
    [localesDetails]
  )

  const languageSwitcher = useMemo(
    () => (
      <LanguageSwitcher
        key="languageSwitcher"
        languages={languages}
        value={locale}
        onSelect={(locale) => setLocale(locale as Locale)}
        label={translations.global.language}
      />
    ),
    [languages, locale, setLocale, translations]
  )

  return (
    <div>
      <div
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          minHeight: '768px',
          backgroundImage: `url('${process.env.ASSET_PREFIX}/img/page-background.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          '@media (min-width: 1440px)': {
            aspectRatio: '1440/768',
          },
        }}
      />
      <Flex.Column
        sx={{
          minHeight: '100vh',
        }}
      >
        <div sx={{ flexShrink: 0 }}>
          <Container sx={{ '--container-padding': '32px' }}>
            <NavigationMarketing activeRoute="/docs" NextLink={NextLink} rightAlignItems={[languageSwitcher]} />
          </Container>
        </div>
        <main sx={{ flexGrow: 1 }}>
          <Container>{children}</Container>
        </main>
        <div sx={{ flexShrink: 0 }}>
          <Container>
            <div sx={{ mx: 'auto', maxWidth: [null, null, null, 'calc(100vw - 500px)'] }}>
              <Footer languageSwitcher={languageSwitcher} />
            </div>
          </Container>
        </div>
      </Flex.Column>
    </div>
  )
}
