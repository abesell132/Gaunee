import React, { Component } from "react";
import { updateActivePage } from "../../actions/siteMetaActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import moment from "moment";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

let jan = new Date(Date.UTC(2019, 1));
let feb = new Date(Date.UTC(2019, 2));
let mar = new Date(Date.UTC(2019, 3));
let apr = new Date(Date.UTC(2019, 4));
let nov = new Date(Date.UTC(2018, 11));
var dec = new Date(Date.UTC(2018, 12));
const data = [
  {
    name: `${nov}`,
    Expenses: 3000,
    Profit: 1398
  },
  {
    name: `${dec}`,
    Expenses: 2000,
    Profit: 9800,
    label: "abe"
  },
  {
    name: `${jan}`,
    Expenses: 2780,
    Profit: 3908
  },
  {
    name: `${feb}`,
    Expenses: 1890,
    Profit: 4800
  },
  {
    name: `${mar}`,
    Expenses: 2390,
    Profit: 3800
  },
  {
    name: `${apr}`,
    Expenses: 3490,
    Profit: 4300
  }
];

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
          <div className="dashboard-placeholder">
            <div className="change-later">
              <p>
                <Link to="/dashboard/messages">Message Center</Link>
              </p>
            </div>
          </div>
          <div className="dashboard-placeholder">
            <div className="change-later">
              <p>
                <Link to="/dashboard/messages">Repairs</Link>
              </p>
            </div>
          </div>
          <div className="dashboard-placeholder">
            <div className="change-later">
              <p>
                <Link to="/dashboard/properties">Properties</Link>
              </p>
            </div>
          </div>
          <div class="bottom-row-container">
            <div className="expenses">
              <p>
                <Link to="/dashboard/finances">Finances</Link>
              </p>
              <div className="expenses-chart">
                <ResponsiveContainer>
                  <AreaChart
                    width={500}
                    height={"100%"}
                    data={data}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis
                      dataKey="name"
                      tickFormatter={unixTime => moment(unixTime).format("MMM")}
                      domain={[0, 3]}
                    />
                    <YAxis
                      tickFormatter={value =>
                        new Intl.NumberFormat("en-US", {
                          style: "currency",
                          maximumFractionDigits: 0,
                          minimumFractionDigits: 0,
                          currency: "USD"
                        }).format(value)
                      }
                    />
                    <Tooltip
                      formatter={value =>
                        new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD"
                        }).format(value)
                      }
                      labelFormatter={unixTime =>
                        moment(unixTime).format("MMMM - YYYY")
                      }
                    />
                    <Area
                      type="monotone"
                      dataKey="Expenses"
                      stackId="1"
                      stroke="#e74c3c"
                      fill="#e74c3c"
                      fillOpacity=".75"
                    />
                    <Area
                      type="monotone"
                      dataKey="Profit"
                      stackId="1"
                      stroke="#2ecc71"
                      fill="#2ecc71"
                      fillOpacity=".75"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="addons">
              <p>
                <Link to="/dashboard/addons">Addons</Link>
              </p>
              <div className="addons-content">
                <div>
                  <h4>
                    Enhance{" "}
                    <span class="navbar-brand no-padding vertical-align-top inherit-font-size">
                      Gaunee
                    </span>{" "}
                    with Add-ons
                  </h4>
                  <span>
                    Get even more out of your Gaunee subscription! Add features
                    such as traslation, in-app rent payments, SMS integration,
                    and more!
                  </span>
                  <div>
                    <Link to="/dashboard/addons">
                      <button class=" browse-addons-button">
                        Browse Add-ons
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="quick-facts-container">
              <div class="quick-facts" id="messages">
                <div className="icon-container">
                  <i class="fas fa-inbox" />
                </div>
                <div className="text-container">
                  <div>
                    <h3>2</h3>
                    <p>Unread Messages</p>
                  </div>
                </div>
              </div>
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
