import React, { Component } from "react";

class TenantForm extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }
  render() {
    return (
      <form class="new-tenant" onSubmit={this.handleSubmit}>
        <h3>New Tenant</h3>
        <div class="flex">
          <div>
            <label>First Name</label>
            <input type="text" name="firstName" onChange={this.onChange} value={this.state.firstName} />
          </div>
          <div>
            <label>Last Name</label>
            <input type="text" name="lastName" onChange={this.onChange} value={this.state.lastName} />
          </div>
        </div>

        <div>
          <label>Email Address</label>
          <input type="text" name="email" onChange={this.onChange} value={this.state.email} />
        </div>

        <div>
          <label>Phone Number</label>
          <input type="tel" name="phone" onChange={this.onChange} value={this.state.phone} />
        </div>

        <div>
          <input type="submit" />
        </div>
      </form>
    );
  }
}

export default TenantForm;
