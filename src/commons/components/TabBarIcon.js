/* eslint-disable complexity */
import React from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import NavIcon from './NavIcon'
import i18n from '../../i18n/i18n'

const TabBarIcon = ({ focused, navigation }) => {
  const { routeName } = navigation.state

  const getIcon = () => {
    switch (routeName) {
      case 'Products':
        return (
          <NavIcon
            active={focused}
            text={i18n.t('nav.products')}
            icon={focused ? require('../assets/images/icn_product_active.png') : require('../assets/images/icn_product.png')}
          />
        )
      case 'Recipes':
        return (
          <NavIcon
            active={focused}
            text={i18n.t('nav.recipes')}
            icon={focused ? require('../assets/images/icn_recipe_active.png') : require('../assets/images/icn_recipe.png')}
          />
        )
      case 'Account':
        return (
          <NavIcon
            active={focused}
            text={i18n.t('nav.profile')}
            icon={focused ? require('../assets/images/icn_profile_active.png') : require('../assets/images/icn_profile.png')}
          />
        )
      default:
        return null
    }
  }

  return (
    <View>
      {getIcon()}
    </View>
  )
}

TabBarIcon.propTypes = {
  focused: PropTypes.bool.isRequired,
  navigation: PropTypes.objectOf(PropTypes.shape).isRequired,
}

export default TabBarIcon
