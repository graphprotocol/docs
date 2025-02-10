import { NetworkType } from '@pinax/graph-networks-registry'
import { useData } from 'nextra/hooks'
import type { ComponentPropsWithoutRef } from 'react'

import { classNames, ExperimentalButton, ExperimentalButtonGroup, Link as LegacyLink } from '@edgeandnode/gds'
import { Clock, Code, Database, MapTrifold, SocialYouTube, Subgraph, Substreams } from '@edgeandnode/gds/icons'
import { NetworkIcon } from '@edgeandnode/go'

import { Card, Heading, Link } from '@/components'
import { useI18n } from '@/i18n'
import { getSupportedNetworks } from '@/supportedNetworks'

export default function HomePage() {
  const { t } = useI18n()

  return (
    <>
      <div className="graph-docs-not-markdown grid grid-cols-subgrid">
        <div className="absolute inset-x-0 -top-8 flex h-90 justify-center">
          <img alt="" src={`${process.env.BASE_PATH}/img/home-bg.svg`} className="h-full max-w-none" />
        </div>
        <div className="col-[container] py-20 xs:py-30">
          <div className="mx-auto flex max-w-120 flex-col items-center text-center">
            <h1 className="text-heading-large bg-gradient-to-r from-white to-[#7061c8] bg-clip-text text-transparent xs:text-heading-xlarge">
              {t('index.hero.title')}
            </h1>
            <p className="mt-2">{t('index.hero.description')}</p>
            <ExperimentalButtonGroup className="mt-4">
              <ExperimentalButton href="/about">{t('index.hero.cta1')}</ExperimentalButton>
              <ExperimentalButton href="/subgraphs/quick-start">{t('index.hero.cta2')}</ExperimentalButton>
            </ExperimentalButtonGroup>
          </div>
        </div>
      </div>
      <div className="col-[container] pb-[var(--graph-docs-content-padding-bottom)]">
        <section>
          <Heading.H2 id="products">{t('index.products.title')}</Heading.H2>
          <p>{t('index.products.description')}</p>
          <div className="graph-docs-not-markdown mt-8 grid gap-4">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <Card
                title={t('index.products.subgraphs.title')}
                description={t('index.products.subgraphs.description')}
                cta={<Link href="/subgraphs/quick-start">{t('index.products.subgraphs.cta')}</Link>}
                icon={
                  <div className="top-1 flex size-8 items-center justify-center rounded-4 bg-purple text-white">
                    <Subgraph size={4} />
                  </div>
                }
                iconPosition="side"
              />
              <Card
                title={t('index.products.substreams.title')}
                description={t('index.products.substreams.description')}
                // TODO: This URL should be `/substreams/quick-start` for consistency with subgraphs
                cta={<Link href="/substreams/getting-started-substreams">{t('index.products.substreams.cta')}</Link>}
                icon={
                  <div className="top-1 flex size-8 items-center justify-center rounded-4 bg-pink text-white">
                    <Substreams size={4} />
                  </div>
                }
                iconPosition="side"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <Card
                title={t('index.products.firehose.title')}
                description={t('index.products.firehose.description')}
                cta={<Link href="/indexing/tooling/firehose">{t('index.products.firehose.cta')}</Link>}
              />
              <Card
                title={t('index.products.graphNode.title')}
                description={t('index.products.graphNode.description')}
                cta={<Link href="/indexing/tooling/graph-node">{t('index.products.graphNode.cta')}</Link>}
              />
              <Card
                title={t('index.products.graphCli.title')}
                description={t('index.products.graphCli.description')}
                cta={
                  <Link href="https://www.npmjs.com/package/@graphprotocol/graph-cli">
                    {t('index.products.graphCli.cta')}
                  </Link>
                }
              />
            </div>
          </div>
        </section>
        <hr />
        <section>
          <Heading.H2 id="guides">{t('index.guides.title')}</Heading.H2>
          <p>{t('index.guides.description')}</p>
          <div className="graph-docs-not-markdown mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card
              title={t('index.guides.findData.title')}
              description={t('index.guides.findData.description')}
              href="/subgraphs/explorer"
              icon={<MapTrifold alt="" variant="fill" />}
              slotAboveTitle={<Time variant="reading" minutes={10} />}
            />
            <Card
              title={t('index.guides.developASubgraph.title')}
              description={t('index.guides.developASubgraph.description')}
              href="/subgraphs/quick-start" // TODO: What's the URL for this?
              icon={<Code alt="" />}
              slotAboveTitle={<Time variant="reading" minutes={5} />}
            />
            <Card
              title={t('index.guides.becomeAnIndexer.title')}
              description={t('index.guides.becomeAnIndexer.description')}
              href="/indexing/overview" // TODO: What's the URL for this?
              icon={<Database alt="" variant="fill" />}
              slotAboveTitle={<Time variant="duration" minutes={26} />}
            />
          </div>
        </section>
        <hr />
        <section>
          <div className="flex items-end justify-between">
            <Heading.H2 id="videos" className="+:m-0">
              {t('index.videos.title')}
            </Heading.H2>
            {/* TODO: Use `ExperimentalLink` */}
            <LegacyLink
              variant="secondary"
              href="https://www.youtube.com/@GraphProtocol"
              target="_blank"
              size="14px"
              className="-top-1 lg:hidden"
            >
              YouTube
            </LegacyLink>
            <LegacyLink
              variant="secondary"
              href="https://www.youtube.com/@GraphProtocol"
              target="_blank"
              size="14px"
              className="-top-1 max-lg:hidden"
            >
              <SocialYouTube alt="" />
              {t('index.videos.watchOnYouTube')}
            </LegacyLink>
          </div>
          <div className="graph-docs-not-markdown mt-8 grid grid-cols-1 gap-4">
            {/* TODO: Add video thumbnails to the cards */}
            <Card
              title={t('index.videos.theGraphExplained.title')}
              description={t('index.videos.theGraphExplained.description')}
              href="https://www.youtube.com/watch?v=hn-sJUpZ_aM"
              slotBelowDescription={<Time variant="duration" minutes={1} className="mt-1" />}
            />
            <Card
              title={t('index.videos.whatIsDelegating.title')}
              description={t('index.videos.whatIsDelegating.description')}
              href="https://www.youtube.com/watch?v=VACg8bitnVc"
              slotBelowDescription={<Time variant="duration" minutes={4} className="mt-1" />}
            />
            <Card
              title={t('index.videos.howToIndexSolana.title')}
              description={t('index.videos.howToIndexSolana.description')}
              href="https://www.youtube.com/watch?v=RmKi-Nq9E_A"
              slotBelowDescription={<Time variant="duration" minutes={5} className="mt-1" />}
            />
          </div>
        </section>
      </div>
    </>
  )
}

