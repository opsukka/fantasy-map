import React, { Component } from 'react';
import {
  Link,
  withRouter,
} from 'react-router-dom';

import { auth, db } from '../firebase';
import * as routes from '../constants/routes';

const SignUpPage = ({ history }) =>
  <div className="singup-body">
    <h1>Sign Up</h1>
    <SignUpForm history={history} />
  </div>

const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.handleNameKeyUp = this.keyUpHandler.bind(this, 'name');
    this.handleEmailKeyUp = this.keyUpHandler.bind(this, 'email');
    this.handlePwdKeyUp = this.keyUpHandler.bind(this, 'pwd');
    this.handlePwdCKeyUp = this.keyUpHandler.bind(this, 'pwdc');
  }

  onSubmit = (event) => {
    const {
      username,
      email,
      passwordOne,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {

        // Create a user in your own accessible Firebase Database too
        db.doCreateUser(authUser.uid, username, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch(error => {
            this.setState(updateByPropertyName('error', error));
          });

      })
      .catch(error => {
        this.setState(updateByPropertyName('error', error));
      });

    event.preventDefault();
  }

  keyUpHandler(refName, e) {
    if (refName === 'name') {
      var singinput = document.getElementById("name-input");
      var singinlbl = document.getElementById("name-label");

      singinlbl.classList.add("active");
      if (singinput.value === "") {
        singinlbl.classList.remove("active");
      }
    }
    if (refName === 'email') {
      var emailinput = document.getElementById("email-input");
      var emaillbl = document.getElementById("email-label");

      emaillbl.classList.add("active");
      if (emailinput.value === "") {
        emaillbl.classList.remove("active");
      }
    }
    if (refName === 'pwd') {
      var pwinput = document.getElementById("pw-input");
      var pwlbl = document.getElementById("pwd-label");

      pwlbl.classList.add("active");
      if  (pwinput.value === "") {
        pwlbl.classList.remove("active");
      }
    }
    if (refName === 'pwdc') {
      var pwcinput = document.getElementById("pwc-input");
      var pwclbl = document.getElementById("pwdc-label");

      pwclbl.classList.add("active");
      if  (pwcinput.value === "") {
        pwclbl.classList.remove("active");
      }
    }
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      username === '' ||
      email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <div className="field-wrap">
        <label id="name-label">Full Name</label>
        <input
          value={username}
          onChange={event => this.setState(updateByPropertyName('username', event.target.value))}
          type="text"
          onKeyUp={this.handleNameKeyUp}
          id="name-input"
        />
        </div>
        <div className="field-wrap">
          <label id="email-label">Email Address</label>
          <input
            value={email}
            onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
            type="text"
            onKeyUp={this.handleEmailKeyUp}
            id="email-input"
          />
        </div>
        <div className="field-wrap">
          <label id="pwd-label">Password</label>
          <input
            value={passwordOne}
            onChange={event => this.setState(updateByPropertyName('passwordOne', event.target.value))}
            type="password"
            onKeyUp={this.handlePwdKeyUp}
            id="pw-input"
          />
        </div>
        <div className="field-wrap">
          <label id="pwdc-label">Confirm Password</label>
          <input
            value={passwordTwo}
            onChange={event => this.setState(updateByPropertyName('passwordTwo', event.target.value))}
            type="password"
            onKeyUp={this.handlePwdCKeyUp}
            id="pwc-input"
          />
        </div>
        <button disabled={isInvalid} type="submit">
          Sign Up
        </button>

        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

const SignUpLink = () =>
  <p className="no-account">
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
