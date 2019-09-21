import React, { Component } from "react";

class PropertyTypeSpiff extends Component {
  render() {
    return (
      <div onClick={this.props.onClick}>
        <div>
          <img src={this.props.icon} alt={this.props.title} />
          <h3>{this.props.title}</h3>
        </div>
      </div>
    );
  }
}

export default PropertyTypeSpiff;
