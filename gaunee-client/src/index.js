// React
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import jwt_decode from "jwt-decode";

// Redux
import { Provider } from "react-redux";
import configureStore from "./redux/store/store";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser } from "./redux/actions/authActions";
import { logUserOut } from "./redux/actions/authActions";

// Assets
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/sass/light-bootstrap-dashboard-react.scss?v=1.3.0";
import "./assets/css/index.css";
import "./assets/css/pe-icon-7-stroke.css";

// Layouts
import AdminLayout from "layouts/Admin.jsx";
import AuthLayout from "layouts/Authentication";

const store = configureStore();

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set User and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logUserOut());
    window.location.href = "/login";
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/admin" render={props => <AdminLayout {...props} />} />
        <Route path="/login" render={props => <AuthLayout {...props} />} />
        <Route path="/register" render={props => <AuthLayout {...props} />} />
        <Redirect from="/" to="/login" />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
