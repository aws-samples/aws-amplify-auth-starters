import React, { Component } from 'react'
import { Auth, Hub } from 'aws-amplify'

import './App.css'
import Router from './Router'
import UserContext from './UserContext'

class App extends Component {
  state = {
    currentUser: {},
    isLoaded: false
  }
  componentDidMount() {
    this.updateCurrentUser()
    Hub.listen('auth', this);
  }
  onHubCapsule(capsule) {
    const { channel, payload } = capsule;
    if (channel === 'auth' && payload.event !== 'signIn') {
      this.updateCurrentUser()
    }
  }
  updateCurrentUser = async (user) => {
    if (user) {
      this.setState({ currentUser: user })
      return
    }
    try {
      const user = await Auth.currentAuthenticatedUser()
      this.setState({ currentUser: user, isLoaded: true })
    } catch (err) {
      this.setState({ currentUser: null, isLoaded: true })
    }
  }
  render() {
    return (
      <UserContext.Provider value={{
        user: this.state.currentUser,
        updateCurrentUser: this.updateCurrentUser,
        isLoaded: this.state.isLoaded
      }}>
        <div className="App">
          <Router />
        </div>
      </UserContext.Provider>
    );
  }
}

export default App
