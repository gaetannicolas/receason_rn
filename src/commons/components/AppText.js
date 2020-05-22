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

  if (Platform.OS === 'android') {
    style.fontWeight = 'normal'
    style.fontStyle = 'normal'
  }

  return style
}

const fontMapping = {
  normal: 'Quicksand-Regular',
  bold: 'Quicksand-Bold',
  semibold: 'Quicksand-SemiBold',
  100: 'Quicksand-Light',
  200: 'Quicksand-Light',
  300: 'Quicksand-Light',
  400: 'Quicksand-Regular',
  500: 'Quicksand-Text',
  600: 'Quicksand-Medium',
  700: 'Quicksand-SemiBold',
  800: 'Quicksand-Bold',
  900: 'Quicksand-Bold',
  italic: 'Quicksand-Regular',
  boldItalic: 'Quicksand-Regular',
  '100Italic': 'Quicksand-Regular',
  '200Italic': 'Quicksand-Regular',
  '300Italic': 'Quicksand-Regular',
  '400Italic': 'Quicksand-Regular',
  '500Italic': 'Quicksand-Regular',
  '600Italic': 'Quicksand-Regular',
  '700Italic': 'Quicksand-Regular',
  '800Italic': 'Quicksand-Regular',
  '900Italic': 'Quicksand-Regular',
}


export default AppText
export { getStyle }


const styles = StyleSheet.create({
  text: {
    color: theme.text.color,
  },
})
