import { useMemo } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Text, Flex, Spacing, BorderRadius, buildBorder, buildShadow, buildTransition } from '@edgeandnode/components'

import { MDXLayout, Frontmatter, OutlineItem } from '@/layout'
import { Heading, Image, Link, LinkInline, Paragraph } from '@/components'
import { AppLocale, supportedLocales, translations, useI18n } from '@/i18n'
import { getNavItems, NavItem } from '@/navigation'

export const frontmatter = (locale: AppLocale): Frontmatter => ({
  title: translations[locale].index.title,
})

// TODO: Make DRY
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: supportedLocales.map((locale) => ({
      params: { locale },
    })),
    fallback: false,
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

type IndexProps = { navItems: NavItem[] }

const Index: NextPage<IndexProps> = ({ navItems }: IndexProps) => {
  const { t, locale } = useI18n()

  const outline: OutlineItem[] = useMemo(
    () => [
      {
        id: 'network-roles',
        title: t('index.networkRoles.title'),
        level: 2,
      },
      {
        id: 'products',
        title: t('index.products.title'),
        level: 2,
      },
      {
        id: 'supported-networks',
        title: t('index.supportedNetworks.title'),
        level: 2,
      },
    ],
    [t]
  )

  return (
    <MDXLayout
      pagePath={`[locale]/index.tsx`}
      navItems={navItems}
      frontmatter={frontmatter(locale as AppLocale)}
      outline={outline}
    >
      <Paragraph>{t('index.intro')}</Paragraph>
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
        ].map((card, index) => (
          <li key={index} sx={{ aspectRatio: '258/136' }}>
            <Link
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
            </Link>
          </li>
        ))}
      </ul>

      <Heading.H2 id="network-roles">{t('index.networkRoles.title')}</Heading.H2>
      <Paragraph>{t('index.networkRoles.description')}</Paragraph>
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
              <Text as="h3" weight="SEMIBOLD" size="20px" sx={{ textShadow: buildShadow('S') }}>
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

      <Heading.H2 id="products">{t('index.products.title')}</Heading.H2>
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
        ].map((product, index) => (
          <Flex.Column as="li" key={index}>
            <div sx={{ mb: Spacing['16px'] }}>
              <Text as="h3" weight="SEMIBOLD" size="20px" sx={{ textShadow: buildShadow('S') }}>
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

      <Heading.H2 id="supported-networks">{t('index.supportedNetworks.title')}</Heading.H2>
      <Paragraph>{t('index.supportedNetworks.description')}</Paragraph>
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
              image: '/img/networks/ethereum.svg',
              href: 'https://ethereum.org/en/',
            },
          ].map((network, index) => (
            <Flex.Column as="li" key={index}>
              <Text as="div" size="14px" color="White48" sx={{ textAlign: 'center' }}>
                <Link
                  href={network.href}
                  target="_blank"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    color: 'White48',
                    '&:hover': { color: 'White', '& > img': { transform: 'scale(1.1)' } },
                    transition: buildTransition('COLORS'),
                  }}
                >
                  <Image
                    src={network.image}
                    alt=""
                    sx={{ mb: Spacing['8px'], width: '40px', height: '40px', transition: buildTransition('TRANSFORM') }}
                  />
                  {network.title}
                </Link>
              </Text>
            </Flex.Column>
          ))}
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
              title: 'XDAI',
              image: '/img/networks/xdai.svg',
              href: 'https://www.xdaichain.com/',
            },
            {
              title: 'Near',
              image: '/img/networks/near.svg',
              href: 'https://near.org/',
              beta: true,
            },
            {
              title: 'Polygon',
              image: '/img/networks/polygon.svg',
              href: 'https://polygon.technology/',
              beta: true,
            },
            {
              title: 'BNB',
              image: '/img/networks/bnb.svg',
              href: 'https://www.binance.org/',
              beta: true,
            },
            {
              title: 'Celo',
              image: '/img/networks/celo.svg',
              href: 'https://celo.org/',
              beta: true,
            },
            {
              title: 'Avalanche',
              image: '/img/networks/avalanche.svg',
              href: 'https://www.avax.network/',
              beta: true,
            },
            {
              title: 'POA',
              image: '/img/networks/poa.svg',
              href: 'https://www.poa.network/',
              beta: true,
            },
            {
              title: 'Arbitrum',
              image: '/img/networks/arbitrum.svg',
              href: 'https://arbitrum.io/',
              beta: true,
            },
            {
              title: 'Fantom',
              image: '/img/networks/fantom.svg',
              href: 'https://fantom.foundation/',
              beta: true,
            },
            {
              title: 'Fuse',
              image: '/img/networks/fuse.svg',
              href: 'https://fuse.io/',
              beta: true,
            },
            {
              title: 'Optimism',
              image: '/img/networks/optimism.svg',
              href: 'https://www.optimism.io/',
              beta: true,
            },
            {
              title: 'Moonriver',
              image: '/img/networks/moonriver.svg',
              href: 'https://moonbeam.network/networks/moonriver/',
              beta: true,
            },
            {
              title: 'Aurora',
              image: '/img/networks/aurora.svg',
              href: 'https://aurora.dev/',
              beta: true,
            },
            {
              title: 'Moonbeam',
              image: '/img/networks/moonbeam.svg',
              href: 'https://moonbeam.network/',
              beta: true,
            },
            {
              title: 'Boba Network',
              image: '/img/networks/boba.svg',
              href: 'https://boba.network/',
              beta: true,
            },
            {
              title: 'Harmony',
              image: '/img/networks/harmony.svg',
              href: 'https://harmony.one/',
              beta: true,
            },
            {
              title: 'zkSync',
              image: '/img/networks/zksync.svg',
              href: 'https://zksync.io/',
              beta: true,
            },
            {
              title: 'Cosmos Hub',
              image: '/img/networks/cosmos.svg',
              href: 'https://cosmos.network/',
              beta: true,
            },
          ].map((network, index) => (
            <Flex.Column as="li" key={index}>
              <Text as="div" size="14px" color="White48" sx={{ textAlign: 'center' }}>
                <Link
                  href={network.href}
                  target="_blank"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    color: 'White48',
                    '&:hover': { color: 'White', '& > img': { transform: 'scale(1.1)' } },
                    transition: buildTransition('COLORS'),
                  }}
                >
                  <Image
                    src={network.image}
                    alt=""
                    sx={{ mb: Spacing['8px'], width: '40px', height: '40px', transition: buildTransition('TRANSFORM') }}
                  />
                  {network.title}
                  {network.beta ? '*' : ''}
                </Link>
              </Text>
            </Flex.Column>
          ))}
        </ul>
        <Text.P14 color="White64" sx={{ mt: '32px' }}>
          *{t('index.supportedNetworks.betaWarning')}
        </Text.P14>
      </div>
    </MDXLayout>
  )
}

export default Index
