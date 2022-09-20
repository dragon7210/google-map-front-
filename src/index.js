import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "@material-tailwind/react";

axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
