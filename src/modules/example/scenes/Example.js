import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import firestore from '@react-native-firebase/firestore'

/**
 * Use functional components and hooks.
 */
const Example = () => {

  // Read the document for user 'Ada Lovelace':
  // const documentSnapshot = firestore()
  //   .collection('products')
  //   .doc()
  //   .get()

  // console.warn(documentSnapshot.data())

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Appstud React-native project starter</Text>
        <Text style={styles.text}>
          Please (re)read the main README.md to learn how to organise your code!
        </Text>
      </View>
    </View>
  )
}
Example.navigationOptions = {
  title: 'Welcome',
}


export default Example


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    marginBottom: 30,
  },
  text: {
    textAlign: 'center',
    color: 'red',
  },
})
