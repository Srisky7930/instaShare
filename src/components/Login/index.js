import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({
      errorMsg,
      showErrorMsg: true,
    })
  }

  onLoginSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const loginApiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginApiUrl, options)
    const data = await response.json()
    console.log(response)
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else if (response.status === 400) {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserInput = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  renderLoginImage = () => (
    <div className="login-image-container">
      <img
        src="https://res.cloudinary.com/dfqkajd1a/image/upload/v1672733227/Layer_2_1x_srnok2.png"
        alt="website login"
        className="login-image"
      />
    </div>
  )

  renderLoginForm = () => {
    const {username, password, errorMsg, showErrorMsg} = this.state
    return (
      <div className="login-form-container">
        <div className="insta-logo-container">
          <img
            src="https://res.cloudinary.com/dfqkajd1a/image/upload/v1672733292/Standard_Collection_8_hkeehs.png"
            alt="website logo"
          />
          <h1> Insta Share </h1>
        </div>
        <form onSubmit={this.onLoginSubmitForm}>
          <div className="username-input-label-container">
            <label htmlFor="username" className="username-label">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="username-input"
              value={username}
              placeholder="USERNAME"
              onChange={this.onChangeUserInput}
            />
          </div>

          <div className="password-input-label-container">
            <label htmlFor="password" className="password-label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="password-input"
              value={password}
              placeholder="PASSWORD"
              onChange={this.onChangePassword}
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showErrorMsg && <p className="errorMsg"> {errorMsg} </p>}
        </form>
      </div>
    )
  }

  render() {
    return (
      <div className="login-page-container">
        {this.renderLoginImage()}
        {this.renderLoginForm()}
      </div>
    )
  }
}

export default Login
