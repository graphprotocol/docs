import meta from '../en/_meta.js'

export default {
  ...structuredClone(meta),
  network: 'Graph мережа',
  '###1': {
    type: 'heading',
    title: 'Підграфи',
  },
  developing: 'Розробка',
  deploying: 'Запуск',
  publishing: 'Публікація',
  managing: 'Управління',
  querying: 'Запити',
  cookbook: 'Книга поетапних порад',
  'release-notes': 'Примітки до релізів та інструкції по оновленню',
  '###3': {
    type: 'heading',
    title: 'Індексація',
  },
}
