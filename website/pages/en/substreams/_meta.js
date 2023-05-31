import { createCatchAllMeta } from 'nextra/catch-all'

export async function listFiles() {
  const { cache } = listFiles
  if (cache) {
    return cache
  }
  const response = await fetch('https://api.github.com/repos/streamingfast/substreams/git/trees/develop?recursive=1')
  const data = await response.json()
  if (data.message) {
    throw new Error(JSON.stringify(data, null, 2))
  }
  const result = data.tree
    .filter(
      (item) =>
        item.path.startsWith('docs/') &&
        /\.mdx?/.test(item.path) &&
        item.path !== 'docs/SUMMARY.md' &&
        item.path !== 'docs/developers-guide/modules/README.md'
    )
    .map((item) => item.path.replace(/^docs\//, ''))

  // Implement simple caching for avoid API rate limit from GitHub
  listFiles.cache = result

  return result
}

export default async () => {
  return createCatchAllMeta(await listFiles(), {
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
}
