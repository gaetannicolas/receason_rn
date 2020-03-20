import {
  Platform,
} from 'react-native'
import {
  isIphoneX,
} from 'react-native-iphone-x-helper'

const IS_IOS = Platform.OS === 'ios'
const IS_ANDROID = Platform.OS === 'android'
const IS_IPHONE_X = isIphoneX()

const IPHONE_STATUSBAR_HEIGHT = IS_IPHONE_X ? 40 : 20

export {
  IS_IOS, IS_ANDROID, IS_IPHONE_X, IPHONE_STATUSBAR_HEIGHT,
}
