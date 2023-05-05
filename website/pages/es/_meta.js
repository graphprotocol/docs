import meta from '../en/_meta.js'

export default {
  ...JSON.parse(JSON.stringify(meta)),
  network: 'The Graph Network',
  '###1': {
    type: 'heading',
    title: 'Subgrafos',
  },
  developing: 'Desarrollando',
  deploying: 'Deployando',
  publishing: 'Publicando',
  managing: 'Administrando',
  querying: 'Consultando',
  cookbook: 'Recetario',
  '###3': {
    type: 'heading',
    title: 'Indexación',
  },
  'release-notes': 'Notas de Publicación y Guías de Actualización',
  tokenomics: 'Tokenomics',
}
