import React, { Component } from "react";
import { connect } from "react-redux";

import CashflowListItem from "./CashflowListItem";

class CashflowList extends Component {
  render() {
    let cashflowList = <div></div>;

    if (this.props.payments.list.length > 0) {
      cashflowList = this.props.payments.list.map((payment) => {
        return <CashflowListItem key={payment.id} payment={payment} />;
      });
    }

    return (
      <div class="box">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Property</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>{cashflowList}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  payments: state.payments,
});

export default connect(mapStateToProps, {})(CashflowList);
