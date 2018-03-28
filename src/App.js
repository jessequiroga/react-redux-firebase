import React, { Component } from "react";
import Root from "./components/Root";
import store from "./redux";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import history from "./history";

console.log(ConnectedRouter);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Root />
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
