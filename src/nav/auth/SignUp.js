import React, { Fragment, Component } from 'react'
import { View, StyleSheet } from 'react-native'

import { Input, ActionButton } from '../../components'
import { Auth } from 'aws-amplify'

class SignIn extends Component {
  state = {
    username: '',
    password: '',
    email: '',
    phone_number: '',
    authCode: '',
    stage: 0
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  signUp = async () => {
    const {
      username, password, email, phone_number
    } = this.state
    try {
      await Auth.signUp({ username, password, attributes: { email, phone_number }})
      console.log('successful sign up..')
      this.setState({ stage: 1 })
    } catch (err) {
      console.log('error signing up...', err)
    }
  }
  confirmSignUp = async () => {
    const { username, authCode } = this.state
    try {
      await Auth.confirmSignUp(username, authCode)
      this.props.toggleAuthType()
    } catch (err) {
      console.log('error signing up...', err)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        {
          this.state.stage === Number(0) && (
            <Fragment>
              <Input
                placeholder='Username'
                type='username'
                onChangeText={this.onChangeText}
              />
              <Input
                placeholder='Password'
                type='password'
                onChangeText={this.onChangeText}
                secureTextEntry
              />
              <Input
                placeholder='Email'
                type='email'
                onChangeText={this.onChangeText}
              />
              <Input
                placeholder='Phone Number'
                type='phone_number'
                onChangeText={this.onChangeText}
              />
              <ActionButton
                title='Sign Up'
                onPress={this.signUp}
              />
            </Fragment>
          )
        }
        {
          this.state.stage === Number(1) && (
            <Fragment>
              <Input
                placeholder='Confirmation Code'
                type='authCode'
                onChangeText={this.onChangeText}
              />
              <ActionButton
                title='Confirm Sign Up'
                onPress={this.confirmSignUp}
              />
            </Fragment>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  input: {
    backgroundColor: '#fcf3db',
    borderRadius: 30,
    height: 45
  }
})

export default SignIn