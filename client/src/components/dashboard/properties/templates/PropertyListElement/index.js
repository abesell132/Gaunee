import React, { Component } from "react";
import Home from "../../../../../img/home.png";
import { Link } from "react-router-dom";

import "./PropertyListElement.css";

class PropertyListElement extends Component {
  render() {
    return (
      <div className="property">
        <img src={Home} alt="home" className="home-icon" />
        <div className="content">
          <div class="meta">
            <div class="address">
              <h3>
                {this.props.data.houseNumber} {this.props.data.streetName}
              </h3>
              <h4>
                {this.props.data.city}, {this.props.data.state.split("-")[0]} {this.props.data.zipcode}
              </h4>
            </div>
            <div class="info">
              <div class="">
                <strong>RENT:</strong> $100
              </div>
            </div>
          </div>
          <div className="seemore">
            <Link to={`/dashboard/properties/${this.props.dataIndex}`}>See More</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default PropertyListElement;
