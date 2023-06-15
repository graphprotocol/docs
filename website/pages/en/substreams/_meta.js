import { createCatchAllMeta } from 'nextra/catch-all'

import json from '../../../remote-files/substreams.json' assert { type: 'json' }

export default () =>
  createCatchAllMeta(json.filePaths, {
    README: 'Introduction',
    'concepts-and-fundamentals': {
      type: 'folder',
      items: {
        benefits: 'Benefits and comparisons',
        modules: 'Modules basic',
      },
    },
    'getting-started': '',
    'developers-guide': {
      type: 'folder',
      items: {
        overview: '',
        'installation-requirements': 'Dependency installation',
        'creating-your-manifest': 'Manifest',
        'creating-protobuf-schemas': 'Protobuf schemas',
        'modules/': {
          type: 'folder',
          items: {
            types: '',
            inputs: '',
          },
        },
        'running-substreams': '',
        'parallel-execution': '',
        'sink-targets/': {
          type: 'folder',
          items: {
            README: 'Getting Started',
            'substreams-sink-files': 'Files',
            'substreams-sink-kv': 'Key/Value Store',
            'substreams-sink-postgres': 'PostgreSQL',
            'substreams-sink-prometheus': 'Prometheus',
            'substreams-sink-mongodb': 'MongoDB',
          },
        },
      },
    },
    'reference-and-specs': {
      type: 'folder',
      items: {
        'chains-and-endpoints': '',
        'command-line-interface': 'Substreams CLI reference',
        authentication: '',
        manifests: '',
        packages: '',
        'rust-crates': '',
        examples: '',
        faq: 'FAQ',
      },
    },
  })
