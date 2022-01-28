import { useMemo } from 'react'
import NextLink from 'next/link'
import { NavigationMarketing, Footer, LanguageSwitcher, Flex, objectEntries } from '@edgeandnode/components'

import { Container, ContainerProps } from '@/components'
import { useI18n } from '@/hooks'
import { Locale } from '@/i18n'

export const Layout = ({ children, ...props }: ContainerProps) => {
  const { currentLocale, localesDetails, setLocale, translations } = useI18n()

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

  return (
    <Container {...props}>
      <div
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          minHeight: '768px',
          backgroundImage: `url('${process.env.NEXT_PUBLIC_BASE_PATH}/img/page-background.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          '@media (min-width: 1440px)': {
            aspectRatio: '1440/768',
          },
        }}
      />
      <Flex.Column
        sx={{
          mx: 'auto',
          maxWidth: '1288px',
          minHeight: '100vh',
        }}
      >
        <div sx={{ flexShrink: 0 }}>
          <NavigationMarketing
            activeRoute="/docs"
            NextLink={NextLink}
            rightAlignItems={
              [
                /*
                <LanguageSwitcher
                  key="languageSwitcher"
                  languages={languages}
                  value={currentLocale}
                  onSelect={(locale) => setLocale(locale as Locale)}
                  label={translations.global.language}
                />,
              */
              ]
            }
          />
        </div>
        <main sx={{ flexGrow: 1 }}>{children}</main>
        <div sx={{ flexShrink: 0 }}>
          <div sx={{ mx: 'auto', maxWidth: [null, null, null, 'calc(100vw - 500px)'] }}>
            <Footer />
          </div>
        </div>
      </Flex.Column>
    </Container>
  )
}
