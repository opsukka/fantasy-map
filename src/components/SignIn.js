import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import { PasswordForgetLink } from './PasswordForget';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

const SignInPage = ({ history }) =>
  <div className="login-body">
    <h1>Welcome Back!</h1>
    <SignInForm history={history} />
    <SignUpLink />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.handleLoginKeyUp = this.keyUpHandler.bind(this, 'login');
    this.handlePwdKeyUp = this.keyUpHandler.bind(this, 'pwd');
  }

  keyUpHandler(refName, e) {
    if (refName === 'login') {
      var emailinpt = document.getElementById("singin-input");
      var emaillbl = document.getElementById("singin-label");

      emaillbl.classList.add("active");
      if (emailinpt.value === "") {
        emaillbl.classList.remove("active");
      }
    } if (refName === 'pwd') {
      var pwinput = document.getElementById("pw-input");
      var pwlbl = document.getElementById("pwd-label");

      pwlbl.classList.add("active");
      if  (pwinput.value === "") {
        pwlbl.classList.remove("active");
      }
    }
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      email,
      password,
      error,
    } = this.state;

    const isInvalid =
      password === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="field-wrap">
          <label id="singin-label" >Email Address</label>
          <input
            value={email}
            onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
            type="text"
            onKeyUp={this.handleLoginKeyUp}
            id="singin-input"
          />
        </div>
        <div className="field-wrap">
          <label id="pwd-label">Password</label>
          <input
            value={password}
            onChange={event => this.setState(updateByPropertyName('password', event.target.value))}
            type="password"
            onKeyUp={this.handlePwdKeyUp}
            id="pw-input"
          />
        </div>
        <PasswordForgetLink />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
