import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Image, ViewPropTypes } from 'react-native'
import resolveAssetSource from 'react-native/Libraries/Image/resolveAssetSource'

const AppImage = (props) => {
  const [originalDimensions, setOriginalDimensions] = useState(null)

  useEffect(() => {
    const getOriginalDimensions = async () => {
      const source = props.source

      // Get original dimensions.
      const originalDim = {}
      if (source instanceof Object && typeof source.uri === 'string') {
        // Remote image.
        await Image.getSize(
          source.uri,
          (originalWidth, originalHeight) => {
            originalDim.width = originalWidth
            originalDim.height = originalHeight
            setOriginalDimensions(originalDim)
          }
        )
      } else {
        // Local image imported via require.
        const localImage = resolveAssetSource(source)
        originalDim.width = localImage.width
        originalDim.height = localImage.height
        setOriginalDimensions(originalDim)
      }
    }

    getOriginalDimensions()
  }, [props.source])

  const {
    source, width, height, style, ...otherProps
  } = props

  let userStyle = {}
  if (Array.isArray(style)) {
    style.forEach((item) => {
      userStyle = { ...userStyle, ...item }
    })
  } else {
    // Should be an object.
    userStyle = { ...style }
  }

  // Resize image as requested by user.
  const resizedDimensions = {
    width: 0,
    height: 0,
  }

  if (originalDimensions) {
    if (width && height) {
      // Don't preserve ratio.
      resizedDimensions.width = width
      resizedDimensions.height = height
    } else if (width) {
      // Preserve ratio based on width.
      const ratio = width / originalDimensions.width
      resizedDimensions.width = width
      resizedDimensions.height = originalDimensions.height * ratio
    } else if (height) {
      // Preserve ratio based on height.
      const ratio = height / originalDimensions.height
      resizedDimensions.height = height
      resizedDimensions.width = originalDimensions.width * ratio
    }
  }

  return (
    <Image
      testID="image"
      source={source}
      style={{ ...resizedDimensions, ...userStyle }}
      {...otherProps}
    />
  )
}
AppImage.propTypes = {
  source: PropTypes.oneOfType([PropTypes.node, PropTypes.shape()]).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  style: ViewPropTypes.style,
}
AppImage.defaultProps = {
  width: 0,
  height: 0,
  style: {},
}


export default AppImage
