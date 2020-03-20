import React from 'react'
import { StyleSheet, Text, Platform } from 'react-native'
import PropTypes from 'prop-types'
import theme from '../../themes/default'

/**
 * AppText: you Text component, but better ©.
 *
 * Note: You'll have to install the custom font and change this component
 * accordingly before using it.
 */
const AppText = (props) => {
  const { style, children, ...otherProps } = props

  let userStyle = {}
  if (Array.isArray(style)) {
    style.forEach((item) => {
      userStyle = { ...userStyle, ...item }
    })
  } else {
    // Should be an object.
    userStyle = { ...style }
  }

  return (
    <Text style={{ ...styles.text, ...getStyle(userStyle) }} {...otherProps}>
      {children}
    </Text>
  )
}
AppText.propTypes = {
  style: Text.propTypes.style,
  children: PropTypes.node,
  contentText: PropTypes.bool,
}
AppText.defaultProps = {
  style: {},
  children: '',
  contentText: false,
}

/**
 * Android bugfix, @see https://github.com/archriss/react-native-render-html/issues/223
 */
const getStyle = (userStyle) => {
  const style = { ...userStyle }

  // Nominal case.
  style.fontFamily = fontMapping.normal

  if (style.fontWeight && style.fontStyle && style.fontStyle === 'italic') {
    // Weight and italic case.
    style.fontFamily = fontMapping[`${style.fontWeight}Italic`]
  } else if (style.fontWeight) {
    // Only Weight case.
    style.fontFamily = fontMapping[style.fontWeight]
  } else if (style.fontStyle && style.fontStyle === 'italic') {
    // Only Style case.
    style.fontFamily = fontMapping.italic
  }

  // For IOS, Regular font is non specific font.
  if (Platform.OS === 'ios' && style.fontFamily === 'IBMPlexSans-Regular') {
    style.fontFamily = 'IBMPlexSans'
  }

  if (Platform.OS === 'android') {
    style.fontWeight = 'normal'
    style.fontStyle = 'normal'
  }

  return style
}

const fontMapping = {
  normal: 'IBMPlexSans-Regular',
  bold: 'IBMPlexSans-Bold',
  semibold: 'IBMPlexSans-SemiBold',
  100: 'IBMPlexSans-Thin',
  200: 'IBMPlexSans-ExtraLight',
  300: 'IBMPlexSans-Light',
  400: 'IBMPlexSans-Regular',
  500: 'IBMPlexSans-Text',
  600: 'IBMPlexSans-Medium',
  700: 'IBMPlexSans-SemiBold',
  800: 'IBMPlexSans-Bold',
  900: 'IBMPlexSans-Bold',
  italic: 'IBMPlexSans-Italic',
  boldItalic: 'IBMPlexSans-BoldItalic',
  '100Italic': 'IBMPlexSans-ThinItalic',
  '200Italic': 'IBMPlexSans-ExtraLightItalic',
  '300Italic': 'IBMPlexSans-LightItalic',
  '400Italic': 'IBMPlexSans-Italic',
  '500Italic': 'IBMPlexSans-TextItalic',
  '600Italic': 'IBMPlexSans-MediumItalic',
  '700Italic': 'IBMPlexSans-SemiBoldItalic',
  '800Italic': 'IBMPlexSans-BoldItalic',
  '900Italic': 'IBMPlexSans-BoldItalic',
}


export default AppText
export { getStyle }


const styles = StyleSheet.create({
  text: {
    color: theme.text.color,
  },
})
