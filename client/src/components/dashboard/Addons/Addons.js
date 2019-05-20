import React, { Component } from "react";
import { Link } from "react-router-dom";
import { updateActivePage } from "../../../actions/siteMetaActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Addons extends Component {
  componentDidMount() {
    this.props.updateActivePage("Addons");
  }
  render() {
    return (
      <div>
        <div className="heading-row">
          <h1>
            <Link to="/dashboard">Dashboard</Link> <small>></small>{" "}
            <strong>Addons</strong>
          </h1>
        </div>
        <div className="dashboard-content" />
      </div>
    );
  }
}

Addons.propTypes = {
  updateActivePage: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  siteMeta: state.siteMeta,
  properties: state.properties,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { updateActivePage }
)(Addons);
