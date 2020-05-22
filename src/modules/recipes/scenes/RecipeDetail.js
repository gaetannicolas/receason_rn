import React from 'react'
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import AppText from '../../../commons/components/AppText'
import AppImage from '../../../commons/components/AppImage'
import { actions } from '../duck'

const RecipeDetail = ({ navigation }) => {
  const dispatch = useDispatch()
  const recipesLike = useSelector((state) => state.recipe.recipes)
  const recipe = navigation.getParam('recipe')

  const likeRecipe = () => {
    const isLiked = recipe && Object.hasOwnProperty.call(recipesLike, recipe.title)
    if (isLiked) {
      dispatch(actions.removeLike(recipe))
    } else {
      dispatch(actions.addLike(recipe))
    }
  }

  return (
    <ScrollView style={styles.container}>
      {recipe && (
        <View>
          <View>
            <View>
              <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <AppImage style={styles.back} source={require('../../../commons/assets/images/back.png')} height={14} width={18} />
              </TouchableWithoutFeedback>
            </View>
            <View>
              <TouchableWithoutFeedback onPress={likeRecipe}>
                {recipe && Object.hasOwnProperty.call(recipesLike, recipe.title)
                  ? <AppImage style={styles.like} width={30} source={require('../../../commons/assets/images/like_active.png')} />
                  : <AppImage style={styles.like} width={30} source={require('../../../commons/assets/images/like.png')} />}
              </TouchableWithoutFeedback>
            </View>
            <AppImage source={{ uri: recipe.picture }} width={Dimensions.get('window').width} />
            <View style={styles.products}>
              <AppText style={styles.title}>{recipe.title}</AppText>
              <AppText style={styles.prodsNumber}>{recipe.prods.length} produits</AppText>
              <View style={styles.prods}>
                {recipe.prods && recipe.prods.map((product) => (
                  <View key={product.id}>
                    <AppImage source={{ uri: product.icons.icon }} width={25} />
                  </View>
                ))}
              </View>
            </View>
          </View>
          <View style={styles.content}>
            <View style={styles.timeContainer}>
              <AppImage
                source={require('../assets/time.png')}
                height={20}
                width={20}
              />
              <AppText style={styles.time}>{recipe.time} min</AppText>
            </View>
            <View style={styles.ingredientContainer}>
              <AppText style={styles.ingredientTitle}>Ingredients</AppText>
              {recipe.ingredients && recipe.ingredients.map((ingredient) => (
                <View key={ingredient}>
                  <AppText style={styles.ingredient}>{ingredient}</AppText>
                </View>
              ))}
            </View>
            <View style={styles.step}>
              {recipe.step.map((step, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <View style={styles.stepItem} key={index}>
                  <View style={styles.stepHeader}>
                    <AppText>Etape {index + 1}/{recipe.step.length}</AppText>
                  </View>
                  <View style={styles.stepContent}>
                    <AppText style={styles.stepText}>{step}</AppText>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  )
}

RecipeDetail.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.shape).isRequired,
}

export default RecipeDetail

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F4F4',
    flex: 1,
  },
  header: {},
  back: {
    position: 'absolute',
    zIndex: 1,
    top: 15,
    left: 20,
  },
  like: {
    position: 'absolute',
    zIndex: 1,
    right: 20,
    top: 10,
  },
  products: {
    position: 'absolute',
    bottom: -50,
    left: 20,
    width: Dimensions.get('window').width - 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  prodsNumber: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777777',
  },
  prods: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  content: {
    marginTop: 80,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  time: {
    fontSize: 20,
    marginLeft: 20,
  },
  ingredientContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  ingredientTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredient: {
    fontSize: 20,
  },
  step: {
    marginVertical: 20,
  },
  stepHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  stepContent: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  stepText: {
    fontSize: 18,
  },
})
