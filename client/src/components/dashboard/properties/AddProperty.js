import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import PropertyTypeSpiff from "./templates/PropertyTypeSpiff";
import SingleUnitForm from "./templates/SingleUnitForm";

import ModalPopup from "../../common/ModalPopup";
// import update from "react-addons-update";
import {
  addProperty,
  clearErrors
} from "../../../redux/actions/propertyActions";
import { updateActivePage } from "../../../redux/actions/siteMetaActions";

import apartments from "../../../img/apartments.png";
import condominium from "../../../img/condominium.png";
import house from "../../../img/house.png";

import "./add-property.css";

class AddProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSingleUnitModal: false,
      dialogClassName: "property-type-classname"
    };

    this.toggleSingleUnitModal = this.toggleSingleUnitModal.bind(this);
  }

  componentDidMount() {
    this.props.updateActivePage("Properties");
  }

  toggleSingleUnitModal() {
    if (this.state.showSingleUnitModal) {
      this.setState({
        showSingleUnitModal: false
      });
      return;
    }
    this.setState({
      showSingleUnitModal: true
    });
  }

  render() {
    var singleUnit = <SingleUnitForm />;
    return (
      <div className="add-property">
        <ModalPopup
          size="lg"
          dialogClassName="single-unit-modal"
          showModal={this.state.showSingleUnitModal}
          title="Single Unit"
          onHide={this.toggleSingleUnitModal}
          showFooter={false}
          bodyContent={singleUnit}
        />
        <div className="container">
          <div className="row">
            <div className="col-md-12 m-auto property-type-selector">
              <div>
                <h1 className="fw-300">Select Property Type</h1>
                <div className="property-types-container">
                  <PropertyTypeSpiff
                    title="Single-Unit"
                    icon={house}
                    onClick={this.toggleSingleUnitModal}
                  />
                  <PropertyTypeSpiff title="Multi-Unit" icon={condominium} />
                  <PropertyTypeSpiff title="Multi-Building" icon={apartments} />
                </div>
              </div>
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

  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addProperty, clearErrors, updateActivePage }
)(withRouter(AddProperty));
