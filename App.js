import 'react-native-gesture-handler'
import {YellowBox} from 'react-native'
import App from './src/App'
import { AppLoading } from 'expo'
import { useFonts } from '@use-expo/font';

import Amplify from 'aws-amplify'
import config from './aws-exports'

import 'react-native-gesture-handler'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'

YellowBox.ignoreWarnings(['Remote'])
Amplify.configure(config)

function AppWithNavigationContainer() {
  let [fontsLoaded] = useFonts({
    'SourceSansPro-Regular': require('./src/assets/fonts/SourceSansPro-Regular.ttf'),
    'SourceSansPro-SemiBold': require('./src/assets/fonts/SourceSansPro-SemiBold.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}

export default AppWithNavigationContainer