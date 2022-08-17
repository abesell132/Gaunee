import React, { Component } from "react";
import UpcomingPaymentsListItem from "./UpcomingPaymentsListItem";

class UpcomingPayments extends Component {
  render() {
    return (
      <div class="box">
        <h3>Upcoming Charges</h3>
        <table>
          <thead>
            <tr>
              <th>Due</th>
              <th>Category</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <UpcomingPaymentsListItem />
          </tbody>
        </table>
      </div>
    );
  }
}

export default UpcomingPayments;
