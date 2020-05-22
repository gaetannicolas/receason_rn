/* eslint-disable complexity */
import React from 'react'
import { View, Image, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import AppText from './AppText'

const NavIcon = ({ active, text, icon }) => {
  return (
    <View style={active ? styles.containerActive : styles.container}>
      <Image
        source={icon}
        style={{
          height: 22,
          width: 22,
        }}
        resizeMode="contain"
      />
      {active && <AppText style={styles.text}>{text}</AppText>}
    </View>
  )
}

NavIcon.propTypes = {
  active: PropTypes.bool,
  text: PropTypes.string,
  icon: PropTypes.number.isRequired,
}

NavIcon.defaultProps = {
  active: false,
  text: null,
}

export default NavIcon

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  containerActive: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: 'rgba(135, 223, 174, 0.5)',
  },
  text: {
    color: '#000000',
    marginLeft: 10,
    fontWeight: 'bold',
  },
})
