import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { addPayment } from "../../../redux/actions/paymentActions";

class CashflowPopup extends Component {
  constructor(props) {
    super();

    this.state = {
      status: "paid",
      type: "expense",
      datePaid: "",
      scheduledDate: "",
      amount: 0,
      property: "",
      unit: "",
      category: "",
      description: "",
      notes: "",
    };
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  setCashflowType = (e) => {
    e.preventDefault();
    this.setState({ type: e.target.name });
  };
  handleCancel = (e) => {
    e.preventDefault();
    this.props.closeFnc();
  };
  onSubmit = (e) => {
    e.preventDefault();

    let data = {
      status: this.state.status,
      type: this.state.type,
      datePaid: this.state.datePaid,
      scheduledDate: this.state.scheduledDate,
      amount: this.state.amount,
      property: this.state.property,
      unit: this.state.unit,
      category: this.state.category,
      description: this.state.description,
      notes: this.state.notes,
    };

    const asArray = Object.entries(data);
    const filtered = asArray.filter(
      ([key, value]) => (typeof value === "string" && value.trim().length > 0) || (typeof value === "number" && value > 0)
    );
    const paymentData = Object.fromEntries(filtered);

    this.props.addPayment(paymentData, () => {
      this.props.closeFnc();
    });
  };

  render() {
    let properties, units;

    if (this.props.properties.properties.length > 0) {
      properties = this.props.properties.properties.map((property) => {
        return (
          <option value={property._id}>
            {property.houseNumber} {property.streetName}
          </option>
        );
      });

      if (this.state.property !== "") {
        let property = _.find(this.props.properties.properties, { _id: this.state.property });

        if (property.units)
          units = property.units.map((unit) => {
            return <option value={unit._id}>{unit.identifier}</option>;
          });
      }
    }

    return (
      <div class="cashflow-popup-content">
        <h3>New Item</h3>

        <form onSubmit={this.onSubmit}>
          <div className="form-fields">
            <div>
              <label>Cashflow Type</label>
              <div class="button-group">
                <button name="expense" className={this.state.type === "expense" ? "selected" : ""} onClick={this.setCashflowType}>
                  Expense
                </button>
                <button name="income" className={this.state.type === "income" ? "selected" : ""} onClick={this.setCashflowType}>
                  Income
                </button>
              </div>
            </div>

            <div>
              <label>Status</label>

              <select name="status" onChange={this.onChange}>
                <option value="paid">Paid</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>

            <div class="flex">
              <div className={this.state.status == "scheduled" ? "hidden" : ""}>
                <label>Date Paid</label>
                <input type="date" name="datePaid" value={this.state.datePaid} onChange={this.onChange} />
              </div>

              <div className={this.state.status == "scheduled" ? "" : "hidden"}>
                <label>Due Date</label>
                <input type="date" name="scheduledDate" value={this.state.scheduledDate} onChange={this.onChange} />
              </div>

              <div>
                <label>
                  Amount <span className={this.state.status == "scheduled" ? "hidden" : ""}>Paid</span>{" "}
                  <span className={this.state.status == "scheduled" ? "" : "hidden"}>Due</span>
                </label>
                <input type="number" name="amount" value={this.state.amount} onChange={this.onChange} />
              </div>
            </div>

            <div class="property-select">
              <div>
                <label>Property</label>
                <select name="property" onChange={this.onChange}>
                  <option value="">Shared Across Properties</option>
                  {properties}
                </select>
              </div>

              <div class={this.state.property === "" ? "hidden" : ""}>
                <label>Unit</label>
                <select name="unit" onChange={this.onChange}>
                  <option value="">All Units</option>
                  {units}
                </select>
              </div>
            </div>

            <div>
              <label>Category</label>
              <select name="category" onChange={this.onChange}>
                <option value="" defaultChecked>
                  Select Category
                </option>
                <option value="rent">Rent</option>
                <option value="security-deposit">Security Deposit</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label>Description</label>
              <input type="text" name="description" value={this.state.description} onChange={this.onChange} />
            </div>

            <div>
              <label>Notes</label>
              <textarea name="notes" value={this.state.notes} onChange={this.onChange} style={{ resize: "none" }} />
            </div>
          </div>

          <div className="form-footer">
            <button onClick={this.handleCancel}>Cancel</button>
            <button onClick={this.onSubmit}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    properties: state.properties,
  };
};

export default connect(mapStateToProps, { addPayment })(CashflowPopup);
