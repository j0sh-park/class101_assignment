import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

const translationKo = require('@resources/locales/ko/translation.json')

const SUPPORTED_LANGUAGES = ['ko']
const NAME_SPACES = ['translation']

const resources = {
  ko: {
    translation: translationKo,
  },
}

export const initI18next = () => {
  return i18next.use(initReactI18next).init({
    resources,
    defaultNS: NAME_SPACES[0],
    ns: NAME_SPACES,
    preload: SUPPORTED_LANGUAGES,
    fallbackLng: SUPPORTED_LANGUAGES[0],
  })
}
