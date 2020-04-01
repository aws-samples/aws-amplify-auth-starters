import React from 'react'

import Home from './Home'
import Route2 from './Route2'

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator()

function MainNav(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home">
        { screenProps => <Home {...screenProps} updateAuth={props.updateAuth} />}
      </Stack.Screen>
      <Stack.Screen name="Route2">
        { screenProps => <Route2 {...screenProps} updateAuth={props.updateAuth} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default MainNav