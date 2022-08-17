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
      houseNumber: "",
      streetName: "",
      city: "",
      state: "State",
      zipcode: "",
      numUnits: "",

      // type: "Single-Unit",
      // availability: "Availability",
      // propertyName: "",
    };

    this.onChange = this.onChange.bind(this);
    this.onStateSelect = this.onStateSelect.bind(this);
    this.onAvailabilitySelect = this.onAvailabilitySelect.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onStateSelect(eventKey, event) {
    console.log(event.target.innerHTML);
    this.setState({
      state: event.target.innerHTML,
    });
  }

  onAvailabilitySelect(eventKey, event) {
    console.log(event.target.innerHTML);
    this.setState({
      availability: event.target.innerHTML,
    });
  }
  onFormSubmit(e) {
    e.preventDefault();
    let propertyData = {
      houseNumber: this.state.houseNumber,
      streetName: this.state.streetName,
      city: this.state.city,
      state: this.state.state,
      zipcode: this.state.zipcode,
      numUnits: this.state.numUnits,
    };
    this.props.addProperty(propertyData);
    this.props.onSubmit();
  }

  render() {
    let unitAvailibilityOptions = [
      {
        label: "Available",
        value: "available",
      },
      {
        label: "Unvavailable",
        value: "unavailable",
      },
    ];

    return (
      <div className="single-unit-form">
        <form onSubmit={this.onFormSubmit}>
          {/* <div className="flex flex-2">
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
          </div> */}
          <div className="flex flex-2">
            <TextFieldGroup
              type="text"
              label="House Number"
              placeholder="123"
              name="houseNumber"
              value={this.state.houseNumber}
              onChange={this.onChange}
            />
            <TextFieldGroup
              type="text"
              label={"Street Name"}
              placeholder="Sunset Avenue"
              name="streetName"
              value={this.state.streetName}
              onChange={this.onChange}
            />
          </div>
          <div className="flex flex-3">
            <TextFieldGroup type="text" label="City" name="city" placeholder="New York City" value={this.state.city} onChange={this.onChange} />
            <SelectListGroup
              name={this.state.state}
              className="state-dropdown-list"
              label="State"
              options={states}
              value={this.state.state}
              onSelect={this.onStateSelect}
            />
            <TextFieldGroup type="text" label="Zipcode" name="zipcode" placeholder="12345" value={this.state.zipcode} onChange={this.onChange} />
          </div>
          <div class="flex flex-3">
            <TextFieldGroup
              type="number"
              label="Number of Units"
              name="numUnits"
              placeholder="4"
              value={this.state.numUnits}
              onChange={this.onChange}
            />
          </div>
          {/* <br />
          <hr />

          <div className="flex flex-3">
            <TextFieldGroup type="text" label="Bedrooms" name="bedrooms" placeholder="2" value={this.state.bedrooms} onChange={this.onChange} />
            <TextFieldGroup type="text" label="Bathrooms" name="bathrooms" placeholder="2" value={this.state.bathrooms} onChange={this.onChange} />
          </div> */}
          <button type="submit">Add Property</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  property: state.property,
  errors: state.errors,
});

export default connect(mapStateToProps, { addProperty })(withRouter(SingleUnitForm));
