import React, { Component } from "react";
import { Link } from "react-router-dom";
import { updateActivePage, updateActiveProperty } from "../../../redux/actions/siteMetaActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SinglePropertyInformation from "./SinglePropertyInformation";
import missingApartment from "../../../img/missing-apartment.png";

import PropertyListElement from "./templates/PropertyListElement";

import "./properties.css";

class Properties extends Component {
  constructor() {
    super();
    this.state = {
      selectedProperty: "",
    };
  }

  componentDidMount() {
    this.props.updateActivePage("Properties");
  }

  render() {
    let propertiesContent;

    let properties = Object.values(this.props.properties.properties).map((property, index) => (
      <PropertyListElement data={property} dataIndex={index} />
    ));

    if (this.props.properties.properties[0]) {
      propertiesContent = (
        <div className="dashboard-content">
          <button>Add New Property</button>
          <div class="container">{properties}</div>
        </div>
      );
    } else {
      propertiesContent = (
        <div className="dashboard-content">
          <div className="no-apartment-container">
            <div>
              <img src={missingApartment} className="mw-200" alt="No Properties Decoration" />
              <p className="fs-18">Looks like you don't have any properties!</p>
              <Link to="/dashboard/properties/add">
                <button className="btn add-property-button" style={{ float: "none", fontSize: "18px" }}>
                  Add Property
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="properties">
        <div className="heading-row">
          <h1>
            <Link to="/dashboard">Dashboard</Link> <small>&gt;</small> <strong>Properties</strong>
          </h1>
        </div>
        {propertiesContent}
      </div>
    );
  }
}

Properties.propTypes = {
  updateActivePage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  siteMeta: state.siteMeta,
  properties: state.properties,
  auth: state.auth,
});

export default connect(mapStateToProps, { updateActivePage, updateActiveProperty })(Properties);
