import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import QRCode from 'qrcode.react'
import { css } from 'glamor'
import UserContext from './UserContext'

class Home extends React.Component {
  state = {
    qrCode: '',
    challengeAnswer: '',
    showPreferred: false
  }
  static contextType = UserContext

  addTTOP = () => {
    const { user } = this.context
    Auth.setupTOTP(user).then((code) => {
      const authCode = "otpauth://totp/AWSCognito:"+ user.username + "?secret=" + code + "&issuer=AWSCognito";
      this.setState({
        qrCode: authCode,
        showPreferred: true
      })
    });
  }
  setPreferredMFA = (authType) => {
    const { user } = this.context
    Auth.verifyTotpToken(user, this.state.challengeAnswer).then(() => {
      Auth.setPreferredMFA(user, authType)
        .then(data => console.log('data from verify...: ', data))
        .catch(err => console.log('error: ', err))
    });
  }
  render() {
    const username = this.context.user ? this.context.user.username : ''
    return (
      <div>
        <h1>Welcome {username}</h1>
        <Link to='/route1' label='route1'>Route 1</Link><br /><br /><br />
        <div {...css(styles.buttonContainer)}>
          <div
            {...css(styles.yellowButton)}
            onClick={this.addTTOP}
          >
            <p {...css(styles.buttonText)}>Update TOTP</p>
          </div>
          {
            (this.state.qrCode !== '') && (
              <div>
                <br />
                <QRCode value={this.state.qrCode} />
              </div>
            )
          }
          {
            this.state.showPreferred && (
              <div {...css(styles.buttonContainer)}>
                <button
                  onClick={() => this.setPreferredMFA('TOTP')}
                  {...css(styles.button)}
                >
                  <p>Prefer TOTP</p>
                </button>
                <button
                  onClick={() => this.setPreferredMFA('SMS')}
                  {...css(styles.button)}
                >
                  <p>Prefer SMS</p>
                </button>
                <input
                  placeholder='TOTP Code'
                  onChange={e => this.setState({ challengeAnswer: e.target.value })}
                  {...css(styles.input)}
                />
              </div>
            )
          }
        </div>
      </div>
    )
  }
}

class Route1 extends React.Component {
  render() {
    return (
      <div>
        <h1>Route 1</h1>
        <Link to='/' label='route1'>Back</Link><br /><br /><br />
        <div
          {...css(styles.yellowButton)}
          onClick={() => {
            Auth.signOut()
              .then(() => {
                this.props.history.push('/auth')
              })
              .catch(() => console.log('error signing out...'))
          }}
        >
          <p {...css(styles.buttonText)}>Sign Out</p>
        </div>
      </div>
    )
  }
}

const styles = {

  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  button: {
    cursor: 'pointer',
    margin: 4,
    border: '1px solid #ddd',
    width: 225,
    ':hover': {
      backgroundColor: "rgba(0, 0, 0, .1)"
    }
  },
  input: {
    padding: 8,
    height: 40,
    width: 225,
    border: '1px solid #ddd'
  },
  yellowButton: {
    padding: '10px 60px',
    backgroundColor: '#ffb102',
    marginTop: 10,
    width: 300,
    margin: '0 auto',
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
}

Home = withRouter(Home)
Route1 = withRouter(Route1)

export {
  Home,
  Route1
}