import React, { Component } from "react";
import MainNavItem from "./MainNavIcon";
import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProperties } from "../../actions/propertyActions";

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "Dashboard",
      currentNotifs: 1
    };

    this.onClick = this.onClick.bind(this);
  }

  UNSAFE_componentWillMount() {
    this.props.getProperties();
  }

  onClick(e) {
    this.setState({
      activeItem: e.target.id
    });
    e.preventDefault();
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
        <div className="property-container">
          <p key={property.address1}>{property.address1}</p>
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
              <div className="notif-icon-container position-relative">
                <i className="fa fa-bell" />

                <div
                  className={classnames("notifiation-number", {
                    "has-notifs": hasNotifs
                  })}
                >
                  {this.state.currentNotifs}
                </div>
              </div>
            </div>
          </div>
          <div className="side-bar-property-list">
            <div className="property-controls">
              <span>Properties</span>
              <div className="icons">
                <div className="property-icon">
                  <i className="fas fa-plus" />
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
                  <i className="fas fa-search" />
                  <div>
                    <span>Search</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="sidebar-properties-list">{properties}</div>
          <div className="collapse-properties">
            <div
              className={"main-nav-icon"}
              id={this.name}
              // onClick={this.onClick}
            >
              <i className="fas fa-arrow-left" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Sidebar.propTypes = {
  getProperties: PropTypes.func.isRequired,
  properties: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  properties: state.properties
});

export default connect(
  mapStateToProps,
  { getProperties }
)(Sidebar);
