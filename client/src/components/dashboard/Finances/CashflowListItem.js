import React, { Component } from "react";
import { connect } from "react-redux";
import { deletePayment } from "../../../redux/actions/paymentActions";
import _ from "lodash";

class CashflowListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.toggleDescription = this.toggleDescription.bind(this);
  }

  toggleDescription() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  deletePayment = () => this.props.deletePayment(this.props.payment._id);

  render() {
    let properties = this.props.properties.properties;
    let payment = this.props.payment;

    let category = payment.category ? payment.category.replace(/-/g, " ") : "";
    let notes = payment.notes ? payment.notes : "";
    let date = payment.datePaid ? formatDate(payment.datePaid) : formatDate(payment.scheduledDate);

    let property = properties ? _.find(properties, { _id: payment.property }) : "";
    let propertyLabel = property ? property.houseNumber + " " + property.streetName : "Shared Across Properties";

    return (
      <>
        <tr onClick={this.toggleDescription}>
          <td>{date}</td>
          <td>
            <strong>{category}</strong>
            <br />
            {payment.description}
          </td>
          <td>{propertyLabel}</td>
          <td>${parseDollarsAndCents(payment.amount)}</td>
          <td>
            <span className={this.state.isOpen ? "hidden" : ""}>
              <i class="fas fa-angle-down"></i>
            </span>
            <span className={this.state.isOpen ? "" : "hidden"}>
              <i class="fas fa-angle-up"></i>
            </span>
          </td>
        </tr>

        <tr class={`description ${this.state.isOpen ? "" : "hidden"}`}>
          <td colSpan={5}>
            <div class="flex">
              <div>
                <label>Notes</label>
                <div>{notes}</div>
              </div>

              <div>
                <label>Documents &amp; Receipts</label>
                <div>None Added</div>
              </div>

              <div class="actions">
                <i class="fas fa-pen"></i>
                <i class="fas fa-trash-alt" onClick={this.deletePayment}></i>
              </div>
            </div>
          </td>
        </tr>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    properties: state.properties,
  };
};

export default connect(mapStateToProps, { deletePayment })(CashflowListItem);

const formatDate = (date) => {
  let d = new Date(date);
  if (!d.getTime()) return "";

  let month = d.toLocaleString("default", { month: "short" });
  let day = d.getDate().toString().padStart(2, "0");
  let year = d.getFullYear();
  return [month, day + ",", year].join(" ");
};

function parseDollarsAndCents(amount) {
  let dollars = Math.floor(amount);
  let cents = Math.round((amount - dollars) * 100);
  return `${dollars.toFixed(0)}.${cents.toString().padStart(2, "0")}`;
}
