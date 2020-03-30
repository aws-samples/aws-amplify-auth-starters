import React from 'react'

import Auth from './nav/auth/Auth'
import Initializing from './nav/Initializing'
import MainNav from './nav/main/MainNav'

import { Auth as AmplifyAuth } from 'aws-amplify'

class App extends React.Component {
  state = {
    currentView: 'initializing'
  }
  componentDidMount() {
    this.checkAuth()
  }
  updateAuth = (currentView) => {
    this.setState({ currentView })
  }
  checkAuth = async () => {
    try {
      await AmplifyAuth.currentAuthenticatedUser()
      console.log('user is signed in')
      this.setState({ currentView: 'mainNav' })
    } catch (err) {
      console.log('user is not signed in')
      this.setState({ currentView: 'auth' })
    }
  }
  render() {
    const { currentView } = this.state
    console.log('currentView: ', currentView)
    return (
      <>
        { currentView === 'initializing' && <Initializing />}
        { currentView === 'auth' && <Auth updateAuth={this.updateAuth} />}
        { currentView === 'mainNav' && <MainNav updateAuth={this.updateAuth} />}
      </>
    )
  }
}

export default App
