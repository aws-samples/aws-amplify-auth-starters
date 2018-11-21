import React from 'react'
import { css } from 'glamor'
import { withRouter } from 'react-router-dom'

import SignIn from './SignIn'
import SignUp from './SignUp'

class Authenticator extends React.Component {
  state = {
    showSignIn: true
  }
  switchState = (showSignIn) => {
    this.setState({
      showSignIn
    })
  }
  render() {
    const { showSignIn } = this.state
    return (
      <div style={styles.container}>
        {
          showSignIn ? (
            <SignIn />
          ) : (
            <SignUp />
          )
        }
        <div {...css(styles.buttonContainer)}>
          {
            showSignIn ? (
              <p
            onClick={() => this.switchState(false)}
            {...css(styles.toggle)}
          >Need an account? Sign Up</p>
            ) : (
              <p
            {...css(styles.toggle)}
            onClick={() => this.switchState(true)}
          >Already have an account? Sign In</p>
            )
          }
          
        </div>
      </div>
    )
  }
}

export default withRouter(Authenticator)

const styles = {
  container: {
    marginTop: 50
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  toggle: {
    paddingBottom: '10px',
    cursor: 'pointer',
    marginTop: 25,
    borderBottom: '2px solid transparent',
    ':hover': {
      opacity: 0.6
    }
  }
}