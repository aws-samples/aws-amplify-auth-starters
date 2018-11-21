import React, { Component } from 'react'
import { View } from 'react-native'

import { Auth } from 'aws-amplify'

import { Input, ActionButton } from '../../components'

class SignIn extends Component {
  state = {
    username: '',
    password: '',
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  signIn = async () => {
    const { username, password } = this.state
    try {
      await Auth.signIn(username, password)
      console.log('successfully signed in')
      this.props.navigation.navigate('MainNav')
    } catch (err) {
      console.log('error signing up...', err)
    }
  }
  render() {
    return (
      <View>
        <Input
          onChangeText={this.onChangeText}
          type='username'
          placeholder='Username'
        />
        <Input
          onChangeText={this.onChangeText}
          type='password'
          placeholder='Password'
          secureTextEntry
        />
        <ActionButton
          title='Sign In'
          onPress={this.signIn}
        />
      </View>
    )
  }
}

export default SignIn