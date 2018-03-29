import React, { Component } from "react";
import { Route } from "react-router-dom";
import AdminPage from "./routes/AdminPage";
import AuthPage from "./routes/AuthPage";
import AddPersonPage from "./routes/AddPersonPage";
import ProtectedRoute from "./common/ProtectedRoute";
import {connect} from 'react-redux'
import {moduleName, signOut} from '../ducks/auth'

class Root extends Component {
  render() {
    const {signOut, signIn} = this.props;

    const btn = signIn ? <button onClick = {signOut}> Sign out </button> : <button> Sign In </button> 

    return (
      <div>
        <Route path="/auth" component={AuthPage} />
        <Route path="/people" component={AddPersonPage} />
        <ProtectedRoute path="/admin" component={AdminPage} />
        <ProtectedRoute path="/people" component={AdminPage} />
        {btn}
      </div>
    );
  }
}

export default connect(state => ({
  signIn: !!state[moduleName].user
}), {signOut}, null, {pure: false})(Root);
