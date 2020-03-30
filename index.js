import 'react-native-gesture-handler';
import {AppRegistry, YellowBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import Amplify from 'aws-amplify'
import config from './aws-exports'

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

YellowBox.ignoreWarnings(['Remote'])
Amplify.configure(config)

function AppWithNavigationContainer() {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => AppWithNavigationContainer);
