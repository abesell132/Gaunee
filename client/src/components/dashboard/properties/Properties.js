import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import {
  updateActivePage,
  updateActiveProperty
} from "../../../redux/actions/siteMetaActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SinglePropertyInformation from "./SinglePropertyInformation";
import missingApartment from "../../../img/missing-apartment.png";

import "./properties.css";

class Properties extends Component {
  constructor() {
    super();
    this.state = {
      selectedProperty: ""
    };

    this.onPropertyClick = this.onPropertyClick.bind(this);
  }

  componentDidMount() {
    this.props.updateActivePage("Properties");
  }
  componentWillUpdate(prevProps, prevState) {
    // if (prevProps !== this.props) {
    //   if (this.props.properties.properties[0]) {
    //     this.setState({
    //       selectedProperty: 0
    //     });
    //   }
    // }
  }

  isSelected(property) {
    let selectedProperty = this.props.siteMeta.activeProperty;
    if (parseInt(selectedProperty) === property) {
      return true;
    } else {
      return false;
    }
  }

  onPropertyClick(e) {
    e.preventDefault();
    this.props.updateActiveProperty(e.currentTarget.getAttribute("name"));
  }

  render() {
    let propertiesContent;

    let properties = Object.keys(this.props.properties.properties).map(
      (key, property) => (
        <div
          className={classnames(" single-property", {
            "is-selected": this.isSelected(property)
          })}
          key={key}
          name={key}
          onClick={this.onPropertyClick}
        >
          <h3>{this.props.properties.properties[key].address1}</h3>

          <span>
            {this.props.properties.properties[key].city},{" "}
            {this.props.properties.properties[key].state}
          </span>
        </div>
      )
    );

    if (this.props.properties.properties[0]) {
      propertiesContent = (
        <div className="dashboard-content">
          <div className="placeholder-container">
            <p className="section-title">
              Properties{" "}
              <Link to="/dashboard/properties/add">
                <button className="btn add-property-button">Add New</button>
              </Link>
            </p>
            <div className="properties-list">{properties}</div>
          </div>
          <div className="placeholder-container single-property-container">
            <SinglePropertyInformation
              selectedProperty={this.state.selectedProperty}
            />
          </div>
        </div>
      );
    } else {
      propertiesContent = (
        <div className="dashboard-content">
          <div className="no-apartment-container">
            <div>
              <img
                src={missingApartment}
                className="mw-200"
                alt="No Properties Decoration"
              />
              <p className="fs-18">Looks like you don't have any properties!</p>
              <Link to="/dashboard/properties/add">
                <button
                  className="btn add-property-button"
                  style={{ float: "none", fontSize: "18px" }}
                >
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
            <Link to="/dashboard">Dashboard</Link> <small>></small>{" "}
            <strong>Properties</strong>
          </h1>
        </div>
        {propertiesContent}
      </div>
    );
  }
}

Properties.propTypes = {
  updateActivePage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  siteMeta: state.siteMeta,
  properties: state.properties,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { updateActivePage, updateActiveProperty }
)(Properties);