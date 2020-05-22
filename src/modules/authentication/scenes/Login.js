import React, { useState } from 'react'
import {
  StyleSheet, View, TouchableOpacity, TextInput,
} from 'react-native'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import AppText from '../../../commons/components/AppText'
import AppImage from '../../../commons/components/AppImage'
import { actions } from '../../account/duck'


const Login = ({ navigation }) => {
  const dispatch = useDispatch()
  const [name, setName] = useState(null)

  const updateName = () => {
    dispatch(actions.setName(name))
    navigation.navigate('Main')
  }

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Bienvenue sur Receason</AppText>
      <View style={styles.content}>
        <AppText style={styles.text}>Choississez un pseudo</AppText>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
      </View>
      <TouchableOpacity onPress={updateName} style={styles.nextButton}>
        <AppImage style={styles.nextArrow} width={20} source={require('../../../commons/assets/images/arrow_right.png')} />
      </TouchableOpacity>
    </View>
  )
}

export default Login

Login.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.shape).isRequired,
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    marginBottom: 30,
    marginTop: 40,
  },
  input: {
    marginTop: 10,
    fontFamily: 'Quicksand-Regular',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  nextButton: {
    position: 'absolute',
    bottom: 40,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 15,
  },
  content: {
    marginTop: 30,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
})
