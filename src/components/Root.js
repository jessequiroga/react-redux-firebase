import React, { Component } from "react";
import { Route } from "react-router-dom";
import AdminPage from "./routes/AdminPage";
import AuthPage from "./routes/AuthPage";
import AddPersonPage from "./routes/AddPersonPage";
import ProtectedRoute from "./common/ProtectedRoute";

class Root extends Component {
  render() {
    return (
      <div>
        <Route path="/auth" component={AuthPage} />
        <Route path="/people" component={AddPersonPage} />
        AddPersonPage<ProtectedRoute path="/admin" component={AdminPage} />
      </div>
    );
  }
}

export default Root;
