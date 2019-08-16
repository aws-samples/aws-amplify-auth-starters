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
import Home from './Home'
import Private from './Private.js'
import Profile from './Profile'

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

const NoMatch = ({ location }) => (
  <div>
    <h3>No match for <code>{location.pathname}</code></h3>
  </div>
)

PrivateRoute = withRouter(PrivateRoute)

const Routes = () => (
  <Router>
    <div>
      <Header />
      <Switch>
        <Route path='/auth' exact component={Authenticator} />
        <Route path='/' exact component={Home} />
        <PrivateRoute path='/private' exact component={Private} />
        <PrivateRoute path='/profile'  component={Profile} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
)

export default Routes
