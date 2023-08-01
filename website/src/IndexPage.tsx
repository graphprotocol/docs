import { Heading, Image, LinkInline } from '@graphprotocol/nextra-theme'

import { BorderRadius, buildBorder, buildTransition, ButtonOrLink, Flex, Icon, Spacing, Text } from '@edgeandnode/gds'

import { useI18n } from '@/i18n'

export function Intro() {
  const { t } = useI18n()

  return (
    <ul
      sx={{
        mb: '96px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        justifyItems: 'stretch',
        alignItems: 'stretch',
        gap: Spacing['32px'],
      }}
    >
      {[
        {
          title: t('index.shortcuts.aboutTheGraph.title'),
          description: t('index.shortcuts.aboutTheGraph.description'),
          href: '/about',
        },
        {
          title: t('index.shortcuts.quickStart.title'),
          description: t('index.shortcuts.quickStart.description'),
          href: '/cookbook/quick-start',
        },
        {
          title: t('index.shortcuts.developerFaqs.title'),
          description: t('index.shortcuts.developerFaqs.description'),
          href: '/developing/developer-faqs',
        },
        {
          title: t('index.shortcuts.queryFromAnApplication.title'),
          description: t('index.shortcuts.queryFromAnApplication.description'),
          href: '/querying/querying-from-an-application',
        },
        {
          title: t('index.shortcuts.createASubgraph.title'),
          description: t('index.shortcuts.createASubgraph.description'),
          href: '/developing/creating-a-subgraph',
        },
        {
          title: t('index.shortcuts.migrateFromHostedService.title'),
          description: t('index.shortcuts.migrateFromHostedService.description'),
          href: '/cookbook/migrating-a-subgraph',
        },
      ].map((card) => (
        <li key={card.href} sx={{ aspectRatio: '258/136' }}>
          <ButtonOrLink
            href={card.href}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100%',
              p: Spacing['16px'],
              borderRadius: BorderRadius.S,
              border: buildBorder('White4'),
              bg: 'White4',
              '&:hover': {
                borderColor: 'White8',
                bg: 'White8',
                color: 'White',
              },
              transition: buildTransition('COLORS'),
              textAlign: 'center',
            }}
          >
            <Text as="h3" weight="SEMIBOLD" size="16px">
              {card.title}
            </Text>
            <Text as="small" size="16px" color="White64">
              {card.description}
            </Text>
          </ButtonOrLink>
        </li>
      ))}
    </ul>
  )
}

export function NetworkRoles() {
  const { t } = useI18n()

  return (
    <ul
      sx={{
        mt: Spacing['32px'],
        mb: '128px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: Spacing['32px'],
      }}
    >
      {[
        {
          title: t('index.networkRoles.roles.developer.title'),
          description: t('index.networkRoles.roles.developer.description'),
          image: '/img/roles/developer.png',
          href: '/developing/defining-a-subgraph',
        },
        {
          title: t('index.networkRoles.roles.indexer.title'),
          description: t('index.networkRoles.roles.indexer.description'),
          image: '/img/roles/indexer.png',
          href: '/network/indexing',
        },
        {
          title: t('index.networkRoles.roles.curator.title'),
          description: t('index.networkRoles.roles.curator.description'),
          image: '/img/roles/curator.png',
          href: '/network/curating',
        },
        {
          title: t('index.networkRoles.roles.delegator.title'),
          description: t('index.networkRoles.roles.delegator.description'),
          image: '/img/roles/delegator.png',
          href: '/network/delegating',
        },
      ].map((role, index) => (
        <Flex.Column as="li" key={index}>
          <div sx={{ mb: Spacing['16px'] }}>
            <Image src={role.image} alt="" sx={{ mb: Spacing['16px'], width: '96px', height: '96px' }} />
            <Text as="h3" weight="SEMIBOLD" size="20px">
              {role.title}
            </Text>
            <Text as="p" size="16px" color="White64" sx={{ mt: Spacing['16px'] }}>
              {role.description}
            </Text>
          </div>
          <Text as="div" weight="SEMIBOLD" size="16px" sx={{ mt: 'auto' }}>
            <LinkInline href={role.href}>{t('index.readMore')}</LinkInline>
          </Text>
        </Flex.Column>
      ))}
    </ul>
  )
}

export function Products() {
  const { t } = useI18n()

  return (
    <ul
      sx={{
        mt: Spacing['32px'],
        mb: '128px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: Spacing['32px'],
      }}
    >
      {[
        {
          title: t('index.products.products.subgraphStudio.title'),
          description: t('index.products.products.subgraphStudio.description'),
          href: '/deploying/subgraph-studio',
        },
        {
          title: t('index.products.products.graphExplorer.title'),
          description: t('index.products.products.graphExplorer.description'),
          href: '/network/explorer',
        },
        {
          title: t('index.products.products.hostedService.title'),
          description: t('index.products.products.hostedService.description'),
          href: '/deploying/hosted-service',
        },
      ].map((product) => (
        <Flex.Column as="li" key={product.href}>
          <div sx={{ mb: Spacing['16px'] }}>
            <Text as="h3" weight="SEMIBOLD" size="20px">
              {product.title}
            </Text>
            <Text as="p" size="16px" color="White64" sx={{ mt: Spacing['16px'] }}>
              {product.description}
            </Text>
          </div>
          <Text as="div" weight="SEMIBOLD" size="16px" sx={{ mt: 'auto' }}>
            <LinkInline href={product.href}>{t('index.readMore')}</LinkInline>
          </Text>
        </Flex.Column>
      ))}
    </ul>
  )
}

