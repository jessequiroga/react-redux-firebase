import React, { Component } from "react";
import SignInForm from "../auth/SignInForm";
import SignUpForm from "../auth/SignUpForm";
import { Route, NavLink } from "react-router-dom";

class AuthPage extends Component {
  handleSignUp = values => {};

  handleSignIn = values => {};
  
  render() {
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
      </div>
    );
  }
}

export default AuthPage;
