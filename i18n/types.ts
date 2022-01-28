import global from '@/pages/en/global.json'
import index from '@/pages/en/index.json'

export type LocaleDetails = {
  displayName: string
  shortName: string
}

export type Translations = {
  global: typeof global
  index: typeof index
}
