import { createCatchAllMeta } from 'nextra/catch-all'

export async function listFiles() {
  const { cache } = listFiles
  if (cache) {
    return cache
  }

  const response = await fetch('https://api.github.com/repos/streamingfast/firehose-docs/git/trees/master?recursive=1')
  const data = await response.json()
  if (data.message) {
    throw new Error(JSON.stringify(data, null, 2))
  }

  const result = data.tree
    .filter(
      (item) =>
        /\.mdx?/.test(item.path) &&
        ![
          'SUMMARY.md',
          'intro/README.md',
          'firehose-setup/overview.md',
          'firehose-setup/near/README.md',
          'firehose-setup/cosmos/single-machine-deployment.md',
          'integrate-new-chains/README.md',
          'references/README.md',
          'setup/cosmos/README.md',
          'setup/ethereum/README.md',
          'setup/ethereum/reprocessing-history.md',
          'setup/ethereum/synchronization.md',
          'concepts/README.md',
        ].includes(item.path)
    )
    .map((item) => item.path.replace(/^docs\//, ''))

  // Implement simple caching for avoid API rate limit from GitHub
  listFiles.cache = result

  return result
}

const A = ['README.md', 'concepts/README.md']
export default async () => {
  return createCatchAllMeta(await listFiles(), {
    README: 'Quick Start',
    intro: {
      title: 'Introduction',
      type: 'folder',
      items: {
        'firehose-overview': 'Firehose Overview',
        prerequisites: 'Prerequisites',
      },
    },
    architecture: {
      title: 'Architecture',
      type: 'folder',
      items: {
        'components/': {
          title: 'Components',
          type: 'folder',
          items: {
            README: 'Overview',
            'firehose-enabled-node': 'Firehose Enabled Node',
            reader: 'Reader',
            merger: 'Merger',
            relayer: 'Relayer',
            'grpc-server': 'gRPC Server',
            'high-availability': 'High Availability',
          },
        },
        'data-flow': 'Data Flow',
        'data-storage': 'Data Storage',
      },
    },
    'firehose-setup': {
      title: 'Firehose Setup',
      type: 'folder',
      items: {
        README: 'Overview',
        'ethereum/': {
          title: 'Ethereum',
          type: 'folder',
          items: {
            README: 'Overview',
            installation: 'Installation',
            'local-deployment': 'Local Deployment',
            'reprocessing-history': 'Reprocessing History',
            synchronization: 'Synchronization',
          },
        },
        'cosmos/': {
          title: 'Cosmos',
          type: 'folder',
          items: {
            README: 'Overview',
            synchronization: 'Synchronization',
          },
        },
        'near/': {
          title: 'NEAR',
          type: 'folder',
          items: {
            installation: 'Single-Machine Deployment',
          },
        },
        'system-requirements': 'System Requirements',
      },
    },
    'integrate-new-chains': {
      title: 'Integrate New Chains',
      type: 'folder',
      items: {
        'design-principles': 'Design Principles',
        'firehose-starter': 'Firehose Acme',
        'new-blockchains': 'New Blockchains',
        'why-integrate-the-firehose': 'Why Integrate the Firehose?',
      },
    },
    references: {
      title: 'References',
      type: 'folder',
      items: {
        repositories: 'Supported Protocols',
        'naming-conventions': 'Naming Conventions',
        'protobuf-schemas': 'Schemas',
        indexing: 'Indexing',
        faq: 'FAQ',
      },
    },
  })
}
