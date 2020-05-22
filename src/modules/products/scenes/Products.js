import React, { useEffect, useState } from 'react'
import {
  StyleSheet, View, FlatList, Dimensions, TouchableOpacity, TextInput,
} from 'react-native'
import PropTypes from 'prop-types'
import firestore from '@react-native-firebase/firestore'
import { useSelector } from 'react-redux'
import moment from 'moment'
import AppText from '../../../commons/components/AppText'
import AppImage from '../../../commons/components/AppImage'
import { API_PRODUCTS_FRUIT, API_PRODUCTS_VEGETABLE } from '../../../api/constants'
import { monthsArray } from '../utils/constants'

const Products = ({ navigation }) => {
  const [products, setProducts] = useState(null)
  const [filter, setFilter] = useState(API_PRODUCTS_FRUIT)
  const [isSearching, setIsSearching] = useState(false)
  const [search, setSearch] = useState(null)
  const [searchProducts, setSearchProducts] = useState(null)
  const [monthSelected, setMonthSelected] = useState(null)
  const [productsByMonth, setProductsByMonth] = useState(null)
  const name = useSelector((state) => state.account.name)

  const getCollection = () => firestore().collection('products').get().then((querySnapshot) => {
    const productsList = []
    querySnapshot.forEach((doc) => {
      console.log(doc.data())
      productsList.push(doc.data())
    })
    console.log(productsList)
    setProducts(productsList)
  })

  useEffect(() => {
    if (products) {
      const filterByMonth = products.filter((product) => product.months_availables.includes(monthSelected))
      setProductsByMonth(filterByMonth)
    }
  }, [monthSelected, products])


  useEffect(() => {
    getCollection()
    setMonthSelected(moment().format('MMMM'))
  }, [])

  const goToDetail = (product) => {
    navigation.navigate('ProductDetail', { product })
  }

  const isEquivalents = (strA, strB) => {
    const prepareString = (value) => value.trim().toLowerCase()

    let shorter
    let longer
    if (strA.trim().length < strB.trim().length) {
      shorter = prepareString(strA)
      longer = prepareString(strB)
    } else {
      shorter = prepareString(strB)
      longer = prepareString(strA)
    }

    return longer.includes(shorter)
  }

  const searchProduct = (text) => {
    const searchResult = products.filter((product) => isEquivalents(product.name, text))
    setSearchProducts(searchResult)
    setSearch(text)
  }

  const resetSearch = () => {
    setIsSearching(false)
    setSearch(null)
    setSearchProducts(null)
  }

  const renderProduct = (item) => (
    <TouchableOpacity style={styles.product} onPress={() => goToDetail(item)}>
      <View style={styles.imageContainer}>
        <AppImage width={50} source={{ uri: item.icons.image }} />
      </View>
      <AppText style={styles.name}>{item.name}</AppText>
    </TouchableOpacity>
  )

  const nextMonth = () => {
    const index = monthsArray.indexOf(monthSelected)
    if (index === 11) {
      setMonthSelected(monthsArray[0])
    } else {
      setMonthSelected(monthsArray[monthsArray.indexOf(monthSelected) + 1])
    }
  }

  const prevMonth = () => {
    const index = monthsArray.indexOf(monthSelected)
    if (index === 0) {
      setMonthSelected(monthsArray[11])
    } else {
      setMonthSelected(monthsArray[monthsArray.indexOf(monthSelected) - 1])
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {!isSearching && (
          <>
            <AppText style={styles.title}>
              Bonjour, {name && name}
            </AppText>
            <TouchableOpacity style={styles.searchButton} onPress={() => setIsSearching(true)}>
              <AppImage width={15} height={15} source={require('../../../commons/assets/images/icn_search.png')} />
            </TouchableOpacity>
          </>
        )}
        {isSearching && (
          <>
            <TextInput
              style={styles.input}
              value={search}
              onChangeText={searchProduct}
            />
            <TouchableOpacity style={styles.searchButton} onPress={resetSearch}>
              <AppImage width={15} height={15} source={require('../../../commons/assets/images/icn_search.png')} />
            </TouchableOpacity>
          </>
        )}
      </View>
      <View style={styles.months}>
        <TouchableOpacity
          onPress={prevMonth}
          hitSlop={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <AppImage width={10} source={require('../../../commons/assets/images/chevron_left.png')} />
        </TouchableOpacity>
        {monthSelected && (
          <AppText style={styles.monthsText}>{monthSelected}</AppText>
        )}
        <TouchableOpacity
          onPress={nextMonth}
          hitSlop={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <AppImage width={10} source={require('../../../commons/assets/images/chevron_right.png')} />
        </TouchableOpacity>
      </View>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setFilter(API_PRODUCTS_FRUIT)} style={[styles.filterButton, filter === API_PRODUCTS_FRUIT ? styles.active : '']}>
          <AppText style={styles.filter}>
            Fruits
          </AppText>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setFilter(API_PRODUCTS_VEGETABLE)} style={[styles.filterButton, filter === API_PRODUCTS_VEGETABLE ? styles.active : '']}>
          <AppText style={styles.filter}>Légumes</AppText>
        </TouchableOpacity>
      </View>
      {products && productsByMonth && (
        <FlatList
          style={styles.list}
          numColumns={2}
          data={isSearching && searchProducts ? searchProducts.filter((product) => product.type === filter) : productsByMonth.filter((product) => product.type === filter)}
          keyExtractor={(item) => item.index}
          renderItem={({ item }) => renderProduct(item)}
        />
      )}
    </View>
  )
}

Products.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.shape).isRequired,
}

export default Products

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    backgroundColor: '#F4F4F4',
    flex: 1,
  },
  header: {
    marginVertical: 15,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
  },
  searchButton: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: 'row',
  },
  input: {
    backgroundColor: '#ffffff',
    flex: 1,
    marginRight: 10,
    height: 35,
    borderRadius: 8,
    paddingLeft: 10,
  },
  months: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  monthsText: {
    fontSize: 20,
    textTransform: 'capitalize',
    fontWeight: 'bold',
  },
  product: {
    width: (Dimensions.get('window').width - 60) / 2,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 10,
    paddingVertical: 20,
  },
  imageContainer: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  name: {
    paddingHorizontal: 15,
    marginTop: 15,
    fontSize: 18,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    padding: 10,
    backgroundColor: '#ffffff',
    margin: 5,
    borderRadius: 8,
  },
  filter: {
    fontSize: 16,
  },
  active: {
    backgroundColor: '#F0B300',
  },
})
