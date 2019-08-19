import React from 'react'
import {
  View, Text, StyleSheet, Image, Dimensions
} from 'react-native'
import { Input, ActionButton } from '../../components'
import { Auth } from 'aws-amplify'

class ForgotPassword extends React.Component {
  state = {
    stage: 0,
    username: '',
    email: '',
    password: '',
    authorizationCode: ''
  }
  onChangeText = (key, value) => {
    this.setState({ [key]: value })
  }
  resetPassword = () => {
    Auth.forgotPassword(this.state.username)
      .then(() => {
        this.setState({ stage: 1 })
      })
      .catch(err => console.log('error: ', err))
  }
  confirmResetPassword = () => {
    const { username, password, authorizationCode } = this.state
    Auth.forgotPasswordSubmit(username, authorizationCode, password)
      .then(() => {
        alert('successfully changed password!')
        this.props.toggleAuthType('showSignIn')
      })
      .catch(err => console.log('error resetting password:', err))
  }
  render() {
    const { stage } = this.state
    return (
      <View>
        { stage === Number(0) && (
          <View>
            <Input
              onChangeText={this.onChangeText}
              type='username'
              placeholder='Username'
            />
            <ActionButton
              title='Get authorization code'
              onPress={this.resetPassword}
            />
          </View>
        )}
        { stage === Number(1) && (
          <View>
            <Input
              onChangeText={this.onChangeText}
              type='authorizationCode'
              placeholder='Authorization Code'
            />
            <Input
              onChangeText={this.onChangeText}
              type='password'
              placeholder='New Password'
              secureTextEntry
            />
            <ActionButton
              title='Reset Password'
              onPress={this.confirmResetPassword}
            />
          </View>
        )}
      </View>
    )
  }
}

export default ForgotPassword