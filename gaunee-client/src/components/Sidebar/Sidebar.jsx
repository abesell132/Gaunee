import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import classnames from "classnames";
import "./sidebar.css";

import MainNavItem from "../MainNavItem/MainNavItem.jsx";

import logo from "assets/img/reactlogo.png";

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
          {this.props.routes.map((prop, key) => {
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
            <div>
              <span>Notifications</span>
              <div
                className="notif-icon-container position-relative"
                onClick={this.toggleNotifications}
              >
                <i className="fas fa-bell" />

                <div className={"notifiation-number"}>
                  {this.state.currentNotifs}
                </div>
                <div
                  className={"notif-dropdown"}
                  onClick={this.preventProp}
                ></div>
              </div>
            </div>
          </div>
          <div className="side-bar-property-list">
            <div className="property-controls">
              <span>Properties</span>
              <div className="icons">
                <div className="property-icon">
                  <NavLink to="/dashboard/properties/add">
                    <i className="fas fa-plus" />
                  </NavLink>

                  <div>
                    <span>Add Property</span>
                  </div>
                </div>
                <div className="property-icon">
                  <i className="fas fa-tools" />
                  <div>
                    <span>Edit Properties</span>
                  </div>
                </div>
                <div className="property-icon">
                  <i
                    className="fas fa-search"
                    onClick={this.toggleSearchInput}
                  />
                  <div>
                    <span>Search</span>
                  </div>
                </div>
              </div>
            </div>
            <input
              className={classnames("sidebar-search-form", {
                "search-properties": this.state.searchProperties
              })}
            />
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
