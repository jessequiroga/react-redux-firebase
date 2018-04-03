import React, { Component } from "react";
import SignInForm from "../auth/SignInForm";
import SignUpForm from "../auth/SignUpForm";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { signUp, signIn, moduleName } from "../../ducks/auth";

import Loading from "../Loading";

class AuthPage extends Component {
  handleSignUp = user => {
    this.props.signUp(user);
  };

  handleSignIn = user => {
    this.props.signIn(user);
  };

  render() {
    const { loading } = this.props;
    return (
      <div>
        <h1>Auth Page</h1>

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
  { signUp, signIn }
)(AuthPage);
