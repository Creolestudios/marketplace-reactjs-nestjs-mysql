import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/store";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import AppProvider from "./AppProvider";

ReactDOM.render(
  <Provider store={store}>
    <AppProvider>
      <App />
    </AppProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
