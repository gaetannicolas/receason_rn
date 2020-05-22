import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import AppImage from '../../../commons/components/AppImage'

const HeaderDetail = ({ navigation }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <AppImage source={require('../../../commons/assets/images/back.png')} height={14} width={18} />
    </TouchableOpacity>
  </View>
)

HeaderDetail.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.shape).isRequired,
}

export default HeaderDetail


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#F4F4F4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
})
