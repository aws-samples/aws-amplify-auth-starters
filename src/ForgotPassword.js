import React from 'react'
import { css } from 'glamor'
import { Auth } from 'aws-amplify'
import UserContext from './UserContext'

class ForgotPassword extends React.Component {
  state = {
    username: '',
    confirmationCode: '',
    password: '',
    showConfirmation: false
  }
  static contextType = UserContext
  onChange = (key, value) => {
    this.props.updateErrorMessage(null)
    this.setState({
      [key]: value
    })
  }
  forgotPassword = () => {
    Auth.forgotPassword(this.state.username)
      .then(() => {
        this.setState({ showConfirmation: true })
      })
      .catch(err => console.log('error: ', err))
  }
  forgotPasswordSubmit = () => {
    const { username, password, confirmationCode } = this.state
    Auth.forgotPasswordSubmit(username, confirmationCode, password)
      .then(() => {
        alert('successfully changed password!')
        this.props.switchState('showSignIn')
      })
      .catch(err => console.log('error resetting password:', err))
  }
  render() {
    return (
      <div {...css(styles.container)}>
        {
          !this.state.showConfirmation && (
            <div {...css(styles.formContainer)}>
              <h2 {...css(styles.signInHeader)}>Forgot Password?</h2>
              <input
                onChange={evt => this.onChange('username', evt.target.value)}
                {...css(styles.input)}
                placeholder='username'
                
              />
              <div {...css(styles.button)} onClick={this.forgotPassword}>
                <p {...css(styles.buttonText)}>Get Authentication Code</p>
              </div>
            </div>
          )
        }
        {
          this.state.showConfirmation && (
            <div {...css(styles.formContainer)}>
              <input
                onChange={evt => this.onChange('confirmationCode', evt.target.value)}
                {...css(styles.input)}
                placeholder='Confirmation Code'
              />
              <input
                onChange={evt => this.onChange('password', evt.target.value)}
                {...css(styles.input)}
                type='password'
                placeholder='New Password'
              />
              <div {...css(styles.button)} onClick={this.forgotPasswordSubmit}>
                <p {...css(styles.buttonText)}>Reset Password</p>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

const styles = {
  signInHeader: {
    textAlign: 'left',
    margin: '0px 0px 20px'
  },
  button: {
    padding: '10px 60px',
    backgroundColor: '#ffb102',
    marginTop: 10,
    marginBottom: 10,
    cursor: 'pointer',
    borderRadius: '30px',
    ':hover': {
      backgroundColor: '#ffbb22'
    }
  },
  buttonText: {
    margin: 0,
    color: 'white'
  },
  input: {
    height: 40,
    marginBottom: '10px',
    border: 'none',
    outline: 'none',
    borderBottom: '2px solid #ffb102',
    fontSize: '16px',
    '::placeholder': {
      color: 'rgba(0, 0, 0, .3)'
    }
  },
  container: {
    flex: 1,
    paddingTop: '15px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  formContainer: {
    padding: 20,
    width: 400,
    display: 'flex',
    flexDirection: 'column',
    boxShadow: "0px 0px 2px rgba(0, 0, 0, .2)",
    borderRadius: 20
  }
}

export default ForgotPassword
