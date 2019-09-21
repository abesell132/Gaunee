import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../../../common/TextFieldGroup";
import SelectListGroup from "../../../common/SelectListGroup";
import { states } from "../utils/states";
import { addProperty } from "../../../../redux/actions/propertyActions";

class SingleUnitForm extends Component {
  constructor() {
    super();
    this.state = {
      type: "Single-Unit",
      availability: "Availability",
      state: "State",
      propertyName: "",
      houseNumber: "",
      streetName: "",
      city: "",
      zipcode: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onStateSelect = this.onStateSelect.bind(this);
    this.onAvailabilitySelect = this.onAvailabilitySelect.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  onStateSelect(eventKey, event) {
    console.log(event.target.innerHTML);
    this.setState({
      state: event.target.innerHTML
    });
  }

  onAvailabilitySelect(eventKey, event) {
    console.log(event.target.innerHTML);
    this.setState({
      availability: event.target.innerHTML
    });
  }
  onFormSubmit(e) {
    e.preventDefault();
    let propertyData = {
      name: this.state.propertyName,
      type: this.state.type,
      houseNumber: this.state.houseNumber,
      streetName: this.state.streetName,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode
    };
    this.props.addProperty(propertyData);
    this.props.onSubmit();
  }

  render() {
    let unitAvailibilityOptions = [
      {
        label: "Available",
        value: "available"
      },
      {
        label: "Unvavailable",
        value: "unavailable"
      }
    ];

    return (
      <div className="single-unit-form">
        <form onSubmit={this.onFormSubmit}>
          <h3>Property Information</h3>
          <p>You will be able to change this information later.</p>

          <div className="flex flex-2">
            <TextFieldGroup
              type="text"
              placeholder="Property Name"
              name="propertyName"
              value={this.state.propertyName}
              onChange={this.onChange}
            />
            <SelectListGroup
              name={this.state.availability}
              placeholder="Availability"
              className=" state-dropdown-list unit-availability"
              options={unitAvailibilityOptions}
              value={this.state.availability}
              onSelect={this.onAvailabilitySelect}
            />
          </div>
          <div className="flex flex-3">
            <TextFieldGroup
              type="text"
              placeholder="House Number"
              name="houseNumber"
              value={this.state.houseNumber}
              onChange={this.onChange}
            />
            <TextFieldGroup
              type="text"
              placeholder="Street Name"
              name="streetName"
              value={this.state.streetName}
              onChange={this.onChange}
            />
            <TextFieldGroup
              type="text"
              placeholder="City"
              name="city"
              value={this.state.city}
              onChange={this.onChange}
            />
          </div>
          <div className="flex flex-2">
            <SelectListGroup
              name={this.state.state}
              className="state-dropdown-list"
              placeholder="State"
              options={states}
              value={this.state.state}
              onSelect={this.onStateSelect}
            />
            <TextFieldGroup
              type="text"
              placeholder="Zipcode"
              name="zipcode"
              value={this.state.zipcode}
              onChange={this.onChange}
            />
          </div>

          <div className="flex flex-3"></div>
          <button type="submit">Add Property</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  property: state.property,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addProperty }
)(withRouter(SingleUnitForm));