interface TimeProps extends ComponentPropsWithoutRef<'div'> {
  variant: 'reading' | 'duration'
  minutes: number
}

function Time({ variant, minutes, className, ...props }: TimeProps) {
  const { t } = useI18n()
  return (
    <div className={classNames(['flex items-center gap-1', className])} {...props}>
      <Clock
        alt={variant === 'reading' ? t('index.time.reading') : t('index.time.duration')}
        variant="fill"
        size={3.5}
      />
      {minutes} {t('index.time.minutes')}
    </div>
  )
}

// TODO: Implement new design and integrate in home page
function SupportedNetworks({ className, ...props }: ComponentPropsWithoutRef<'ul'>) {
  const { supportedNetworks } = useData() as { supportedNetworks: Awaited<ReturnType<typeof getSupportedNetworks>> }

  return (
    <ul
      className={classNames([
        'graph-docs-not-markdown text-body-xsmall grid grid-cols-auto-fill-23 gap-x-6 gap-y-8 text-center text-white/64',
        className,
      ])}
      {...props}
    >
      {supportedNetworks
        // TODO: Don't filter out testnets that don't have a mainnet
        .filter((network) => network.networkType === NetworkType.Mainnet)
        // Filter out networks that are either duplicates (same logo, same or similar short name) or irrelevant in this view
        .filter(
          (network) =>
            !network.caip2Id.startsWith('beacon:') &&
            !['boba-bnb', 'eos-evm', 'polygon-zkevm', 'solana-accounts'].includes(network.id),
        )
        // TODO: Fix Zora mono logo in web3icons
        .filter((network) => network.id !== 'zora')
        .map((network) => (
          <li key={network.id} className="flex flex-col items-center gap-2">
            <div className="h-10">
              <NetworkIcon caip2Id={network.caip2Id as any} size="40px" />
            </div>
            <div>{network.shortName}</div>
          </li>
        ))}
    </ul>
  )
}
