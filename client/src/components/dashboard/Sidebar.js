import React, { Component } from "react";
import MainNavItem from "./MainNavIcon";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "Dashboard"
    };

    this.onClick = this.onClick.bind(this);
  }
  onClick(e) {
    this.setState({
      activeItem: e.target.id
    });
    e.preventDefault();
  }

  render() {
    return (
      <div className="sidebar-container h-100">
        <div className="main-nav h-100">
          <MainNavItem
            activeItem={this.state.activeItem}
            name="Dashboard"
            icon="fa fa-home"
            onClick={this.onClick}
          />
          <MainNavItem
            activeItem={this.state.activeItem}
            name="Messages"
            icon="fa fa-comments"
            onClick={this.onClick}
          />
          <MainNavItem
            activeItem={this.state.activeItem}
            name="Settings"
            icon="fa fa-cog"
            onClick={this.onClick}
          />
        </div>
        <div className="secondary-nav h-100">asf</div>
      </div>
    );
  }
}

export default Sidebar;
