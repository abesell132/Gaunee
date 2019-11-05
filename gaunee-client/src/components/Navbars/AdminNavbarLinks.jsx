import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logUserOut } from "../../redux/actions/authActions";
import "./Navbar.css";

class AdminNavbarLinks extends Component {
  constructor() {
    super();
    this.logOut = this.logOut.bind(this);
  }
  logOut(e) {
    e.preventDefault();
    this.props.logUserOut(this.props.history);
  }
  render() {
    const notification = (
      <div>
        <i className="fa fa-globe" />
        <b className="caret" />
        <span className="notification">4</span>
        <p className="hidden-lg hidden-md">Notification</p>
      </div>
    );

    return (
      <div>
        <Nav>
          <NavDropdown
            eventKey={2}
            title={notification}
            noCaret
            id="basic-nav-dropdown"
          >
            <MenuItem eventKey={2.1}>New Message From Cindy</MenuItem>
            <MenuItem eventKey={2.2}>Repair Requested</MenuItem>
            <MenuItem eventKey={2.3}>New Message from Jim</MenuItem>
            <MenuItem eventKey={2.4}>4 Late Rent Payments</MenuItem>
          </NavDropdown>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={3} href="#">
            <i className="fa fa-search" />
            <p className="hidden-lg hidden-md">Search</p>
          </NavItem>
          <NavItem eventKey={1} href="/admin/user">
            Account
          </NavItem>
          <NavItem eventKey={3} href="#" onClick={this.logOut}>
            Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logUserOut }
)(withRouter(AdminNavbarLinks));
