import React, { Component } from "react";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className=" text-dark welcome-box">
          <div className="welcome-container">
            <div className="row">
              <div className="col-md-12 text-center gaunee-logo">
                <div className="display-3 mb-2 container">
                  <img
                    src={require("../../img/gaunee-logo.png")}
                    alt={"Gaunee Logo"}
                  />
                </div>
                <p className="lead"> Advertise, Rent, Manage Apartments</p>
                <hr />
                <a href="/register" className="btn btn-lg mr-2 signup-button">
                  Sign Up
                </a>
                <a href="/login" className="btn btn-lg login-logo">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
