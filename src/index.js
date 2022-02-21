import ReactDOM from "react-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import React from "react"
import App from "./App"
import "./styles/_base.scss";
import {Provider} from "react-redux"
import store from "./redux/store"
import {BrowserRouter} from "react-router-dom"
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById("root"))
