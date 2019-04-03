import React, { Component } from "react";
import PropTypes from "prop-types";
import Spinner from "../common/Spinner";
import favicon from "../../img/favicon.png";
import { Link } from "react-router-dom";
import { getCurrentProfile } from "../../actions/profileActions";
import { connect } from "react-redux";
import ApartmentMap from "./Map";

const AnyReactComponent = ({ text }) => (
  <div>
    <img src={favicon} />
  </div>
);

class Dashboard extends Component {
  static defaultProps = {
    center: {
      lat: 46.499102,
      lng: -87.611803
    },
    zoom: 11
  };
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  componentWillReceiveProps() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = (
        <h4>
          <Spinner />
        </h4>
      );
    } else {
      //check if logged in user has profile data
      if (Object.keys(profile).length > 0) {
        dashboardContent = <h4>TODO: DISPLAY PROFILE</h4>;
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <ApartmentMap />
            <p>You have not yet setup a profile, please add some info</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{dashboardContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(Dashboard);
