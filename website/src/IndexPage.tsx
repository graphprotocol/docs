import { Image, LinkInline } from '@graphprotocol/nextra-theme'
import { useData } from 'nextra/data'

import { BorderRadius, buildBorder, buildTransition, Flex, Link, Spacing, Text } from '@edgeandnode/gds'
import { NetworkIcon } from '@edgeandnode/go'

import { useI18n } from '@/i18n'

import { getSupportedNetworks } from './supportedNetworks'

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
          href: '/about/',
        },
        {
          title: t('index.shortcuts.quickStart.title'),
          description: t('index.shortcuts.quickStart.description'),
          href: '/subgraphs/quick-start/',
        },
        {
          title: t('index.shortcuts.developerFaqs.title'),
          description: t('index.shortcuts.developerFaqs.description'),
          href: '/subgraphs/developing/developer-faq/',
        },
        {
          title: t('index.shortcuts.queryFromAnApplication.title'),
          description: t('index.shortcuts.queryFromAnApplication.description'),
          href: '/subgraphs/querying/from-an-application/',
        },
        {
          title: t('index.shortcuts.createASubgraph.title'),
          description: t('index.shortcuts.createASubgraph.description'),
          href: '/subgraphs/developing/creating/starting-your-subgraph/',
        },
      ].map((card) => (
        <li key={card.href} sx={{ aspectRatio: '258/136' }}>
          <Link.Unstyled
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
          </Link.Unstyled>
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
          href: '/subgraphs/developing/creating/starting-your-subgraph/',
        },
        {
          title: t('index.networkRoles.roles.indexer.title'),
          description: t('index.networkRoles.roles.indexer.description'),
          image: '/img/roles/indexer.png',
          href: '/indexing/overview/',
        },
        {
          title: t('index.networkRoles.roles.curator.title'),
          description: t('index.networkRoles.roles.curator.description'),
          image: '/img/roles/curator.png',
          href: '/resources/roles/curating/',
        },
        {
          title: t('index.networkRoles.roles.delegator.title'),
          description: t('index.networkRoles.roles.delegator.description'),
          image: '/img/roles/delegator.png',
          href: '/resources/roles/delegating/',
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
          href: '/subgraphs/developing/deploying/using-subgraph-studio/',
        },
        {
          title: t('index.products.products.graphExplorer.title'),
          description: t('index.products.products.graphExplorer.description'),
          href: '/subgraphs/explorer/',
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
  const { supportedNetworks } = useData() as { supportedNetworks: Awaited<ReturnType<typeof getSupportedNetworks>> }

  return (
    <ul
      sx={{
        my: Spacing['48px'],
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(92px, 1fr))',
        columnGap: Spacing['24px'],
        rowGap: Spacing['32px'],
      }}
    >
      {supportedNetworks
        .filter((network) => !network.testnet || ['evm-1946'].includes(network.uid))
        .map((network) => (
          <Flex.Column key={network.uid} as="li" align="center" gap={Spacing['8px']} sx={{ color: 'White64' }}>
            <div sx={{ height: '40px' }}>
              <NetworkIcon chain={network} size="40px" />
            </div>
            <Text.P14 as="div" align="center">
              {network.name}
            </Text.P14>
          </Flex.Column>
        ))}
    </ul>
  )
}
