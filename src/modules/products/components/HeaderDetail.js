import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import AppImage from '../../../commons/components/AppImage'
import AppText from '../../../commons/components/AppText'
import { actions } from '../duck'

const HeaderDetail = ({ navigation, name }) => {
  const dispatch = useDispatch()
  const searchRecipe = () => {
    dispatch(actions.setRecipeSearch(name))
    navigation.navigate('Recipes')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AppImage source={require('../../../commons/assets/images/back.png')} height={14} width={18} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.cookButton} onPress={searchRecipe}>
        <AppImage width={22} source={require('../../../commons/assets/images/icn_recipe.png')} />
        <AppText style={styles.cook}>Cuisiner</AppText>
      </TouchableOpacity>
    </View>
  )
}

HeaderDetail.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.shape).isRequired,
  name: PropTypes.string.isRequired,

}

export default HeaderDetail


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  cookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cook: {
    fontSize: 18,
    marginLeft: 10,
  },
})
