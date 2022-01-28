import global from './global.json'
import index from './index.json'
import { Translations } from '@/i18n'

const translations: Translations = {
  global: global as Translations['global'],
  index: index as Translations['index'],
}

export default translations
