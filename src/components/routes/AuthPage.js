import React, { Component } from "react";
import SignInForm from "../auth/SignInForm";
import SignUpForm from "../auth/SignUpForm";
import { Route, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signUp, moduleName } from "../../ducks/auth";

import Loading from '../Loading'

class AuthPage extends Component {
  handleSignUp = user => {
    this.props.signUp(user);
  };

  handleSignIn = values => {};

  render() {
    const { loading } = this.props;
    return (
      <div>
        <h1>Auth Page</h1>
        <nav>
          <NavLink to="/auth/signin" activeClassName="active">
            Sign In
          </NavLink>
          <NavLink to="/auth/signup" activeClassName="active">
            Sign Up
          </NavLink>
        </nav>
        <Route
          path="/auth/signin"
          render={() => <SignInForm onSubmit={this.handleSignIn} />}
        />
        <Route
          path="/auth/signup"
          render={() => <SignUpForm onSubmit={this.handleSignUp} />}
        />
        {loading && <Loading />}
      </div>
    );
  }
}

export default connect(
  state => ({
    loading: state[moduleName].loading
  }),
  { signUp }
)(AuthPage);
