import React from 'react';
import { Accounts } from 'meteor/accounts-base';

class Link extends React.Component {
  onLogout () {
      Accounts.logout();
  }

  render () {
    return (
      <div>
        <h1>Your links</h1>
        <button onClick={this.onLogout.bind(this)}>Logout</button>
      </div>
    );
  }
}

export default Link;
