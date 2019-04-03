import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

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
                <Link className="btn btn-lg mr-2 signup-button" to="/register">
                  Sign Up
                </Link>
                <Link className="btn btn-lg mr-2 signup-button" to="/login">
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps)(Landing);
