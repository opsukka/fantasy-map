import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { PasswordForgetForm } from './PasswordForget';
import PasswordChangeForm from './PasswordChange';
import withAuthorization from './Session/withAuthorization';

const AccountPage = ({ authUser }) =>
  <div className="account-body">
    <div className="account-main">
      <h1>Account: {authUser.email}</h1>
      {/* <PasswordForgetForm /> */}
      <PasswordChangeForm />
    </div>
  </div>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

const authCondition = (authUser) => !!authUser;

export default compose(
  withAuthorization(authCondition),
  connect(mapStateToProps)
)(AccountPage);
