import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { saveEventsToFB } from "./mocks";

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
