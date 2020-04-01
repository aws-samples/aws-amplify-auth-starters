import React from 'react'
import { View, StyleSheet, Animated } from 'react-native'
import amplifyLogo from "../../assets/amplify.png"

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
          source={amplifyLogo}
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
    height: 50,
    width: 60
  }
})

export default SignIn