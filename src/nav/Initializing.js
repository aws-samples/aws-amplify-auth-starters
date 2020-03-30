import React from 'react'
import { View, StyleSheet, Animated } from 'react-native'

class SignIn extends React.Component {
  animatedValue = new Animated.Value(.75)
  
  animate = () => {
    Animated.timing(
      this.animatedValue,
      {
        toValue: 2,
        duration: 2500
      }
    ).start()
  }
  render() {
    return (
      <View style={styles.container}>
        <Animated.Image
          style={[styles.logo, { transform: [{ scale: this.animatedValue }]}]}
          resizeMode='contain'
          source={require("../assets/amplify.png")}
        />
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
    height: 50
  }
})

export default SignIn