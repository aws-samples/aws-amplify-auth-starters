import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { Auth } from 'aws-amplify'

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  }
  signOut = async () => {
    try {
      await Auth.signOut()
      this.props.navigation.navigate('Auth')
    } catch (err) {
      console.log('error signing out...', err)
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello from Home</Text>
        <Text onPress={() => this.props.navigation.navigate('Route2')}>Go to Route 2</Text>
        <Text onPress={this.signOut}>Sign Out</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  }
})

export default Home