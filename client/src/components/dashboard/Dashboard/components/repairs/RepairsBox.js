import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./repairs.css";

class RepairsBox extends Component {
  render() {
    return (
      <div className="repairs-box">
        <div className="change-later">
          <p>
            <Link to="/dashboard/messages">Repairs</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default RepairsBox;
