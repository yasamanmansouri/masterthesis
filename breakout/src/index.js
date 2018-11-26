import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/AppContainer.js";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { compose, applyMiddleware, createStore } from "redux";
import reducers from "./reducers/";
import { theme } from "./constants/Theme.js";
import registerServiceWorker, { unregister } from "./registerServiceWorker.js";

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function makeStore(initialState, middlewares) {
  let enhancer;
  if (!isProduction()) {
    enhancer = compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    );
  } else {
    enhancer = compose(applyMiddleware(...middlewares));
  }
  return createStore(reducers, initialState, enhancer);
}

const store = makeStore({}, [thunk]);

ReactDOM.render(
  <Provider store={store}>
    <App theme={theme} store={store} />
  </Provider>,
  document.getElementById("root")
);

// This produced a caching bug in dev mode (reload: prod, hard reload: dev)
if (isProduction()) {
  registerServiceWorker();
} else {
  unregister();
}
