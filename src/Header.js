import React from 'react'
import { css } from 'glamor'
import { Link } from 'react-router-dom'
import UserContext from './UserContext'

class Header extends React.Component {
  static contextType = UserContext
  render() {
    const isAuthenticated = this.context.user && this.context.user.username ? true : false
    const isLoaded = this.context.isLoaded
    return (
      <div {...css(styles.container)}>
        <img
          style={styles.amplifyLogo}
          src={require('./assets/amplifywhite.png')}
        />
        <Link to='/' {...css(styles.link)}>
          <h2 {...css(styles.title)}>AWS Amplify Auth Starter</h2>
        </Link>
        <div {...css(styles.navContainer)}>
          <Link to='/' {...css(styles.link)}>
            <p {...css(styles.navItem)}>Home</p>
          </Link>
          <Link to='/private' {...css(styles.link)}>
            <p {...css(styles.navItem)}>Private</p>
          </Link>
          {
            isLoaded ? isAuthenticated ? (
              <Link to='/profile' {...css(styles.link)}>
                <p {...css(styles.navItem)}>Profile</p>
              </Link>
            ) : (
              <Link to='/auth' {...css(styles.link)}>
                <p {...css(styles.navItem)}>Sign In</p>
              </Link>
            ) : null
          }
        </div>
      </div>
    )
  }
}

const styles = {
  amplifyLogo: {
    height: 30,
    marginLeft: 25
  },
  title: {
    fontWeight: 300,
    color: 'white',
    margin: 0,
    textAlign: 'left',
    marginLeft: 10,
  },
  navContainer: {
    display: 'flex',
    flex: 1,
    paddingLeft: 50,
    marginTop: 6
  },
  link: {
    textDecoration: 'none',
  },
  navItem: {
    marginLeft: 20,
    color: 'white',
    paddingBottom: '4px',
    borderBottom: '2px solid transparent',
    ':hover': {
      borderBottom: '2px solid white'
    }
  },
  container: {
    height: '80px',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#FF9900',
    display: 'flex'
  }
}

export default Header
