import path from 'node:path'

export interface RemoteDocsRepo {
  user: string
  name: string
  branch: string
  docsPath: string
  basePath: string
}

export const REMOTE_DOCS_REPOS: RemoteDocsRepo[] = [
  {
    user: 'graphprotocol',
    name: 'graph-tooling',
    branch: 'main',
    docsPath: 'packages/ts/',
    basePath: '/subgraphs/developing/creating/graph-ts/',
  },
  {
    user: 'graphprotocol',
    name: 'graph-client',
    branch: 'main',
    docsPath: 'docs/',
    basePath: '/subgraphs/querying/graph-client/',
  },
]

export const ENGLISH_PAGES_DIRECTORY = path.join(process.cwd(), 'src/pages/en')
