import React, { Component } from "react";
import { Link } from "react-router-dom";
import Tenant from "../../../../../img/tenant.png";

class LeaseWidget extends Component {
  render() {
    return (
      <div class="tenant" id={this.props.lease._id}>
        <div class="tenant-meta">
          <img src={Tenant} />
          <div class="tenant-info">
            <h3>{this.props.lease.leaseName}</h3>
            <p>{formatDate(this.props.lease.leaseStart)}</p>
          </div>
        </div>
        <div class="tenant-actions" onClick={this.props.linkClick}>
          {/* <Link to={`/dashboard/properties/${this.props.match.params.propertyIndex}/unit/${this.props.match.params.unitIndex}/tenant/${tenantIndex}`}> */}
          Edit Lease
          {/* </Link> */}
        </div>
      </div>
    );
  }
}

export default LeaseWidget;

const formatDate = (date) => {
  let d = new Date(date);
  let month = (d.getMonth() + 1).toString().padStart(2, "0");
  let day = d.getDate().toString().padStart(2, "0");
  let year = d.getFullYear();
  return [year, month, day].join("-");
};
