import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from './Session/withAuthorization';
import { db } from '../firebase';
import firebase from 'firebase';

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.userId = this.userId.bind(this);
  }

  componentDidMount() {
    const { onSetUsers } = this.props;
    const userId = firebase.auth().currentUser.uid;
    console.log(userId);

    db.onceGetUsers().then(snapshot =>
      onSetUsers(snapshot.val())
    );
  }

  render() {
    const { users } = this.props;
    return (
      <div className="admin-body">
        <div className="admin-content">
          <h1>Admin</h1>
          <p>The Home Page is accessible by every signed in user.</p>
        </div>
      </div>
    );
  }
}

const UserList = ({ users }) =>
  <div>
    <h2>List of Usernames of Users</h2>
    <p>(Saved on Sign Up in Firebase Database)</p>

    {Object.keys(users).map(key =>
      <div key={key}>{users[key].username}</div>
    )}
  </div>
  
const mapStateToProps = (state) => ({
  users: state.userState.users,
});

const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
});

const authCondition = (authUser) => !!authUser && firebase.database().ref().child(`users/`+ userId +`/role`) === "admin";

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps, mapDispatchToProps)  
)(AdminPage);
