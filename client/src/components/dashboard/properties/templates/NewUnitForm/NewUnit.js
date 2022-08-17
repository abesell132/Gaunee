import React, { Component } from "react";

class NewUnit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      identifier: "",
      monthlyRent: 0,
      securityDeposit: 0,
      availability: "available",
      beds: 0,
      baths: 0,
    };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let formData = {
      identifier: this.state.identifier,
      monthlyRent: this.state.monthlyRent,
      securityDeposit: this.state.securityDeposit,
      availability: this.state.availability,
      beds: this.state.beds,
      baths: this.state.baths,
    };

    this.props.onSubmit(formData);
  }
  render() {
    let availability = (
      <select name="availability" onChange={this.onChange}>
        <option value="">Select Availability</option>

        {this.state.availability === "available" ? (
          <option value="available" selected>
            Available
          </option>
        ) : (
          <option value="available">Available</option>
        )}

        {this.state.availability === "occupied" ? (
          <option value="occupied" selected>
            Occupied
          </option>
        ) : (
          <option value="occupied">Occupied</option>
        )}
      </select>
    );

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Unit identifier</label>
          <input type="text" name="identifier" value={this.state.identifier} onChange={this.onChange} />
        </div>
        <div>
          <label>Monthly Rent</label>
          <input type="number" name="monthlyRent" value={this.state.monthlyRent} onChange={this.onChange} />
        </div>
        <div>
          <label>Security Deposit</label>
          <input type="number" name="securityDeposit" value={this.state.securityDeposit} onChange={this.onChange} />
        </div>
        <div>
          <label>Availability</label>
          {availability}
        </div>
        <div>
          <label>Beds</label>
          <input type="number" name="beds" value={this.state.beds} onChange={this.onChange} />
        </div>
        <div>
          <label>Baths</label>
          <input type="number" name="baths" value={this.state.baths} onChange={this.onChange} />
        </div>
        <input type="submit" />
      </form>
    );
  }
}

export default NewUnit;
