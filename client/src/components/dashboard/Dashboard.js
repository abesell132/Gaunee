import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Messages from "./Messages";
import DashboardLanding from "./DashboardLanding";
// import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profileActions";
import { getProperties } from "../../actions/propertyActions";
import { connect } from "react-redux";

import("./sidebar.css");

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.updateDashboard = this.updateDashboard.bind(this);
  }
  UNSAFE_componentWillMount() {
    this.props.getCurrentProfile();
    this.props.getProperties();
  }
  UNSAFE_componentWillReceiveProps() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  updateDashboard() {}

  render() {
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = (
        <div>
          <Spinner />
        </div>
      );
    } else {
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div className="dashboard-wrapper">
            <Router>
              <Sidebar />
              <div className="content-container">
                <Route path="/dashboard/messages" component={Messages} exact />
                <Route path="/dashboard/" component={DashboardLanding} exact />
              </div>
            </Router>
          </div>
        );
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
  getProperties: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  properties: state.properties,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, getProperties }
)(Dashboard);
