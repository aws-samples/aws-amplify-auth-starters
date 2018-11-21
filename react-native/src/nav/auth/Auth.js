import React from 'react'
import {
  View, Text, StyleSheet, Image, Dimensions
} from 'react-native'

import SignIn from './SignIn'
import SignUp from './SignUp'

const { width } = Dimensions.get('window')

class Auth extends React.Component {
  state = {
    showSignUp: false
  }
  toggleAuthType = () => {
    let showSignUp
    this.state.showSignUp ? 
      showSignUp = false : showSignUp = true
    this.setState({ showSignUp })
  }
  render() {
    const { showSignUp } = this.state
    return (
      <View style={styles.container}>
        <Image
          style={styles.logo}
          resizeMode='contain'
          source={require("../../assets/amplify.png")}
        />
        <Text style={styles.title}>AWS Amplify</Text>
        <Text style={styles.subtitle}>React Native Auth Starter</Text>
        {
          showSignUp ? <SignUp toggleAuthType={this.toggleAuthType} /> : <SignIn navigation={this.props.navigation} />
        }
        <View style={{ position: 'absolute', bottom: 40 }}>
          {
            showSignUp ? (
              <Text style={styles.bottomMessage}>Already signed up? <Text
              style={styles.bottomMessageHighlight}  onPress={this.toggleAuthType}>&nbsp;&nbsp;Sign In</Text></Text>
            ) : (
              <Text style={styles.bottomMessage}>Need an account?
                <Text onPress={this.toggleAuthType} style={styles.bottomMessageHighlight}>&nbsp;&nbsp;Sign Up</Text>
              </Text>
            )
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },  
  logo: {
    height: width / 2.5
  },
  title: {
    fontSize: 26,
    marginTop: 15,
    fontFamily: 'SourceSansPro-SemiBold',
    color: '#e19f51'
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'rgba(0, 0, 0, .75)',
    fontFamily: 'SourceSansPro-Regular',
  },
  bottomMessage: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: 18
  },
  bottomMessageHighlight: {
    color: '#f4a63b',
    paddingLeft: 10
  }
})

export default Auth