import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Messages from "./Messages/Messages";
import Settings from "./Settings/Settings";
import Finances from "./Finances/Finances";
import Properties from "./properties/Properties";
import Addons from "./Addons/Addons";
import AddProperty from "./properties/AddProperty";
import DashboardLanding from "./Dashboard/DashboardLanding";

import { updateActivePage } from "../../redux/actions/siteMetaActions";
import { getCurrentProfile } from "../../redux/actions/profileActions";
import { getAllProperties } from "../../redux/actions/propertyActions";
import { connect } from "react-redux";

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.updateDashboard = this.updateDashboard.bind(this);
  }
  UNSAFE_componentWillMount() {
    this.props.getCurrentProfile();
    this.props.getAllProperties();
  }
  UNSAFE_componentWillReceiveProps() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  updateDashboard() {}

  render() {
    const { loading } = this.props.profile;

    let dashboardContent;

    if (loading) {
      dashboardContent = (
        <div>
          <Spinner />
        </div>
      );
    } else {
      dashboardContent = (
        <div className="dashboard-wrapper">
          <Router>
            <Sidebar history={this.props.history} />
            <div className="content-container">
              <Route path="/dashboard/" component={DashboardLanding} exact />
              <Route path="/dashboard/messages" component={Messages} exact />
              <Route path="/dashboard/settings" component={Settings} exact />
              <Route path="/dashboard/finances" component={Finances} exact />
              <Route
                path="/dashboard/properties"
                component={Properties}
                exact
              />
              <Route path="/dashboard/addons" component={Addons} exact />
              <Route
                path="/dashboard/properties/add"
                component={AddProperty}
                exact
              />
            </div>
          </Router>
        </div>
      );
    }

    return <div className="dashboard">{dashboardContent}</div>;
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  updateActivePage: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  properties: state.properties,
  auth: state.auth,
  siteMeta: state.siteMata
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, updateActivePage, getAllProperties }
)(Dashboard);
