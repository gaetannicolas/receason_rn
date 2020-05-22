import React, { useEffect } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import Navigator from './navigation/Navigator'
import store from './store'
import dateUtils from './commons/utils/dates'

// Put here all providers for things that will be use in all the app.
// Products: <ReduxProvider>, <PersistGate>, ...
export default () => {
  useEffect(() => {
    dateUtils.setupDateFormatting()
  }, [])

  return (
    <ReduxProvider store={store.store}>
      <PersistGate persistor={store.persistor}>
        <Navigator />
      </PersistGate>
    </ReduxProvider>
  )
}
