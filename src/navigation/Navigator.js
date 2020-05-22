import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import navigationService from './navigationService'
import AuthenticationScreen from './AuthenticationScreen'
import Products from '../modules/products/scenes/Products'
import Recipes from '../modules/recipes/scenes/Recipes'
import Account from '../modules/account/scenes/Account'
import TabBarIcon from '../commons/components/TabBarIcon'
import ProductDetail from '../modules/products/scenes/ProductDetail'
import RecipeDetail from '../modules/recipes/scenes/RecipeDetail'
import Login from '../modules/authentication/scenes/Login'

const ProductStack = createStackNavigator(
  {
    Products: {
      screen: Products,
      path: '',
      navigationOptions: {
        headerShown: false,
      },
    },
    ProductDetail: {
      screen: ProductDetail,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Products',
    defaultNavigationOptions: {
      headerMode: 'none',
      headerShown: false,
    },
  }
)

const RecipeStack = createStackNavigator(
  {
    Recipes: {
      screen: Recipes,
      path: '',
      navigationOptions: {
        headerShown: false,
      },
    },
    RecipeDetail: {
      screen: RecipeDetail,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Recipes',
    defaultNavigationOptions: {
      headerMode: 'none',
      headerShown: false,
    },
  }
)


const MainTabNavigator = createBottomTabNavigator(
  {
    Products: {
      screen: ProductStack,
    },
    Recipes: {
      screen: RecipeStack,
    },
    Account: {
      screen: Account,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
    initialRouteName: 'Products',
    backBehavior: 'history',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarOptions: {
        showLabel: false,
        style: {
          height: 70,
          borderTopWidth: 0,
          paddingLeft: 10,
          paddingRight: 10,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
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
      },
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ focused }) => (
        <TabBarIcon focused={focused} navigation={navigation} />
      ),
    }),
  }
)

const RootStack = createSwitchNavigator(
  {
    AuthenticationScreen: {
      screen: AuthenticationScreen,
    },
    Main: {
      screen: MainTabNavigator,
    },
    Login: {
      screen: Login,
    },
  },
  {
    initialRouteName: 'AuthenticationScreen',
    mode: 'modal',
    headerMode: 'none',
  }
)

const AppContainer = createAppContainer(RootStack)

// Replace myapp by a unique identifier for your app.
// The https part is for Universal linking / App link.
// The custom scheme is for "traditional" deep linking.
const URI_PREFIX = /https:\/\/app.myapp.com\/|myapp:\/\//

export default () => (
  <AppContainer
    uriPrefix={URI_PREFIX}
    ref={(navigatorRef) => {
      navigationService.setTopLevelNavigator(navigatorRef)
    }}
  />
)
