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
              <QuickFact />
              <div class="quick-facts" id="repairs">
                <div className="icon-container">
                  <i class="fas fa-tools" />
                </div>
                <div className="text-container">
                  <div>
                    <h3>3</h3>
                    <p>Repairs Requested</p>
                  </div>
                </div>
              </div>
              <div class="quick-facts" id="tenants">
                <div className="icon-container">
                  <i class="fas fa-users" />
                </div>
                <div className="text-container">
                  <div>
                    <h3>14</h3>
                    <p>Tenants Serviced</p>
                  </div>
                </div>
              </div>
              <div class="quick-facts" id="units">
                <div className="icon-container">
                  <i class="fas fa-building" />
                </div>
                <div className="text-container">
                  <div>
                    <h3>7</h3>
                    <p>Units Managed</p>
                  </div>
                </div>
              </div>
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
