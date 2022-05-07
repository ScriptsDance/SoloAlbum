import React, { component } from 'react';

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };

    this.login = this.login.bind(this);
  }

  login () {

  }

  render () {
    return (
      <div>
        <span>
          <label>Username:</label>
          <input id="username" type="text">
          <label>Password:</label>
          <input id="password" type="password">
          <button type="button">submit</button>
          <button type="button" onclick="alert('Spotify Link')">Spotify</button>
        </span>
      </div>
    );
  }
}