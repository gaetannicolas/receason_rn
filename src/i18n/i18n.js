/* istanbul ignore file */

import { I18nManager } from 'react-native'
import * as RNLocalize from 'react-native-localize'
import i18n from 'i18n-js'

import en from './locales/en'
import fr from './locales/fr'

i18n.translations = { en, fr }
i18n.fallbacks = false

const fallback = { languageTag: 'en', isRTL: false }
const { languageTag, isRTL } = RNLocalize.findBestAvailableLanguage(Object.keys(i18n.translations))
|| fallback

I18nManager.forceRTL(isRTL)
i18n.locale = languageTag

export default i18n
