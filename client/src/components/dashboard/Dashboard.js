import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import Sidebar from "./Sidebar";
// import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profileActions";
import { connect } from "react-redux";

import("./sidebar.css");

class Dashboard extends Component {
  static defaultProps = {
    center: {
      lat: 46.499102,
      lng: -87.611803
    },
    zoom: 11
  };
  UNSAFE_componentWillMount() {
    this.props.getCurrentProfile();
  }
  UNSAFE_componentWillReceiveProps() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  render() {
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = <Sidebar />;
      } else {
        // User is logged in but has no profile
        this.props.history.push("/create-profile");
      }
    }

    return <div className="dashboard">{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
