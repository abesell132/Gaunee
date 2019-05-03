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
          <div className="dashboard-placeholder" />
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
            <div className="change-this-classname-later" />
            <div className="quick-facts-container">
              <div class="quick-facts">
                <div>asfasdf</div>
              </div>
              <div class="quick-facts">
                <div>asfasdf</div>
              </div>
              <div class="quick-facts">
                <div>asfasdf</div>
              </div>
              <div class="quick-facts">
                <div>asfasdf</div>
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
