import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

class MainNavIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      activeItem: this.props.activeItem,
      icon: this.props.icon,
      onClick: this.props.onClick,
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
    );
  }
}

MainNavIcon.propTypes = {
  name: PropTypes.string.isRequired,
  activeItem: PropTypes.string.isRequired,
  icon: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default MainNavIcon;
