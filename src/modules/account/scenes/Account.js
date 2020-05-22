import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import AppText from '../../../commons/components/AppText'
import AppImage from '../../../commons/components/AppImage'
import { actions as recipeActions } from '../../recipes/duck'

const Account = ({ navigation }) => {
  const dispatch = useDispatch()
  const name = useSelector((state) => state.account.name)
  const recipes = useSelector((state) => state.recipe.recipes)

  const goToDetail = (recipe) => {
    navigation.navigate('RecipeDetail', { recipe })
  }

  const likeRecipe = (recipe) => {
    const isLiked = recipe && Object.hasOwnProperty.call(recipes, recipe.title)
    if (isLiked) {
      dispatch(recipeActions.removeLike(recipe))
    } else {
      dispatch(recipeActions.addLike(recipe))
    }
  }

  const recipeDetail = (item) => (
    <TouchableOpacity style={styles.product} onPress={() => goToDetail(item)}>
      <View style={styles.imageContainer}>
        <View style={styles.likeContainer}>
          <TouchableWithoutFeedback onPress={() => likeRecipe(item)}>
            {item && Object.hasOwnProperty.call(recipes, item.title)
              ? <AppImage style={styles.like} width={30} source={require('../../../commons/assets/images/like_active.png')} />
              : <AppImage style={styles.like} width={30} source={require('../../../commons/assets/images/like.png')} />}

          </TouchableWithoutFeedback>
        </View>
        <AppImage width={(Dimensions.get('window').width - 60) / 2} style={styles.image} source={{ uri: item.picture }} />
      </View>
      <View style={styles.content}>
        <AppText style={styles.title}>{item.title}</AppText>
        <View style={styles.subContent}>
          <View style={styles.timeContainer}>
            <AppImage
              source={require('../../recipes/assets/time.png')}
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
        <AppText style={styles.name}>{name && name}</AppText>
        <AppText style={styles.subtTitle}>Mes recettes</AppText>
      </View>
      {recipes && (
        <FlatList
          style={styles.list}
          data={Object.values(recipes)}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => recipeDetail(item)}
        />
      )}
    </View>
  )
}

Account.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.shape).isRequired,
}

export default Account

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  header: {
    paddingHorizontal: 10,
  },
  name: {
    fontSize: 22,
    marginTop: 30,
  },
  subtTitle: {
    fontSize: 18,
    marginTop: 30,
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
  title: {
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
