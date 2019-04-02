import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Landing from "./components/layout/Landing";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
// import Footer from "./components/layout/Footer";
import "./App.css";
require("bootstrap/dist/css/bootstrap.css");

class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
