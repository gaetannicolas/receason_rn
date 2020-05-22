/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import {
  StyleSheet, View, FlatList, Dimensions, TouchableOpacity, TextInput, TouchableWithoutFeedback,
} from 'react-native'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import AppText from '../../../commons/components/AppText'
import AppImage from '../../../commons/components/AppImage'
import { actions } from '../duck'
import { actions as productAction } from '../../products/duck'

const Recipes = ({ navigation }) => {
  const dispatch = useDispatch()
  const recipesLike = useSelector((state) => state.recipe.recipes)
  const productSearch = useSelector((state) => state.product.search)
  const [recipes, setRecipes] = useState(null)
  const [search, setSearch] = useState(null)
  const [isSearching, setIsSearching] = useState(false)
  const [searchRecipes, setSearchRecipes] = useState(null)

  useEffect(() => {
    getCollection()
  }, [])

  useEffect(() => {
    if (productSearch && recipes) {
      setSearch(productSearch)
      searchRecipe(productSearch)
      setIsSearching(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSearch])

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

  const getCollection = () => firestore().collection('recipes').get().then((querySnapshot) => {
    const recipesList = []
    querySnapshot.forEach((doc) => {
      recipesList.push({
        ...doc.data(),
      })
    })
    setRecipes(recipesList)
  })

  const goToDetail = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe })
  }

  const likeRecipe = (recipe) => {
    const isLiked = recipe && Object.hasOwnProperty.call(recipesLike, recipe.title)
    if (isLiked) {
      dispatch(actions.removeLike(recipe))
    } else {
      dispatch(actions.addLike(recipe))
    }
  }

  const searchRecipe = (text) => {
    const searchResult = recipes.filter((recipe) => isEquivalents(recipe.title, text))
    setSearchRecipes(searchResult)
    setSearch(text)
  }

  const resetSearch = () => {
    dispatch(productAction.setRecipeSearch(null))
    setIsSearching(false)
    setSearch(null)
    setSearchRecipes(null)
  }

  const renderProduct = (item) => (
    <TouchableOpacity style={styles.product} onPress={() => goToDetail(item)}>
      <View style={styles.imageContainer}>
        <View style={styles.likeContainer}>
          <TouchableWithoutFeedback onPress={() => likeRecipe(item)}>
            {item && Object.hasOwnProperty.call(recipesLike, item.title)
              ? <AppImage style={styles.like} width={30} source={require('../../../commons/assets/images/like_active.png')} />
              : <AppImage style={styles.like} width={30} source={require('../../../commons/assets/images/like.png')} />}

          </TouchableWithoutFeedback>
        </View>
        <AppImage width={(Dimensions.get('window').width - 60) / 2} style={styles.image} source={{ uri: item.picture }} />
      </View>
      <View style={styles.content}>
        <AppText style={styles.name}>{item.title}</AppText>
        <View style={styles.subContent}>
          <View style={styles.timeContainer}>
            <AppImage
              source={require('../assets/time.png')}
              height={20}
              width={20}
            />
            <AppText style={{ marginLeft: 5 }}>{item.time} min</AppText>
          </View>
          <View style={styles.productsContainer}>
            {item.prods && item.prods.map((recipeProduct) => (
              <View key={recipeProduct.id}>
                <AppImage source={{ uri: recipeProduct.icons.icon }} width={25} />
              </View>
            ))}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {!isSearching && (
          <>
            <AppText style={styles.title}>
              Pour vous
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
              onChangeText={searchRecipe}
            />
            <TouchableOpacity style={styles.searchButton} onPress={resetSearch}>
              <AppImage width={15} height={15} source={require('../../../commons/assets/images/icn_search.png')} />
            </TouchableOpacity>
          </>
        )}
      </View>
      {recipes && (
        <FlatList
          style={styles.list}
          data={isSearching && searchRecipes ? searchRecipes : recipes}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => renderProduct(item)}
        />
      )}
    </View>
  )
}

Recipes.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.shape).isRequired,
}

export default Recipes

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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  searchIcon: {
    margin: 10,
  },
  text: {
    textAlign: 'center',
    color: 'red',
  },
  title: {
    fontSize: 22,
    marginTop: 10,
  },
  product: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 10,
    flexDirection: 'row',
  },
  content: {
    flex: 1,
    marginTop: 5,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
  },
  imageContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    position: 'relative',
  },
  image: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  subContent: {
    marginVertical: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productsContainer: {
    marginTop: 10,
  },
  likeContainer: {
    position: 'absolute',
    zIndex: 1,
    bottom: 10,
    left: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
})
