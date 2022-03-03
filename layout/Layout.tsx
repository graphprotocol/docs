import { PropsWithChildren, useMemo } from 'react'
import NextLink from 'next/link'
import { NavigationMarketing, Footer, LocaleSwitcher, Flex } from '@edgeandnode/components'

import { Container } from '@/components'

export const Layout = ({ children }: PropsWithChildren<{}>) => {
  const localeSwitcher = useMemo(() => <LocaleSwitcher key="localeSwitcher" />, [])

  return (
    <div>
      <div
        sx={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          minHeight: '768px',
          backgroundImage: `url('${process.env.BASE_PATH}/img/page-background.png')`,
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
            <NavigationMarketing activeRoute="/docs" NextLink={NextLink} rightAlignItems={[localeSwitcher]} />
          </Container>
        </div>
        <main sx={{ flexGrow: 1 }}>
          <Container>{children}</Container>
        </main>
        <div sx={{ flexShrink: 0 }}>
          <Container>
            <div sx={{ mx: 'auto', maxWidth: [null, null, null, 'calc(100vw - 500px)'] }}>
              <Footer localeSwitcher={localeSwitcher} />
            </div>
          </Container>
        </div>
      </Flex.Column>
    </div>
  )
}
