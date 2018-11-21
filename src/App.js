import React from 'react'
import { createSwitchNavigator, createAppContainer, NavigationActions } from 'react-navigation'

import Auth from './nav/auth/Auth'
import Initializing from './nav/Initializing'
import MainNav from './nav/main/MainNav'

import { Auth as AmplifyAuth } from 'aws-amplify'

const SwitchNav = createSwitchNavigator({
  Initializing: {
    screen: Initializing
  },
  Auth: {
    screen: Auth
  },
  MainNav: {
    screen: MainNav
  }
})

const Nav = createAppContainer(SwitchNav)

class App extends React.Component {
  checkAuth = async () => {
    try {
      await AmplifyAuth.currentAuthenticatedUser()
    } catch (err) {
      this.navigator.dispatch(
        NavigationActions.navigate({ routeName: 'Auth' })
      )
    }
  }
  render() {
    return (
      <Nav
        ref={nav => this.navigator = nav}
        onNavigationStateChange={this.checkAuth}
      />
    )
  }
}

export default App
