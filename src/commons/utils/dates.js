import moment from 'moment'
import fr from 'moment/locale/fr'
import I18n from '../../i18n/i18n'

/**
 * Moments.js setup.
 */
/* istanbul ignore next */
const setupDateFormatting = () => {
  // Add french to the locales managed by moment.js.
  // English is by default.
  moment.updateLocale('fr', fr)

  // Set locale to use in the app.
  // WARNING: https://github.com/moment/moment/issues/3624
  // Without the locale string processing the app will crash at startup, but only in
  // release mode!
  // ReactNativeJS: Requiring unknown module "./locale/fr-FR".
  moment.locale(
    I18n.locale.indexOf('-') === -1
      ? I18n.locale
      : I18n.locale.substr(0, I18n.locale.indexOf('-'))
  )
}

export default {
  setupDateFormatting,
}
