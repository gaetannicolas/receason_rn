import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import firestore from '@react-native-firebase/firestore'

const Example = () => {
  const [products, setProducts] = useState(null)

  const getCollection = () => {
    console.log('test')
    return firestore().collection('products').onSnapshot((querySnapshot) => {
      // Add users into an array
      const productsList = querySnapshot.docs.map((documentSnapshot) => {
        return {
          ...documentSnapshot.data(),
          key: documentSnapshot.id, // required for FlatList
        }
      })

      // Update state with the users array
      setProducts(productsList)
    })
  }


  useEffect(() => {
    getCollection()
  })


  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Appstud React-native project starter</Text>
        <Text style={styles.text}>
          Please (re)read the main README.md to  how to organise your code!
        </Text>
        {products.map((item) => (
          <Text>{item.name}</Text>
        ))}
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
