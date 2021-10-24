import React from 'react'
import { css } from 'glamor'

import SignIn from './SignIn'
import SignUp from './SignUp'
import ForgotPassword from './ForgotPassword'

class Authenticator extends React.Component {
  state = {
    errorMessage: null,
    currentState: 'showSignIn'
  }
  switchState = currentState => {
    this.setState({
      currentState
    })
  }
  updateErrorMessage = errorMessage => {
    this.setState({ errorMessage })
  }
  render() {
    const { currentState } = this.state
    return (
      <div style={styles.container}>
        { currentState === 'showSignIn'  && <SignIn {...this.props} updateErrorMessage={this.updateErrorMessage} />  }
        { currentState === 'showSignUp' && <SignUp {...this.props} updateErrorMessage={this.updateErrorMessage} switchState={this.switchState} /> }
        { currentState === 'showForgotPassword' && <ForgotPassword switchState={this.switchState} {...this.props} updateErrorMessage={this.updateErrorMessage} /> }
        <div {...css(styles.buttonContainer)}>
          {
            currentState === 'showSignIn' ? (
              <div {...css(styles.linkContainer)}>
                <p
                  onClick={() => this.switchState('showSignUp')}
                  {...css(styles.toggle)}
                >新規登録</p>
                <p
                  onClick={() => this.switchState('showForgotPassword')}
                  {...css(styles.toggle)}
                >パスワードをお忘れですか？</p>
              </div>
                ) : (
              <div {...css(styles.linkContainer)}>
                <p
                  {...css(styles.toggle)}
                  onClick={() => this.switchState('showSignIn')}
                >すでにアカウントをお持ちの方はこちら</p>
              </div>
            )
          }
        </div>
        {
          this.state.errorMessage && (
            <div>
              <p>{this.state.errorMessage}</p>
            </div>
          )
        }
      </div>
    )
  }
}

export default Authenticator

const styles = {
  linkContainer: {
    marginTop: 30
  },
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
    marginTop: 10,
    marginBottom: 0,
    // marginBottom: 0,
    borderBottom: '2px solid transparent',
    ':hover': {
      opacity: 0.6
    }
  }
}