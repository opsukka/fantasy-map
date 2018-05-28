import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  render() {
    return(
      <div className="login-container">
        <div className="form">
          <form className="register-form">
            <input type="text" placeholder="name"></input>
            <input type="password" placeholder="password"></input>
            <input type="text" placeholder="email adress"></input>
            <button className="register-button">create</button>
            <p className="message">Already registered? <a href="#"></a></p>
          </form>
          <form className="login-form">
            <input type="text" placeholder="name"></input>
            <input type="password" placeholder="password"></input>
            <button className="login-button"></button>
            <p className="message">Not registered? <a href="#">Create an account
            </a></p>
          </form>
        </div>
      </div>
    )
  }
}
