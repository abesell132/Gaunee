import React, { Component } from "react";
import "./properties.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Home from "../../../../../img/home.png";

class PropertiesBox extends Component {
  render() {
    let properties = Object.values(this.props.properties.properties).map((property) => (
      <Link to={`/dashboard/properties/view/${property._id}`} key={property._id}>
        <div class="content">
          <img src={Home} />

          <div>
            <div class="line1">
              {property.houseNumber} {property.streetName}
            </div>
            <div className="line2">
              <small>
                {property.city}, {property.state} {property.zipcode}
              </small>
            </div>
          </div>
        </div>
      </Link>
    ));

    return (
      <div className="properties-box">
        <div className="change-later">
          <p>
            <Link to="/dashboard/properties">Properties</Link>
            <span>
              <Link to="/dashboard/properties">
                See All <i class="fa fa-angle-right"></i>
              </Link>
            </span>
          </p>
        </div>
        <div className="properties-list">{properties}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  properties: state.properties,
  siteMeta: state.siteMeta,
});

export default connect(mapStateToProps, {})(PropertiesBox);
