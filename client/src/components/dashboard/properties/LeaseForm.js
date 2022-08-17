import React, { Component } from "react";

class LeaseForm extends Component {
  constructor() {
    super();
    this.state = {
      leaseName: "",
      leaseStart: "",
      monthToMonth: false,
      leaseEnd: "",
      leaseRate: "",
      leaseDeposit: "",
    };
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleMonthToMonth = this.toggleMonthToMonth.bind(this);
    this.deleteLease = this.deleteLease.bind(this);
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    if (this.props.lease) {
      this.setState({
        leaseName: this.props.lease.leaseName,
        leaseStart: this.props.lease.leaseStart,
        monthToMonth: this.props.lease.monthToMonth,
        leaseEnd: this.props.lease.leaseEnd,
        leaseRate: this.props.lease.leaseRate,
        leaseDeposit: this.props.lease.leaseDeposit,
      });
    }
  }

  toggleMonthToMonth() {
    this.setState({ monthToMonth: !this.state.monthToMonth });
  }

  handleSubmit(e) {
    e.preventDefault();
    let state = { ...this.state };
    state.leaseID = this.props.lease ? this.props.lease._id : "";
    this.props.onSubmit(state);
  }

  deleteLease(e) {
    e.preventDefault();
    this.props.onDelete(this.props.lease._id);
  }

  render() {
    let formTitle = this.props.lease ? "Edit Lease" : "Add Lease";
    return (
      <form className="new-lease" onSubmit={this.handleSubmit}>
        <h3>{formTitle}</h3>
        <div>
          <label>Lease Name</label>
          <input type="text" name="leaseName" onChange={this.onChange} value={this.state.leaseName} />
        </div>

        <div class="flex">
          <div>
            <label>Lease Start</label>
            <input type="date" name="leaseStart" onChange={this.onChange} value={formatDate(this.state.leaseStart)} />
          </div>
          <div>
            <label>Lease End</label>
            <input
              type="date"
              name="leaseEnd"
              onChange={this.onChange}
              value={
                new Date(this.state.leaseEnd).getFullYear() +
                "-" +
                new Date(this.state.leaseEnd).getMonth() +
                "-" +
                new Date(this.state.leaseEnd).getDate()
              }
              disabled={this.state.monthToMonth}
            />
          </div>
        </div>
        <div onClick={this.toggleMonthToMonth}>
          <input type="checkbox" name="monthToMonth" checked={this.state.monthToMonth} />
          <label for="checkbox">Month to Month</label>
        </div>
        <div class="flex">
          <div>
            <label>Lease Rate</label>
            <input type="number" name="leaseRate" onChange={this.onChange} value={this.state.leaseRate} />
          </div>
          <div>
            <label>Lease Deposit</label>
            <input type="number" name="leaseDeposit" onChange={this.onChange} value={this.state.leaseDeposit} />
          </div>
        </div>
        <div>
          <input type="submit" />
          <span className={`delete-lease ${this.props.lease ? "" : "hidden"}`} onClick={this.deleteLease}>
            Delete Lease
          </span>
        </div>
      </form>
    );
  }
}

export default LeaseForm;

const formatDate = (date) => {
  let d = new Date(date);
  let month = (d.getMonth() + 1).toString().padStart(2, "0");
  let day = d.getDate().toString().padStart(2, "0");
  let year = d.getFullYear();
  return [year, month, day].join("-");
};
