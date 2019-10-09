import React, { Component } from "react";
import TextFieldGroup from "../components/TextFieldGroup/TextFieldGroup";
import "../assets/css/authentication.css";
import { loginUser } from "../redux/actions/authActions";
import { connect } from "react-redux";

class Authentication extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/admin/dashboard");
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push("/admin/dashboard");
      }

      return true;
    }
    return true;
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }
  render() {
    return (
      <div className="landing">
        <div className=" text-dark welcome-box">
          <div className="welcome-container">
            <div className="row">
              <div className="col-md-10 m-auto">
                <h1 className="display-4 text-center">Log In</h1>
                <p className="lead text-center">
                  Sign in to your <span className="gaunee-brand">GAUNEE</span>{" "}
                  account
                </p>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <TextFieldGroup
                      type="email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      placeholder="Email Address"
                    />
                  </div>
                  <div className="form-group">
                    <TextFieldGroup
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={this.onChange}
                      value={this.state.password}
                    />
                  </div>
                  <input
                    type="submit"
                    className="btn btn-block mt-4 signup-button"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Authentication);
