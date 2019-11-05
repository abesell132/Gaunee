import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

import MainNavItem from "../MainNavItem/MainNavItem.jsx";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      searchProperties: false
    };
  }
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  updateDimensions() {
    this.setState({ width: window.innerWidth });
  }
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  render() {
    return (
      <div className="sidebar-container ">
        <div className="main-nav ">
          {this.props.sidebarRoutes.map((prop, key) => {
            if (!prop.redirect)
              return (
                <MainNavItem
                  className={
                    prop.upgrade
                      ? "active active-pro"
                      : this.activeRoute(prop.layout + prop.path)
                  }
                  activeItem={this.state.activeItem}
                  name={prop.name}
                  icon={prop.icon}
                  location={prop.layout + prop.path}
                  onClick={this.onClick}
                  key={key}
                />
              );
            return null;
          })}
          <div className="help-button">
            <div
              className={"main-nav-icon"}
              id={this.name}
              onClick={this.onClick}
            >
              <i className="fas fa-question-circle" />
              <div>Help</div>
            </div>
          </div>
        </div>
        <div className="secondary-nav h-100">
          <div className="notifications-container">
            <div className="d-flex space-between flex-vertical-center">
              <span>Properties</span>
              <div>
                <div className="property-icon">
                  <NavLink to="/admin/properties/create">
                    <i className="fas fa-plus" />
                  </NavLink>
                  <div style={{ zIndex: 2 }}>
                    <span>Add Property</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar-properties-list">{}</div>
          <div className="collapse-properties">
            <div className={"main-nav-icon"} id={this.name}>
              <i className="fas fa-arrow-left" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
