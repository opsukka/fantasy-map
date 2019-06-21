import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignOutButton from './SignOut';
import * as routes from '../constants/routes';

const Navigation = ({ authUser }) =>
  <div className="navigation-main">
    { authUser
        ? <NavigationAuth />
        : <NavigationNonAuth />
    }
  </div>

const NavigationAuth = () =>
  <ul className="nav-button">
    <li className="nav-item"><Link to={routes.LANDING}>Landing</Link></li>
    <li className="nav-item"><Link to={routes.HOME}>Home</Link></li>
    <li className="nav-item"><Link to={routes.ACCOUNT}>Account</Link></li>
    <li className="nav-item"><Link to={routes.MAP1}>Valcia map</Link></li>
    <li className="nav-item"><Link to={routes.ADMINPAGE}>Admin</Link></li>
    <li className="nav-item"><SignOutButton /></li>
  </ul>

const NavigationNonAuth = () =>
  <ul className="nav-button">
    <li className="nav-item"><Link to={routes.LANDING}>Info</Link></li>
    {/* <li className="nav-item"><Link to={routes.SIGN_IN}>Sign In</Link></li> */}
    <li className="nav-item"><Link to={routes.MAP1}>Valcia map</Link></li>
  </ul>

const mapStateToProps = (state) => ({
  authUser: state.sessionState.authUser,
});

export default connect(mapStateToProps)(Navigation);
