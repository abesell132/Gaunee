import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import update from "react-addons-update";
import { addProperty, getProperties } from "../../actions/propertyActions";
import { states } from "./states";

import "./add-property.css";

class AddProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipcode: "",
      units: [],
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addUnit = this.addUnit.bind(this);
    this.onChangeOfRepeaterField = this.onChangeOfRepeaterField.bind(this);
    this.deleteUnit = this.deleteUnit.bind(this);
    this.addTenant = this.addTenant.bind(this);
    this.onChangeOfTenant = this.onChangeOfTenant.bind(this);
    this.deleteTenant = this.deleteTenant.bind(this);

    // this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  addUnit() {
    console.log("clicked");
    let newelement = {
      rent: "",
      baths: "",
      beds: "",
      squareFeet: "",
      name: "",
      tenants: []
    };
    this.setState(prevState => ({
      units: [...prevState.units, newelement]
    }));
  }

  addTenant(e) {
    e.preventDefault();
    let index = parseInt(e.currentTarget.name);
    let newTenant = {
      firstName: "",
      lastName: "",
      email: "",
      phone: ""
    };

    let tenants = this.state.units[index].tenants;
    tenants.push(newTenant);

    this.setState({
      units: update(this.state.units, {
        [index]: {
          tenants: {
            $set: tenants
          }
        }
      })
    });
  }

  deleteUnit(e) {
    e.preventDefault();
    const index = parseInt(e.currentTarget.name);
    if (index === 0) {
      console.log("shift");
      const filteredItems = this.state.units;
      filteredItems.shift();
      this.setState({
        units: filteredItems
      });
    } else {
      const filteredItems = this.state.units
        .slice(0, index)
        .concat(this.state.units.slice(index + 1, this.state.units.length));
      console.log(filteredItems);
      this.setState({
        units: filteredItems
      });
    }
  }

  deleteTenant(e) {
    e.preventDefault();
    var index = e.currentTarget.name.split("-");
    index[1] = parseInt(index[1]);
    index[0] = parseInt(index[0]);
    console.log(index[0]);
    console.log(index[1]);

    const filteredItems = this.state.units[index[0]].tenants
      .slice(0, index[1])
      .concat(
        this.state.units[index[0]].tenants.slice(
          index[1] + 1,
          this.state.units[index[0]].tenants.length
        )
      );
    console.log(filteredItems);
    this.setState({
      units: update(this.state.units, {
        [index[0]]: {
          tenants: {
            $set: filteredItems
          }
        }
      })
    });
  }

  onChangeOfRepeaterField(e) {
    var res = e.currentTarget.name.split("-");
    res[1] = parseInt(res[1]);

    if (res[0] === "rent") {
      if (this.state.units[res[1]].rent) {
        this.setState({
          units: update(this.state.units, {
            [res[1]]: {
              [res[0]]: {
                $set: e.target.value
              }
            }
          })
        });
      } else {
        this.setState({
          units: update(this.state.units, {
            [res[1]]: {
              [res[0]]: {
                $set: `$${e.target.value}`
              }
            }
          })
        });
      }
    } else {
      this.setState({
        units: update(this.state.units, {
          [res[1]]: {
            [res[0]]: {
              $set: e.target.value
            }
          }
        })
      });
    }
  }

  onChangeOfTenant(e) {
    var res = e.currentTarget.name.split("-");
    res[1] = parseInt(res[1]);
    res[2] = parseInt(res[2]);
    console.log(res[0]);
    console.log(res[1]);
    console.log(res[2]);

    this.setState({
      units: update(this.state.units, {
        [res[2]]: {
          tenants: {
            [res[1]]: {
              [res[0]]: {
                $set: e.target.value
              }
            }
          }
        }
      })
    });
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    this.setState(
      {
        errors: {}
      },
      () => {
        const propertyData = {
          address1: this.state.address1,
          address2: this.state.address2,
          city: this.state.city,
          state: this.state.state,
          zipcode: this.state.zipcode,
          units: this.state.units
        };
        this.setState(
          {
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipcode: "",
            units: []
          },
          () => {
            this.props.addProperty(propertyData);
            this.props.getProperties();
            this.props.getProperties();
            this.props.getProperties();
          }
        );
      }
    );

    e.preventDefault();
  }

  render() {
    let properties = this.state.units.map((unit, index) => (
      <div className="unit-container" key={index}>
        <h4>
          <span>General Information</span>
        </h4>
        <div className="row">
          <div className="col-sm-6">
            <TextFieldGroup
              type="text"
              label="Unit Name/Number"
              placeholder="127"
              name={`name-${index}`}
              value={this.state.units[index].name}
              onChange={this.onChangeOfRepeaterField}
            />
          </div>
          <div className="col-sm-6">
            <TextFieldGroup
              type="text"
              label="Rent"
              placeholder="$450"
              name={`rent-${index}`}
              value={this.state.units[index].rent}
              onChange={this.onChangeOfRepeaterField}
            />
          </div>
        </div>
        <hr />
        <h5>
          <span>Unit Information</span> <small>(optional)</small>
        </h5>
        <div className="row">
          <div className="col-sm-4">
            <TextFieldGroup
              type="number"
              label="# of Baths"
              placeholder="2"
              name={`baths-${index}`}
              value={this.state.units[index].baths}
              onChange={this.onChangeOfRepeaterField}
            />
          </div>
          <div className="col-sm-4">
            <TextFieldGroup
              type="number"
              label="# of Bedrooms"
              placeholder="3"
              name={`beds-${index}`}
              value={this.state.units[index].beds}
              onChange={this.onChangeOfRepeaterField}
            />
          </div>
          <div className="col-sm-4">
            <TextFieldGroup
              type="number"
              label="Square Feet"
              placeholder="2317"
              name={`squareFeet-${index}`}
              value={this.state.units[index].squareFeet}
              onChange={this.onChangeOfRepeaterField}
            />
          </div>
        </div>
        <hr />
        <div className="tenant-information">
          {this.state.units[index].tenants.map((tenant, tenantIndex) => (
            <div>
              <h6>
                Tenant {tenantIndex + 1} -{" "}
                <button
                  className="remove-tenant"
                  name={`${index}-${tenantIndex}`}
                  onClick={this.deleteTenant}
                >
                  Remove
                </button>
              </h6>
              <div className="row" key={tenantIndex}>
                <div className="col-sm-3">
                  <TextFieldGroup
                    type="text"
                    label="First Name"
                    placeholder="John"
                    name={`firstName-${tenantIndex}-${index}`}
                    value={
                      this.state.units[index].tenants[tenantIndex].firstName
                    }
                    onChange={this.onChangeOfTenant}
                  />
                </div>
                <div className="col-sm-3">
                  <TextFieldGroup
                    type="text"
                    label="Last Name"
                    placeholder="Doe"
                    name={`lastName-${tenantIndex}-${index}`}
                    value={
                      this.state.units[index].tenants[tenantIndex].lastName
                    }
                    onChange={this.onChangeOfTenant}
                  />
                </div>
                <div className="col-sm-3">
                  <TextFieldGroup
                    type="text"
                    label="Email Address"
                    placeholder="example@gmail.com"
                    name={`email-${tenantIndex}-${index}`}
                    value={this.state.units[index].tenants[tenantIndex].email}
                    onChange={this.onChangeOfTenant}
                  />
                </div>
                <div className="col-sm-3">
                  <TextFieldGroup
                    type="text"
                    label="Phone Number"
                    placeholder="920-418-2237"
                    name={`phone-${tenantIndex}-${index}`}
                    value={this.state.units[index].tenants[tenantIndex].phone}
                    onChange={this.onChangeOfTenant}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="button-container">
          <button
            className="btn add-tenant-btn"
            name={index}
            onClick={this.addTenant}
          >
            Add Tenant
          </button>
          <button
            className="btn btn-danger"
            name={index}
            onClick={this.deleteUnit}
          >
            Delete Unit
          </button>
        </div>
      </div>
    ));
    const { errors } = this.state;

    return (
      <div className="add-property">
        <div className="container">
          <div className="row">
            <div className="col-md-10 m-auto">
              <h1 className="display-4 text-center">Add Property</h1>
              <p className="text-center">
                <i>
                  You will be able to edit/add to this information at a later
                  time.
                </i>
              </p>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Address Line 1"
                  name="address1"
                  value={this.state.address1}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Address Line 2"
                  name="address2"
                  value={this.state.address2}
                  onChange={this.onChange}
                />
                <div className="row">
                  <div className="col-sm-4">
                    <TextFieldGroup
                      placeholder="City"
                      name="city"
                      value={this.state.city}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-sm-4">
                    <SelectListGroup
                      name="state"
                      value={this.state.state}
                      onChange={this.onChange}
                      options={states}
                      error={errors.status}
                    />
                  </div>
                  <div className="col-sm-4">
                    <TextFieldGroup
                      placeholder="Zipcode"
                      name="zipcode"
                      value={this.state.zipcode}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <div className="repeater-inputs">{properties}</div>
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={this.addUnit}
                    className="btn btn-light repeater-form-button"
                  >
                    Add Unit
                  </button>
                  <span className="text-muted">Optional</span>
                </div>

                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddProperty.propTypes = {
  profile: PropTypes.object.isRequired,
  addProperty: PropTypes.func.isRequired,
  getProperties: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addProperty, getProperties }
)(withRouter(AddProperty));
