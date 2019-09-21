import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProperty } from "../../..//redux/actions/propertyActions";
import { updateActiveProperty } from "../../../redux/actions/siteMetaActions";

class SinglePropertyInformation extends Component {
  constructor(props) {
    super(props);

    this.deleteProperty = this.deleteProperty.bind(this);
  }

  deleteProperty(e) {
    e.preventDefault();
    let propertyID = {
      id: this.props.properties.properties[e.currentTarget.name]._id
    };
    console.log(propertyID);
    this.props.deleteProperty(propertyID);
    this.props.updateActiveProperty(0);
  }

  render() {
    let properties = this.props.properties.properties;
    let selectedProperty = this.props.siteMeta.activeProperty;
    let propertyName, propertyAddress1, city, state, zipcode, numOfUnits;
    let numOfCurrentTenants = 0;

    if (properties[selectedProperty]) {
      propertyName = properties[selectedProperty].name;
      propertyAddress1 = properties[selectedProperty].address1;
      city = properties[selectedProperty].city;
      state = properties[selectedProperty].state;
      zipcode = properties[selectedProperty].zipcode;
      numOfUnits = properties[selectedProperty].units.length;

      const units = Object.values(properties[selectedProperty].units);
      for (let unit of units) {
        let tenants = unit.tenants;
        console.log(tenants.length);
        numOfCurrentTenants += tenants.length;
      }
    }

    return (
      <div>
        <p className="section-title">
          {propertyName}
          <button
            className="btn delete-property-button"
            onClick={this.deleteProperty}
            name={selectedProperty}
          >
            Delete
          </button>
          <Link to="/dashboard/properties/add">
            <button className="btn edit-property-button">Edit</button>
          </Link>
        </p>
        <div className="padding-20">
          <div className="property-header">
            <div className="property-address-container">
              <h5 className="propertyAddress">{propertyAddress1}</h5>
              <h5 className="propertyAddress">
                {city}, {state} {zipcode}
              </h5>
            </div>
            <div className="numOfUnits-container">
              <h5 className="numOfUnits no-margin">
                {numOfUnits} Mangaged Unit{numOfUnits - 1 ? "s" : ""}
              </h5>
              <h5 className="numOfUnits no-margin">
                {numOfCurrentTenants} Active Tenant
                {numOfCurrentTenants - 1 ? "s" : ""}
              </h5>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  siteMeta: state.siteMeta,
  properties: state.properties,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteProperty, updateActiveProperty }
)(SinglePropertyInformation);
