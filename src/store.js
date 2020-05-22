import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

import recipeReducer from './modules/recipes/duck'
import productReducer from './modules/products/duck'
import accountReducer from './modules/account/duck'


const rootPersistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['recipe', 'account'],
}

const recipePersistConfig = {
  key: 'recipe',
  storage: AsyncStorage,
}

const accountPersistConfig = {
  key: 'account',
  storage: AsyncStorage,
}

const rootReducer = combineReducers({
  recipe: persistReducer(recipePersistConfig, recipeReducer),
  product: productReducer,
  account: persistReducer(accountPersistConfig, accountReducer),
})

const persistanceReducer = persistReducer(rootPersistConfig, rootReducer)

// Common middleware (redux-thunk, redux-saga, ...).
const middleware = []

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  persistanceReducer,
  composeEnhancers(applyMiddleware(...middleware))
)

const persistor = persistStore(store)

export default { store, persistor }