export function SupportedNetworks() {
  const { t } = useI18n()

  return (
    <>
      <div sx={{ mt: Spacing['64px'] }}>
        <Heading.H4>{t('index.supportedNetworks.graphNetworkAndHostedService')}</Heading.H4>
        <ul
          sx={{
            mt: Spacing['24px'],
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(92px, 1fr))',
            columnGap: Spacing['24px'],
            rowGap: Spacing['32px'],
          }}
        >
          {[
            {
              title: 'Ethereum',
              logo: Icon.LogoEthereum,
              href: 'https://ethereum.org/en/',
            },
            {
              title: 'Polygon',
              logo: Icon.LogoPolygon,
              href: 'https://polygon.technology/',
              beta: true,
            },
            {
              title: 'Arbitrum One',
              logo: Icon.LogoArbitrum,
              href: 'https://arbitrum.io/',
              beta: true,
            },
            {
              title: 'Avalanche',
              logo: Icon.LogoAvalanche,
              href: 'https://www.avax.network/',
              beta: true,
            },
            {
              title: 'Fantom',
              logo: Icon.LogoFantom,
              href: 'https://fantom.foundation/',
              beta: true,
            },
            {
              title: 'Gnosis Chain',
              logo: Icon.LogoGnosis,
              href: 'https://docs.gnosischain.com/',
              beta: true,
            },
            {
              title: 'Celo',
              logo: Icon.LogoCelo,
              href: 'https://celo.org/',
              beta: true,
            },
          ].map((network, index) => {
            const Logo = network.logo
            return (
              <Flex.Column as="li" key={index}>
                <Text as="div" size="14px" color="White64" sx={{ textAlign: 'center' }}>
                  <ButtonOrLink
                    href={network.href}
                    target="_blank"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      '&:hover': { color: 'White' },
                      transition: buildTransition('COLORS'),
                    }}
                  >
                    <Logo
                      size="40px"
                      sx={{
                        mb: Spacing['8px'],
                        'a:hover &': { transform: 'scale(1.1)' },
                        transition: buildTransition('TRANSFORM'),
                      }}
                    />
                    {network.title}
                    {network.beta ? '*' : ''}
                  </ButtonOrLink>
                </Text>
              </Flex.Column>
            )
          })}
        </ul>
      </div>
      <div sx={{ mt: Spacing['64px'] }}>
        <Heading.H4>{t('index.supportedNetworks.hostedService')}</Heading.H4>
        <ul
          sx={{
            mt: Spacing['32px'],
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(92px, 1fr))',
            columnGap: Spacing['24px'],
            rowGap: Spacing['32px'],
          }}
        >
          {[
            {
              title: 'Near',
              logo: Icon.LogoNear,
              href: 'https://near.org/',
              beta: true,
            },
            {
              title: 'BNB',
              logo: Icon.LogoBNB,
              href: 'https://www.binance.org/',
              beta: true,
            },
            {
              title: 'POA',
              logo: Icon.LogoPOA,
              href: 'https://www.poa.network/',
              beta: true,
            },
            {
              title: 'Fuse',
              logo: Icon.LogoFuse,
              href: 'https://fuse.io/',
              beta: true,
            },
            {
              title: 'Optimism',
              logo: Icon.LogoOptimism,
              href: 'https://www.optimism.io/',
              beta: true,
            },
            {
              title: 'Moonriver',
              logo: Icon.LogoMoonriver,
              href: 'https://moonbeam.network/networks/moonriver/',
              beta: true,
            },
            {
              title: 'Aurora',
              logo: Icon.LogoAurora,
              href: 'https://aurora.dev/',
              beta: true,
            },
            {
              title: 'Moonbeam',
              logo: Icon.LogoMoonbeam,
              href: 'https://moonbeam.network/',
              beta: true,
            },
            {
              title: 'Boba Network',
              logo: Icon.LogoBoba,
              href: 'https://boba.network/',
              beta: true,
            },
            {
              title: 'Harmony',
              logo: Icon.LogoHarmony,
              href: 'https://harmony.one/',
              beta: true,
            },
            {
              title: 'zkSync',
              logo: Icon.LogoZkSync,
              href: 'https://zksync.io/',
              beta: true,
            },
            {
              title: 'Cosmos Hub',
              logo: Icon.LogoCosmosHub,
              href: 'https://cosmos.network/',
              beta: true,
            },
            {
              title: 'Base',
              logo: Icon.LogoBase,
              href: 'https://base.org/',
              beta: true,
            },
          ].map((network) => {
            const Logo = network.logo
            return (
              <Flex.Column as="li" key={network.href}>
                <Text as="div" size="14px" color="White64" sx={{ textAlign: 'center' }}>
                  <ButtonOrLink
                    href={network.href}
                    target="_blank"
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      '&:hover': { color: 'White', '& > img': { transform: 'scale(1.1)' } },
                      transition: buildTransition('COLORS'),
                    }}
                  >
                    <Logo
                      size="40px"
                      sx={{
                        mb: Spacing['8px'],
                        'a:hover &': { transform: 'scale(1.1)' },
                        transition: buildTransition('TRANSFORM'),
                      }}
                    />
                    {network.title}
                    {network.beta ? '*' : ''}
                  </ButtonOrLink>
                </Text>
              </Flex.Column>
            )
          })}
        </ul>
        <Text.P14 color="White64" sx={{ mt: '32px' }}>
          *{t('index.supportedNetworks.betaWarning')}
        </Text.P14>
      </div>
    </>
  )
}
