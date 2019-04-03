import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser } from "./actions/authActions";
import { logUserOut } from "./actions/authActions";

import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import store from "./store";
// import Footer from "./components/layout/Footer";
import "./App.css";

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
require("bootstrap/dist/css/bootstrap.css");

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route path="/" component={Landing} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/register" component={Register} exact />
            {/* <Landing /> */}
            {/* <Footer /> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
