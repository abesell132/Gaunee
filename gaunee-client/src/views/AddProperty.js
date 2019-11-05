import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./AddProperty.css";

import PropertyTypeSpiff from "../components/PropertyTypeSpiff/PropertyTypeSpiff.jsx";

import apartments from "../assets/img/apartments.png";
import condominium from "../assets/img/condominium.png";
import house from "../assets/img/house.png";

class AddProperty extends Component {
  render() {
    return (
      <div className="content">
        <div className="add-property">
          <div className="container">
            <div className="row">
              <div className="col-md-12 m-auto property-type-selector">
                <div>
                  <h1 className="fw-300">Select Property Type</h1>
                  <div className="property-types-container">
                    <PropertyTypeSpiff title="Single-Unit" icon={house} />
                    <PropertyTypeSpiff title="Multi-Unit" icon={condominium} />
                    <PropertyTypeSpiff
                      title="Multi-Building"
                      icon={apartments}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  {}
)(withRouter(AddProperty));
