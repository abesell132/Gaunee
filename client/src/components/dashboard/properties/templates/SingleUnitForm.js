import React, { Component } from "react";
import TextFieldGroup from "../../../common/TextFieldGroup";
import SelectListGroup from "../../../common/SelectListGroup";
import { states } from "../utils/states";

class SingleUnitForm extends Component {
  constructor() {
    super();
    this.state = {
      propertyName: "",
      houseNumber: "",
      streetName: "",
      city: "",
      state: "State",
      availability: "Availability",
      zipcode: "",
      monthlyRent: "",
      numOfBaths: "",
      numofBeds: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onAvailabilitySelect = this.onAvailabilitySelect.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: [e.target.value]
    });
  }

  onSelect(eventKey, event) {
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
        <form>
          <h3>Property Information</h3>
          <p>You will be able to change this information later.</p>
          <TextFieldGroup
            type="text"
            placeholder="Property Name"
            name="propertyName"
            value={this.state.propertyName}
            onChange={this.onChange}
          />
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
              placeholder="Street Name "
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
              onSelect={this.onSelect}
            />
            <TextFieldGroup
              type="text"
              placeholder="Zipcode"
              name="zipcode"
              value={this.state.zipcode}
              onChange={this.onChange}
            />
          </div>
          <h4>Optional Information</h4>
          <p>
            This information can be beneficial to add, it is especially helpful
            when using addons.
          </p>
          <div className="flex flex-3">
            <SelectListGroup
              name="availability"
              placeholder="Availability"
              className=" state-dropdown-list unit-availability"
              options={unitAvailibilityOptions}
              value={this.state.availability}
              onSelect={this.onAvailabilitySelect}
            />
            <TextFieldGroup
              type="text"
              placeholder="Monthly Rent"
              name="monthlyRent"
              value={this.state.monthlyRent}
              onChange={this.onChange}
            />
            <TextFieldGroup
              type="text"
              placeholder="Square Footage"
              name="houseNumber"
              value={this.state.houseNumber}
              onChange={this.onChange}
            />
          </div>
          <div className="flex flex-3">
            <TextFieldGroup
              type="text"
              placeholder="Number of Baths"
              name="numOfBaths"
              value={this.state.numOfBaths}
              onChange={this.onChange}
            />
            <TextFieldGroup
              type="text"
              placeholder="Number of Beds"
              name="numOfBeds"
              value={this.state.streetName}
              onChange={this.onChange}
            />
            <TextFieldGroup
              type="text"
              placeholder="Number of Baths"
              name="numOfBaths"
              value={this.state.city}
              onChange={this.onChange}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default SingleUnitForm;
