import React, { Component } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { updateActivePage } from "../../actions/siteMetaActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./properties.css";

class Properties extends Component {
  constructor() {
    super();
    this.state = {
      selectedProperty: ""
    };

    this.onPropertyClick = this.onPropertyClick.bind(this);
  }
  UNSAFE_componentWillMount() {
    this.props.updateActivePage("Properties");
  }

  componentWillUpdate(prevProps, prevState) {
    if (prevProps !== this.props) {
      if (this.props.properties.properties[0]) {
        this.setState({
          selectedProperty: this.props.properties.properties[0]._id
        });
      }
    }
  }

  isSelected(property) {
    let selectedProperty = this.state.selectedProperty;
    let propertyInQuestion = this.props.properties.properties[property]._id;

    if (selectedProperty === propertyInQuestion) {
      return true;
    } else {
      return false;
    }
  }
  onPropertyClick(e) {
    e.preventDefault();
    console.log(e.currentTarget.getAttribute("name"));
    this.setState({
      selectedProperty: e.currentTarget.getAttribute("name")
    });
  }

  render() {
    let properties = Object.keys(this.props.properties.properties).map(
      (key, property) => (
        <div
          className={classnames(" single-property", {
            "is-selected": this.isSelected(property)
          })}
          key={key}
          name={this.props.properties.properties[key]._id}
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

    return (
      <div className="properties">
        <div className="heading-row">
          <h1>
            <Link to="/dashboard">Dashboard</Link> <small>></small>{" "}
            <strong>Properties</strong>
          </h1>
        </div>
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
          <div className="placeholder-container" />
        </div>
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
  { updateActivePage }
)(Properties);
