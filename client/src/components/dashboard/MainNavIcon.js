import React, { Component } from "react";
import classnames from "classnames";

import { Link } from "react-router-dom";

import PropTypes from "prop-types";

class MainNavIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      activeItem: this.props.activeItem,
      icon: this.props.icon,
      onClick: this.props.onClick,
      location: this.props.location,
      isActive: false
    };
  }

  componentDidMount() {
    if (this.state.activeItem === this.state.name) {
      this.setState({
        isActive: true
      });
    } else {
      this.setState({
        isActive: false
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.activeItem === this.state.name) {
      this.setState({
        isActive: true,
        activeItem: this.props.activeItem
      });
    } else {
      this.setState({
        isActive: false,
        activeItem: this.props.activeItem
      });
    }
  }

  render() {
    return (
      <div>
        <Link to={this.props.location}>
          <div
            className={classnames("main-nav-icon", {
              "icon-active": this.state.isActive
            })}
            id={this.state.name}
            onClick={this.state.onClick}
          >
            <i className={this.state.icon} id={this.state.name} />
            <div>{this.state.name}</div>
          </div>
        </Link>
      </div>
    );
  }
}

MainNavIcon.propTypes = {
  name: PropTypes.string.isRequired,
  activeItem: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  location: PropTypes.string.isRequired
};

export default MainNavIcon;
