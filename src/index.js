import React from "react";
import ReactDom from "react-dom";
import reduxThunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

//blueprint files
import "bootstrap/dist/css/bootstrap.css";
import "normalize.css/normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/datetime/lib/css/blueprint-datetime.css";
import "@blueprintjs/table/lib/css/table.css";

import App from "./components/App";
import reducers from "./reducers";

ReactDom.render(
  <Provider store={createStore(reducers, applyMiddleware(reduxThunk))}>
    <App></App>
  </Provider>,
  document.querySelector("#root")
);
