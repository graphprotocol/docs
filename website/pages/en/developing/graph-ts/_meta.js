import { createCatchAllMeta } from 'nextra/catch-all'

import json from '../../../../remote-files/graph-ts.json' assert { type: 'json' }

export default () =>
  createCatchAllMeta(json.filePaths, {
    README: 'Introduction',
  })
