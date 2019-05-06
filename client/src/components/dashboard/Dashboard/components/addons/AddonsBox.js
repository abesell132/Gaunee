import React, { Component } from "react";
import { Link } from "react-router-dom";

class AddonsBox extends Component {
  render() {
    return (
      <div className="addons">
        <p>
          <Link to="/dashboard/addons">Addons</Link>
        </p>
        <div className="addons-content">
          <div>
            <h4>
              Enhance{" "}
              <span class="navbar-brand no-padding vertical-align-top inherit-font-size">
                Gaunee
              </span>{" "}
              with Add-ons
            </h4>
            <span>
              Get even more out of your Gaunee subscription! Add features such
              as traslation, in-app rent payments, SMS integration, and more!
            </span>
            <div>
              <Link to="/dashboard/addons">
                <button class=" browse-addons-button">Browse Add-ons</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddonsBox;
