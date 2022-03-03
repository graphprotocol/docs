import { GetStaticPaths, GetStaticProps } from 'next'
import { Text, Flex, Spacing, BorderRadius, buildBorder, buildShadow, buildTransition } from '@edgeandnode/components'

import { MDXLayout, Frontmatter, OutlineItem } from '@/layout'
import { Heading, Image, Link, LinkInline, Paragraph } from '@/components'
import { getNavItems, NavItem } from '@/navigation'
import { Locale, translations } from '@/i18n'
import { useI18n } from '@/hooks'

export const frontmatter = (locale: Locale): Frontmatter => ({
  title: translations[locale].index.title,
})

const outline: OutlineItem[] = [
  {
    id: 'network-roles',
    title: 'Network Roles',
    level: 2,
  },
  {
    id: 'products',
    title: 'Products',
    level: 2,
  },
  {
    id: 'supported-networks',
    title: 'Supported Networks',
    level: 2,
  },
]

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: Object.values(Locale).map((locale) => ({
      params: { locale },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const navItems = await getNavItems(context.params?.locale as Locale)

  return {
    props: {
      navItems,
    },
  }
}

const Index = ({ navItems }: { navItems: NavItem[] }) => {
  const { currentLocale, translations } = useI18n()

  return (
    <MDXLayout
      pagePath="[locale]/index.tsx"
      navItems={navItems}
      frontmatter={frontmatter(currentLocale)}
      outline={outline}
    >
      <Paragraph>{translations.index.intro}</Paragraph>
      <ul
        sx={{
          mb: '96px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
          justifyItems: 'stretch',
          alignItems: 'stretch',
          gap: Spacing.XL,
        }}
      >
        {[
          {
            title: translations.index.shortcuts.aboutTheGraph.title,
            description: translations.index.shortcuts.aboutTheGraph.description,
            href: '/about/introduction',
          },
          {
            title: translations.index.shortcuts.quickStart.title,
            description: translations.index.shortcuts.quickStart.description,
            href: '/developer/quick-start',
          },
          {
            title: translations.index.shortcuts.developerFaqs.title,
            description: translations.index.shortcuts.developerFaqs.description,
            href: '/developer/developer-faq',
          },
          {
            title: translations.index.shortcuts.queryFromAnApplication.title,
            description: translations.index.shortcuts.queryFromAnApplication.description,
            href: '/developer/querying-from-your-app',
          },
          {
            title: translations.index.shortcuts.createASubgraph.title,
            description: translations.index.shortcuts.createASubgraph.description,
            href: '/developer/create-subgraph-hosted',
          },
          {
            title: translations.index.shortcuts.migrateFromHostedService.title,
            description: translations.index.shortcuts.migrateFromHostedService.description,
            href: '/hosted-service/migrating-subgraph',
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
                p: Spacing.L,
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
              <Text as="h3" weight="Semibold" size="16px">
                {card.title}
              </Text>
              <Text as="small" size="16px" color="White64">
                {card.description}
              </Text>
            </Link>
          </li>
        ))}
      </ul>

      <Heading.H2 id="network-roles">{translations.index.networkRoles.title}</Heading.H2>
      <Paragraph>{translations.index.networkRoles.description}</Paragraph>
      <ul
        sx={{
          mt: Spacing.XL,
          mb: '128px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: Spacing.XL,
        }}
      >
        {[
          {
            title: translations.index.networkRoles.roles.developer.title,
            description: translations.index.networkRoles.roles.developer.description,
            image: '/img/roles/developer.png',
            href: '/developer/quick-start',
          },
          {
            title: translations.index.networkRoles.roles.indexer.title,
            description: translations.index.networkRoles.roles.indexer.description,
            image: '/img/roles/indexer.png',
            href: '/indexing',
          },
          {
            title: translations.index.networkRoles.roles.curator.title,
            description: translations.index.networkRoles.roles.curator.description,
            image: '/img/roles/curator.png',
            href: '/curating',
          },
          {
            title: translations.index.networkRoles.roles.delegator.title,
            description: translations.index.networkRoles.roles.delegator.description,
            image: '/img/roles/delegator.png',
            href: '/delegating',
          },
        ].map((role, index) => (
          <Flex.Column as="li" key={index}>
            <div sx={{ mb: Spacing.L }}>
              <Image src={role.image} alt="" sx={{ mb: Spacing.L, width: '96px', height: '96px' }} />
              <Text as="h3" weight="Semibold" size="20px" sx={{ textShadow: buildShadow('S') }}>
                {role.title}
              </Text>
              <Text as="p" size="16px" color="White64" sx={{ mt: Spacing.L }}>
                {role.description}
              </Text>
            </div>
            <Text as="div" weight="Semibold" size="16px" sx={{ mt: 'auto' }}>
              <LinkInline href={role.href}>{translations.index.readMore}</LinkInline>
            </Text>
          </Flex.Column>
        ))}
      </ul>

      <Heading.H2 id="products">{translations.index.products.title}</Heading.H2>
      <ul
        sx={{
          mt: Spacing.XL,
          mb: '128px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: Spacing.XL,
        }}
      >
        {[
          {
            title: translations.index.products.products.subgraphStudio.title,
            description: translations.index.products.products.subgraphStudio.description,
            href: '/studio/subgraph-studio',
          },
          {
            title: translations.index.products.products.graphExplorer.title,
            description: translations.index.products.products.graphExplorer.description,
            href: '/explorer',
          },
          {
            title: translations.index.products.products.hostedService.title,
            description: translations.index.products.products.hostedService.description,
            href: '/hosted-service/what-is-hosted-service',
          },
        ].map((product, index) => (
          <Flex.Column as="li" key={index}>
            <div sx={{ mb: Spacing.L }}>
              <Text as="h3" weight="Semibold" size="20px" sx={{ textShadow: buildShadow('S') }}>
                {product.title}
              </Text>
              <Text as="p" size="16px" color="White64" sx={{ mt: Spacing.L }}>
                {product.description}
              </Text>
            </div>
            <Text as="div" weight="Semibold" size="16px" sx={{ mt: 'auto' }}>
              <LinkInline href={product.href}>{translations.index.readMore}</LinkInline>
            </Text>
          </Flex.Column>
        ))}
      </ul>

      <Heading.H2 id="supported-networks">{translations.index.supportedNetworks.title}</Heading.H2>
      <Paragraph>{translations.index.supportedNetworks.description}</Paragraph>
      <div sx={{ mt: Spacing.XXL }}>
        <Heading.H4>{translations.index.supportedNetworks.graphNetworkAndHostedService}</Heading.H4>
        <ul
          sx={{
            mt: Spacing.L_XL,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(92px, 1fr))',
            columnGap: Spacing.L_XL,
            rowGap: Spacing.XL,
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
                    sx={{ mb: Spacing.M, width: '40px', height: '40px', transition: buildTransition('TRANSFORM') }}
                  />
                  {network.title}
                </Link>
              </Text>
            </Flex.Column>
          ))}
        </ul>
      </div>
      <div sx={{ mt: Spacing.XXL }}>
        <Heading.H4>{translations.index.supportedNetworks.hostedService}</Heading.H4>
        <Paragraph>*{translations.index.supportedNetworks.betaWarning}</Paragraph>
        <ul
          sx={{
            mt: Spacing.XL,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(92px, 1fr))',
            columnGap: Spacing.L_XL,
            rowGap: Spacing.XL,
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
                    sx={{ mb: Spacing.M, width: '40px', height: '40px', transition: buildTransition('TRANSFORM') }}
                  />
                  {network.title}
                  {network.beta ? '*' : ''}
                </Link>
              </Text>
            </Flex.Column>
          ))}
        </ul>
      </div>
    </MDXLayout>
  )
}

export default Index
