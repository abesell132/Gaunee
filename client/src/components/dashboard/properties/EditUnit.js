import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { updateUnit, addTenant, deleteUnit } from "../../../redux/actions/propertyActions";
import { withRouter } from "react-router-dom";
import _ from "lodash";

import TenantForm from "./TenantForm";

import Tenant from "../../../img/tenant.png";
import Home from "../../../img/home.png";
import Rent from "../../../img/rent.png";

class EditUnit extends Component {
  constructor() {
    super();
    this.state = {
      identifier: "",
      monthlyRent: 0,
      securityDeposit: 0,
      availability: "available",
      beds: 0,
      baths: 0,
      showTenantPopup: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleTenantPopup = this.toggleTenantPopup.bind(this);
    this.tenantPopupSubmit = this.tenantPopupSubmit.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.deleteUnit = this.deleteUnit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    let property = this.props.properties.properties[this.props.match.params.propertyIndex];

    const payload = {
      unitID: property.units[this.props.match.params.unitIndex]._id,
      editMode: true,
      identifier: this.state.identifier,
      monthlyRent: this.state.monthlyRent,
      securityDeposit: this.state.securityDeposit,
      availability: this.state.availability,
      beds: this.state.beds,
      baths: this.state.baths,
    };

    this.props.updateUnit(payload, () => {});
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    let property = this.props.properties.properties[this.props.match.params.propertyIndex];
    if (property) {
      let unit = property.units[this.props.match.params.unitIndex];

      if (unit) {
        this.setState({
          identifier: unit.identifier,
          monthlyRent: unit.monthlyRent,
          securityDeposit: unit.securityDeposit,
          availability: unit.availability,
          beds: unit.beds,
          baths: unit.baths,
        });
      }
    }
  }

  toggleTenantPopup() {
    this.setState({
      showTenantPopup: !this.state.showTenantPopup,
    });
  }

  tenantPopupSubmit(formData) {
    let property = this.props.properties.properties[this.props.match.params.propertyIndex];
    let unit = property.units[this.props.match.params.unitIndex];

    this.toggleTenantPopup();

    formData.unitID = unit._id;

    this.props.addTenant(formData, () => {});
  }

  deleteUnit() {
    let property = this.props.properties.properties[this.props.match.params.propertyIndex];
    let unit = property.units[this.props.match.params.unitIndex];

    this.props.deleteUnit(unit._id, () => {
      this.props.history.push("/dashboard/properties/" + this.props.match.params.propertyIndex);
    });
  }

  toggleEditMode() {
    this.setState({
      editMode: !this.state.editMode,
    });
  }

  render() {
    let property = this.props.properties.properties[this.props.match.params.propertyIndex];

    if (property) {
      let unit = property.units[this.props.match.params.unitIndex];
      console.log("unit", unit);

      let tenants = (
        <div class="no-tenants">
          <img src={Rent} />
          <h3>No Tenants</h3>
          <a onClick={this.toggleTenantPopup}>Add New</a>
        </div>
      );

      if (unit.tenants.length > 0) {
        tenants = (
          <div class="tenants-list">
            {unit.tenants
              .map((tenant, tenantIndex) => {
                return (
                  <div class="tenant">
                    <div class="tenant-meta">
                      <img src={Tenant} />
                      <div class="tenant-info">
                        <h3>
                          {tenant.firstName} {tenant.lastName}
                        </h3>
                        <p>{tenant.email}</p>
                      </div>
                    </div>
                    <div class="tenant-actions">
                      <Link
                        to={`/dashboard/properties/${this.props.match.params.propertyIndex}/unit/${this.props.match.params.unitIndex}/tenant/${tenantIndex}`}
                      >
                        View Tenant
                      </Link>
                    </div>
                  </div>
                );
              })
              .reverse()}
          </div>
        );
      }

      if (this.state.showTenantPopup) {
        tenants = (
          <div class="box-form ">
            <div class="box-form-close" onClick={this.toggleTenantPopup}>
              <i class="fa-solid fa-times"></i>
            </div>
            <div class={`box-form-content `}>
              <TenantForm onSubmit={this.tenantPopupSubmit} />
            </div>
          </div>
        );
      }

      let availability = (
        <select name="availability" onChange={this.handleChange}>
          <option value="">Select Availability</option>

          {this.state.availability === "available" ? (
            <option value="available" selected>
              Available
            </option>
          ) : (
            <option value="available">Available</option>
          )}

          {this.state.availability === "occupied" ? (
            <option value="occupied" selected>
              Occupied
            </option>
          ) : (
            <option value="occupied">Occupied</option>
          )}
        </select>
      );

      return (
        <div id="view-unit">
          <div className="heading-row">
            <h1>
              <Link to="/dashboard">Dashboard</Link> <small>&gt;</small> <Link to="/dashboard/properties">Properties</Link> <small>&gt;</small>{" "}
              <Link to={`/dashboard/properties/${this.props.match.params.propertyIndex}`}>
                {property.houseNumber} {property.streetName}
              </Link>{" "}
              <small>&gt;</small> <strong>{unit.identifier}</strong>
            </h1>
          </div>
          <div className="dashboard-content">
            <div className="container">
              <div class="head">
                <div class="meta">
                  <div class="img">
                    <img src={Home} alt="home" className="home-icon" />
                  </div>
                  <div class="info">
                    <div class="line1">
                      {property.houseNumber} {property.streetName}{" "}
                      <strong>
                        <small>&gt;</small>
                      </strong>{" "}
                      <span>{unit.identifier}</span>
                    </div>
                    <div class="line2">
                      {property.city}, {property.state.split(" - ")[1]} {property.zipcode}
                    </div>
                  </div>
                </div>
                <div class="actions">
                  <div>
                    <button class={`edit ${this.editMode ? "active" : ""}`} onClick={this.toggleEditMode}>
                      Edit
                    </button>
                    <button class="delete" onClick={this.deleteUnit}>
                      Delete
                    </button>
                  </div>
                  <div class="statuses">
                    <div>
                      <strong>Status:</strong> Available
                    </div>

                    <div>
                      <strong>Rent:</strong> $100
                    </div>
                  </div>
                </div>
              </div>
              <form onSubmit={this.handleSubmit} className={this.state.editMode ? "" : "hidden"}>
                <div>
                  <label>Unit identifier</label>
                  <input type="text" name="identifier" value={this.state.identifier} onChange={this.handleChange} placeholder={unit.identifier} />
                </div>
                <div>
                  <label>Monthly Rent</label>
                  <input type="number" name="monthlyRent" value={this.state.monthlyRent} onChange={this.handleChange} />
                </div>
                <div>
                  <label>Security Deposit</label>
                  <input type="number" name="securityDeposit" value={this.state.securityDeposit} onChange={this.handleChange} />
                </div>
                <div>
                  <label>Availability</label>
                  {availability}
                </div>
                <div>
                  <label>Beds</label>
                  <input type="number" name="beds" value={this.state.beds} onChange={this.handleChange} />
                </div>
                <div>
                  <label>Baths</label>
                  <input type="number" name="baths" value={this.state.baths} onChange={this.handleChange} />
                </div>
                <input type="submit" />
              </form>

              <div class="body">
                <div class="box">
                  <div class="box-title">
                    <h3>Tenants</h3>
                    <span onClick={this.toggleTenantPopup}>
                      <i class="fa-solid fa-circle-plus"></i> Add Tenant
                    </span>
                  </div>

                  <div class="box-content"> {tenants} </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    properties: state.properties,
  };
};

export default connect(mapStateToProps, { updateUnit, addTenant, deleteUnit })(withRouter(EditUnit));
