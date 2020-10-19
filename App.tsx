import React from 'react'
import { configureStore } from '@reduxjs/toolkit'

import { Provider } from 'react-redux'

import Navigation from './Navigation'
import reducer from './src/redux/reducers'

const store = configureStore({
  reducer,
})

import { registerRootComponent } from 'expo'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    )
  }
}

// @ts-ignore
export default registerRootComponent(App)
