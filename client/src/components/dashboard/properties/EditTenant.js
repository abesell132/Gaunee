import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Home from "../../../img/tenant.png";
import Rent from "../../../img/rent.png";
import { addLease, editLease, editTenant, deleteLease, deleteTenant } from "../../../redux/actions/propertyActions";
import LeaseWidget from "./templates/LeaseWidget/LeaseWidget";

import LeaseForm from "./LeaseForm";

class EditTenant extends Component {
  constructor() {
    super();
    this.state = {
      editMode: false,

      tenant: {},
    };
    this.toggleLeasePopup = this.toggleLeasePopup.bind(this);
    this.leasePopupSubmit = this.leasePopupSubmit.bind(this);
    this.toggleEditLease = this.toggleEditLease.bind(this);
    this.leaseEditSubmit = this.leaseEditSubmit.bind(this);

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
    this.deleteLease = this.deleteLease.bind(this);
    this.deleteTenant = this.deleteTenant.bind(this);
  }

  componentDidMount() {
    let property = this.props.properties.properties[this.props.match.params.propertyIndex];

    if (property) {
      let unit = property.units[this.props.match.params.unitIndex];
      let tenant = unit.tenants[this.props.match.params.tenantIndex];

      this.setState({
        firstName: tenant.firstName,
        lastName: tenant.lastName,
        email: tenant.email,
        phone: tenant.phone,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.properties.properties !== this.props.properties.properties) {
      let property = this.props.properties.properties[this.props.match.params.propertyIndex];
      let unit = property.units[this.props.match.params.unitIndex];
      let tenant = unit.tenants[this.props.match.params.tenantIndex];

      this.setState({
        firstName: tenant.firstName,
        lastName: tenant.lastName,
        email: tenant.email,
        phone: tenant.phone,
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    let property = this.props.properties.properties[this.props.match.params.propertyIndex];
    let unit = property.units[this.props.match.params.unitIndex];
    let tenant = unit.tenants[this.props.match.params.tenantIndex];

    let tenantData = {
      tenantID: tenant._id,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
    };

    this.props.editTenant(tenantData, () => {});
  }
  toggleLeasePopup() {
    this.setState({
      showLeasePopup: !this.state.showLeasePopup,
    });
  }

  leasePopupSubmit(data) {
    let property = this.props.properties.properties[this.props.match.params.propertyIndex];
    let unit = property.units[this.props.match.params.unitIndex];
    let tenant = unit.tenants[this.props.match.params.tenantIndex];

    data.tenantID = tenant._id;

    this.props.addLease(data, () => {});

    this.setState({
      showLeasePopup: false,
      showEditLease: false,
      editLeaseIndex: null,
    });
  }

  leaseEditSubmit(data) {
    let property = this.props.properties.properties[this.props.match.params.propertyIndex];
    let unit = property.units[this.props.match.params.unitIndex];
    let tenant = unit.tenants[this.props.match.params.tenantIndex];

    this.props.editLease(data, () => {});

    this.setState({
      showEditLease: false,
      editLeaseIndex: null,
    });
  }

  toggleEditLease(index) {
    this.setState({
      showEditLease: !this.state.showEditLease,
      editLeaseIndex: index,
    });
  }

  deleteLease(leaseID) {
    this.props.deleteLease(leaseID, () => {
      this.toggleEditLease();
    });
  }

  toggleEditMode() {
    this.setState({
      editMode: !this.state.editMode,
    });
  }

  deleteTenant() {
    let property = this.props.properties.properties[this.props.match.params.propertyIndex];
    let unit = property.units[this.props.match.params.unitIndex];
    let tenant = unit.tenants[this.props.match.params.tenantIndex];

    this.props.deleteTenant(tenant._id, () => {
      this.props.history.push(`/dashboard/properties/${this.props.match.params.propertyIndex}/unit/${this.props.match.params.unitIndex}`);
    });
  }

  render() {
    let property = this.props.properties.properties[this.props.match.params.propertyIndex];
    if (!property) return <div>Loading...</div>;

    let unit = property.units[this.props.match.params.unitIndex];
    let tenant = unit.tenants[this.props.match.params.tenantIndex];

    let leases = (
      <div class="no-leases">
        <img src={Rent} />
        <h3>No Leases</h3>
        <a onClick={this.toggleLeasePopup}>Add New</a>
      </div>
    );

    if (tenant.leases.length > 0) {
      leases = (
        <div class="leases-list">
          {tenant.leases.map((lease, leaseIndex) => {
            return <LeaseWidget lease={lease} linkClick={() => this.toggleEditLease(leaseIndex)} />;
          })}
        </div>
      );
    }

    if (this.state.showLeasePopup) {
      leases = (
        <div class={`box-form ${this.state.showLeasePopup ? "" : "hzidden"}`}>
          <div class="box-form-close" onClick={this.toggleLeasePopup}>
            <i class="fa-solid fa-times"></i>
          </div>
          <div class={`box-form-content `}>{<LeaseForm onSubmit={this.leasePopupSubmit} onDelete={this.deleteLease} />}</div>
        </div>
      );
    }

    if (this.state.showEditLease) {
      leases = (
        <div class={`box-form ${this.state.showLeasePopup ? "" : "hzidden"}`}>
          <div class="box-form-close" onClick={this.toggleEditLease}>
            <i class="fa-solid fa-times"></i>
          </div>
          <div class={`box-form-content `}>
            {<LeaseForm lease={tenant.leases[this.state.editLeaseIndex]} onSubmit={this.leaseEditSubmit} onDelete={this.deleteLease} />}
          </div>
        </div>
      );
    }

    return (
      <div id="view-unit">
        <div className="heading-row">
          <h1>
            <Link to="/dashboard">Dashboard</Link> <small>&gt;</small> <Link to="/dashboard/properties">Properties</Link> <small>&gt;</small>{" "}
            <Link to={`/dashboard/properties/${this.props.match.params.propertyIndex}`}>
              {property.houseNumber} {property.streetName}
            </Link>{" "}
            <small>&gt;</small>
            <Link to={`/dashboard/properties/${this.props.match.params.propertyIndex}/unit/${this.props.match.params.unitIndex}`}>
              {" "}
              {unit.identifier}{" "}
            </Link>
            <small>&gt;</small>
            <strong>
              {tenant.firstName} {tenant.lastName}
            </strong>
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
                    <span>{unit.identifier}</span>{" "}
                    <strong>
                      <small>&gt;</small>
                    </strong>{" "}
                    <span>
                      {tenant.firstName} {tenant.lastName}
                    </span>
                  </div>
                  <div class="line2">
                    {property.city}, {property.state.split(" - ")[1]} {property.zipcode}
                  </div>
                </div>
              </div>
              <div class="actions">
                <div>
                  <button class={`edit ${this.state.editMode ? "active" : ""}`} onClick={this.toggleEditMode}>
                    Edit
                  </button>
                  <button class="delete" onClick={this.deleteTenant}>
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
            <form onSubmit={this.onSubmit} className={this.state.editMode ? "" : "hidden"}>
              <div>
                <label>First Name</label>
                <input type="text" name="firstName" value={this.state.firstName} onChange={this.onChange} />
              </div>
              <div>
                <label>Last Name</label>
                <input type="text" name="lastName" value={this.state.lastName} onChange={this.onChange} />
              </div>
              <div>
                <label>Email</label>
                <input type="email" name="email" value={this.state.email} onChange={this.onChange} />
              </div>

              <div>
                <label>Phone</label>
                <input type="tel" name="phone" value={this.state.phone} onChange={this.onChange} />
              </div>

              <input type="submit" />
            </form>

            <div class="body">
              <div class="box">
                <div class="box-title">
                  <h3>Leases</h3>
                  <span onClick={this.toggleLeasePopup}>
                    <i class="fa-solid fa-circle-plus"></i> Add Lease
                  </span>
                </div>

                <div class="box-content"> {leases} </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    properties: state.properties,
  };
};
export default connect(mapStateToProps, { addLease, editLease, editTenant, deleteLease, deleteTenant })(EditTenant);
