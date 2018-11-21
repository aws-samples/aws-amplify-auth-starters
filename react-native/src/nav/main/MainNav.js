import Home from './Home'
import Route2 from './Route2'

import { createStackNavigator } from 'react-navigation'

const MainNav = createStackNavigator({
  Home: {
    screen: Home
  },
  Route2: {
    screen: Route2
  }
})

export default MainNav