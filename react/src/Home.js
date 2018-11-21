import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import QRCode from 'qrcode.react'
import { css } from 'glamor'

class Home extends React.Component {
  state = {
    username: '',
    user: {},
    qrCode: '',
    challengeAnswer: '',
    showPreferred: false
  }
  componentDidMount() {
    Auth.currentAuthenticatedUser().then(user => {
      console.log('user: ', user)
      this.setState({ user })
    })
    Auth.currentUserInfo()
      .then(data => {
        this.setState({
          username: data.username
        })
      })
      .catch(err => console.log('error: ', err))
  }
  addTTOP = () => {
    Auth.setupTOTP(this.state.user).then((code) => {
      const authCode = "otpauth://totp/AWSCognito:"+ this.state.user.username + "?secret=" + code + "&issuer=AWSCognito";
      this.setState({
        qrCode: authCode,
        showPreferred: true
      })
    });
  }
  setPreferredMFA = (authType) => {
    Auth.verifyTotpToken(this.state.user, this.state.challengeAnswer).then(() => {
      Auth.setPreferredMFA(this.state.user, authType)
        .then(data => console.log('data from verify...: ', data))
        .catch(err => console.log('error: ', err))
    });
  }
  render() {
    return (
      <div>
        <h1>Welcome {this.state.username}</h1>
        <Link to='/route1' label='route1'>Route 1</Link><br /><br /><br />
        <div {...css(styles.buttonContainer)}>
          <button
            onClick={this.addTTOP}
            {...css(styles.button)}
          >
            <p>Update TOTP</p>
          </button>
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
        <p onClick={() => {
          Auth.signOut()
            .then(() => {
              this.props.history.push('/auth')
            })
            .catch(() => console.log('error signing out...'))
        }}>Sign Out</p>
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
  }
}

Home = withRouter(Home)
Route1 = withRouter(Route1)

export {
  Home,
  Route1
}