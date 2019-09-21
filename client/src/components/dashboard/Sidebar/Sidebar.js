import React, { Component } from "react";
import MainNavItem from "./MainNavIcon";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateActiveProperty } from "../../../redux/actions/siteMetaActions";
import DropdownNotification from "./dropdown/DropdownNotification.js";

import("./sidebar.css");

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "Dashboard",
      notificationsOpen: false,
      currentNotifs: 1,
      searchProperties: false
    };

    this.onClick = this.onClick.bind(this);
    this.toggleSearchInput = this.toggleSearchInput.bind(this);
    this.updateSiteMetaProperty = this.updateSiteMetaProperty.bind(this);
    this.toggleNotifications = this.toggleNotifications.bind(this);
    this.closeNotificationDropdown = this.closeNotificationDropdown.bind(this);
  }

  preventProp(e) {
    e.stopPropagation();
  }

  updateSiteMetaProperty(e) {
    const keys = Object.values(this.props.properties.properties);
    let iterations = 0;
    for (const key of keys) {
      if (key._id === e.currentTarget.name) {
        this.props.updateActiveProperty(iterations);
      } else {
      }
      iterations++;
    }
    // this.props.updateActiveProperty();
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      activeItem: nextProps.siteMeta.activePage
    });
  }

  UNSAFE_componentWillMount() {}

  toggleNotifications() {
    if (this.state.notificationsOpen) {
      this.closeNotificationDropdown();
      return;
    }
    this.setState({
      notificationsOpen: true
    });
  }

  closeNotificationDropdown() {
    this.setState({
      notificationsOpen: false
    });
  }

  onClick(e) {
    this.closeNotificationDropdown();
    this.setState({
      activeItem: e.target.id
    });
  }

  toggleSearchInput() {
    if (this.state.searchProperties) {
      // Close
      this.setState({
        searchProperties: false
      });
    } else {
      // Open
      this.setState({
        searchProperties: true
      });
    }
  }

  render() {
    let hasNotifs;
    if (this.state.currentNotifs > 0) {
      hasNotifs = true;
    } else {
      hasNotifs = false;
    }

    let properties = Object.values(this.props.properties.properties).map(
      property => (
        <div className="property-container" key={property._id}>
          <Link
            to="/dashboard/properties"
            onClick={this.updateSiteMetaProperty}
            name={property._id}
          >
            <p key={property.name}>{property.name}</p>
          </Link>
        </div>
      )
    );
    return (
      <div className="sidebar-container ">
        <div className="main-nav ">
          <div className="profile-icon-container">
            <div
              className={"profile-nav-icon"}
              id={this.state.name}
              onClick={this.state.onClick}
            >
              <i className="far fa-user" id={this.state.name} />
            </div>
          </div>
          <MainNavItem
            activeItem={this.state.activeItem}
            name="Dashboard"
            icon="fa fa-home"
            location="/dashboard"
            onClick={this.onClick}
          />

          <MainNavItem
            activeItem={this.state.activeItem}
            icon="fa fa-city"
            name="Properties"
            location="/dashboard/properties"
            onClick={this.onClick}
          />
          <MainNavItem
            activeItem={this.state.activeItem}
            name="Finances"
            icon="fas fa-dollar-sign"
            location="/dashboard/finances"
            onClick={this.onClick}
          />
          <MainNavItem
            activeItem={this.state.activeItem}
            name="Message Center"
            icon="fa fa-comments"
            location="/dashboard/messages"
            onClick={this.onClick}
          />
          <MainNavItem
            activeItem={this.state.activeItem}
            name="Addons"
            icon="fas fa-box-open"
            location="/dashboard/addons"
            onClick={this.onClick}
          />
          <MainNavItem
            activeItem={this.state.activeItem}
            name="Settings"
            icon="fa fa-cog"
            location="/dashboard/settings"
            onClick={this.onClick}
          />
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
                <i className="fa fa-bell" />

                <div
                  className={classnames("notifiation-number", {
                    "has-notifs": hasNotifs
                  })}
                >
                  {this.state.currentNotifs}
                </div>
                <div
                  className={classnames("notif-dropdown", {
                    "notif-dropdown-open": this.state.notificationsOpen
                  })}
                  onClick={this.preventProp}
                >
                  <div>
                    <div className="dropdown-notifs-list">
                      <DropdownNotification />
                      <hr />
                      <DropdownNotification />
                    </div>
                    <div className="dropdown-message-center-link">
                      <Link
                        to="/dashboard/messages"
                        onClick={this.closeNotificationDropdown}
                      >
                        Go To Message Center
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="side-bar-property-list">
            <div className="property-controls">
              <span>Properties</span>
              <div className="icons">
                <div className="property-icon">
                  <Link to="/dashboard/properties/add">
                    <i className="fas fa-plus" />
                  </Link>

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
          <div className="sidebar-properties-list">{properties}</div>
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

Sidebar.propTypes = {
  properties: PropTypes.object.isRequired,
  siteMeta: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  properties: state.properties,
  siteMeta: state.siteMeta
});

export default connect(
  mapStateToProps,
  { updateActiveProperty }
)(Sidebar);
