import meta from '../../../en/subgraphs/querying/_meta.js'

const clonedMeta = {
  ...meta,
}

delete clonedMeta['graph-client']

export default clonedMeta
