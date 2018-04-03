import React, { Component } from "react";
import AdminPage from "./routes/AdminPage";
import AuthPage from "./routes/AuthPage";
import EventsPage from "./routes/EventsPage";
import AddPersonPage from "./routes/AddPersonPage";
import ProtectedRoute from "./common/ProtectedRoute";
import { connect } from "react-redux";
import { moduleName, signOut } from "../ducks/auth";
import { Route, NavLink } from "react-router-dom";

class Root extends Component {
  render() {
    const { signOut, signIn } = this.props;

    const btn = signIn ? (
      <button onClick={signOut}> Sign out </button>
    ) : (
      <button> Sign In </button>
    );

    return (
      <div>
        <nav>
          <ul>
            <li>
              <NavLink to="/auth/signin" activeClassName="active">
                Sign In
              </NavLink>
            </li>
            <li>
              <NavLink to="/auth/signup" activeClassName="active">
                Sign Up
              </NavLink>
            </li>
            <li>
              <NavLink to="/people" activeClassName="active">
                ADD PERSON
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin" activeClassName="active">
                ADMIN
              </NavLink>
            </li>
          </ul>
        </nav>
        <Route path="/auth" component={AuthPage} />
        <Route path="/people" component={AddPersonPage} />
        <Route path="/events" component={EventsPage} />
        <Route path="/admin" component={AdminPage} />
        {/* <ProtectedRoute path="/people" component={AdminPage} /> */}
        {btn}
      </div>
    );
  }
}

export default connect(
  state => ({
    signIn: !!state[moduleName].user
  }),
  { signOut },
  null,
  { pure: false }
)(Root);
