import { createCatchAllMeta } from 'nextra/catch-all'

import json from '../../../remote-files/firehose.json' assert { type: 'json' }

export default () =>
  createCatchAllMeta(json.filePaths, {
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
