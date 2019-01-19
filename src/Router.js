import React from 'react'
import {
  withRouter,
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom'
import UserContext from './UserContext'
import Header from './Header'

import Authenticator from './Authenticator'
import {
  Home,
  Route1
} from './Home'

class PrivateRoute extends React.Component {
  state = {
    loaded: false,
    isAuthenticated: false
  }
  static contextType = UserContext
  componentDidMount() {
    this.unlisten = this.props.history.listen(() => {
      this.context.updateCurrentUser()
    })
  }
  componentWillUnmount() {
    this.unlisten()
  }
  render() {
    const { component: Component, ...rest } = this.props
    const isAuthenticated = this.context.user && this.context.user.username ? true : false
    const isLoaded = this.context.isLoaded
    if (!isLoaded) return null
    return (
      <Route
        {...rest}
        render={props => {
          return isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/auth",
              }}
            />
          )
        }}
      />
    )
  }
}

PrivateRoute = withRouter(PrivateRoute)

const Routes = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path='/auth' component={Authenticator} />
        <PrivateRoute path='/route1' component={Route1} />
        <PrivateRoute path='/' component={Home} />
      </Switch>
    </div>
  </Router>
)

export default Routes
