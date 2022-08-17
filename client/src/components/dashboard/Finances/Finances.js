import React, { Component } from "react";
import { Link } from "react-router-dom";
import { updateActivePage } from "../../../redux/actions/siteMetaActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Finances.css";

import FinancesChart from "../Dashboard/components/finances/FinancesChart";

import CashflowList from "./CashflowList";
import CashflowPopup from "./CashflowPopup";
import UpcomingPayments from "./UpcomingPayments/UpcomingPayments";

class Finances extends Component {
  constructor() {
    super();

    this.state = {
      popupIsOpen: false,
    };
  }

  componentDidMount() {
    this.props.updateActivePage("Finances");
  }

  togglePopup = () => this.setState({ popupIsOpen: !this.state.popupIsOpen });

  render() {
    return (
      <div id="finances">
        <div className="heading-row">
          <h1>
            <Link to="/dashboard">Dashboard</Link> <small>&gt;</small> <strong>Finances</strong>
          </h1>
        </div>
        <div className="dashboard-content">
          <div class="cashflow">
            <div class="graph">
              <FinancesChart />
            </div>

            <div class="cashflow-header flex">
              <h3>Cashflow</h3>
              <button onClick={this.togglePopup}>Add New</button>
            </div>

            <div class="cashflow-body">
              <CashflowList />

              <div class="flex body-row">
                <div></div>
                <div>
                  <UpcomingPayments />
                </div>
              </div>
            </div>

            <div class={`cashflow-popup ${this.state.popupIsOpen ? "" : "hidden"}`}>
              <CashflowPopup closeFnc={this.togglePopup} />
            </div>

            {/* 
            <div class="items">
              <div class="item-date">July 2022</div>
              <div class="item expense">
                <div class="head">
                  <div class="name">Refrigerator</div>
                  <div class="amount">$350</div>
                </div>
                <div class="content">
                  <h3>Edit Transaction</h3>
                  <form>
                    <div class="form-fields">
                      <div class="name">
                        <label>Name </label>
                        <input type="text" value={"Refrigerator"} />
                      </div>
                      <div>
                        <label>Amount</label>
                        <input type="text" value={"$350"} />
                      </div>
                      <div class="checkboxes">
                        <div>Type</div>
                        <input type="radio" name="age" value="expense" checked />
                        <label for="age1">Expense</label>
                        <input type="radio" name="age" value="income" />
                        <label for="age2">Income</label>
                      </div>
                    </div>

                    <div class="form-footer">
                      <button>Save</button>
                      <button class="delete">Delete</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>*/}
          </div>
        </div>
      </div>
    );
  }
}

Finances.propTypes = {
  updateActivePage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  siteMeta: state.siteMeta,
  properties: state.properties,
  auth: state.auth,
});

export default connect(mapStateToProps, { updateActivePage })(Finances);
