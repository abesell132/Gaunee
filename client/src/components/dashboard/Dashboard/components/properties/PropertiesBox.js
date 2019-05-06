import React, { Component } from "react";
import "./properties.css";
import { Link } from "react-router-dom";

class PropertiesBox extends Component {
  render() {
    return (
      <div className="properties-box">
        <div className="change-later">
          <p>
            <Link to="/dashboard/properties">Properties</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default PropertiesBox;
