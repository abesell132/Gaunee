import React, { Component } from "react";
import { updateActivePage } from "../../../actions/siteMetaActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FinanceChart from "./components/finances/FinancesChart";
import AddonsBox from "./components/addons/AddonsBox";
import MessageCenter from "./components/message-center/MessageCenterBox";
import RepairsBox from "./components/repairs/RepairsBox";
import PropertiesBox from "./components/properties/PropertiesBox";

import QuickFact from "./components/quick-facts/QuickFact";

import "./components/finances/finances.css";
import "./components/addons/addons.css";
import "./components/quick-facts/quickfacts.css";

class DashboardLanding extends Component {
  UNSAFE_componentWillMount() {
    this.props.updateActivePage("Dashboard");
  }
  render() {
    return (
      <div>
        <div className="heading-row">
          <h1>Dashboard</h1>
        </div>

        <div className="dashboard-content">
          <MessageCenter />
          <RepairsBox />
          <PropertiesBox />
          <div class="bottom-row-container">
            <FinanceChart />
            <AddonsBox />
            <div className="quick-facts-container">
              <QuickFact
                name="messages"
                icon="fas fa-inbox"
                number="2"
                text="Unread Messages"
              />
              <QuickFact
                name="repairs"
                icon="fas fa-tools"
                number="3"
                text="Repairs Requested"
              />
              <QuickFact
                name="tenants"
                icon="fas fa-users"
                number="14"
                text="Tenants Serviced"
              />
              <QuickFact
                name="units"
                icon="fas fa-building"
                number="7"
                text="Units Managed"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
DashboardLanding.propTypes = {
  updateActivePage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  siteMeta: state.siteMeta,
  properties: state.properties,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { updateActivePage }
)(DashboardLanding);
