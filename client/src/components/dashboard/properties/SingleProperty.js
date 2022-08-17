import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import _ from "lodash";
import { deleteProperty, updateProperty, addUnit } from "../../../redux/actions/propertyActions";
import Home from "../../../img/home.png";
import Rent from "../../../img/rent.png";
import NewUnit from "./templates/NewUnitForm/NewUnit";

class SingleProperty extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addUnitFormOpen: false,
      editMode: false,
    };

    this.deleteProperty = this.deleteProperty.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.toggleAddUnitForm = this.toggleAddUnitForm.bind(this);
    this.handleNewUnitSubmission = this.handleNewUnitSubmission.bind(this);
    this.toggleEditMode = this.toggleEditMode.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    let property = this.props.properties.properties[this.props.match.params.propertyIndex];

    let propertyData = {
      city: this.state.city,
      houseNumber: this.state.houseNumber,
      state: this.state.state,
      streetName: this.state.streetName,
      zipcode: this.state.zipcode,
      propertyID: property._id,
    };

    e.preventDefault();

    this.props.updateProperty(propertyData, () => this.toggleEditMode());
  }

  deleteProperty() {
    let index = this.props.match.params.propertyIndex;
    let property = this.props.properties.properties[index];

    this.props.deleteProperty(property._id, () => setTimeout(() => this.props.history.push("/dashboard/properties"), 500));
  }

  componentDidMount() {
    let property = this.props.properties.properties[this.props.match.params.propertyIndex];

    if (property) {
      console.log(property);

      this.setState({
        city: property.city,
        houseNumber: property.houseNumber,
        state: property.state,
        streetName: property.streetName,
        zipcode: property.zipcode,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.properties.properties[this.props.match.params.propertyIndex] !==
      this.props.properties.properties[this.props.match.params.propertyIndex]
    ) {
      let property = this.props.properties.properties[this.props.match.params.propertyIndex];

      if (property) {
        this.setState({
          city: property.city,
          houseNumber: property.houseNumber,
          state: property.state,
          streetName: property.streetName,
          zipcode: property.zipcode,
        });
      }
    }

    // check if the property url has changed, if so, update the state
    if (this.props.match.params.propertyIndex !== prevProps.match.params.propertyIndex) {
      let properties = this.props.properties.properties;
      let property = properties[this.props.match.params.propertyIndex];

      if (property) {
        this.setState({ property, state: property.state.split(" - ")[1], ready: true });
      } else {
        // redirect to property page
        this.props.history.push("/dashboard/properties");
      }
    }
  }

  toggleAddUnitForm() {
    this.setState({ addUnitFormOpen: !this.state.addUnitFormOpen });
  }

  handleNewUnitSubmission(unitData) {
    let property = this.props.properties.properties[this.props.match.params.propertyIndex];
    unitData.propertyID = property._id;

    this.props.addUnit(unitData, () => this.toggleAddUnitForm());
  }

  toggleEditMode() {
    this.setState({ editMode: !this.state.editMode });
  }

  render() {
    let index = this.props.match.params.propertyIndex;
    let property = this.props.properties.properties[index];

    let units = (
      <div class="no-units">
        <img src={Rent} />
        <h3>No Units</h3>
        <a onClick={this.toggleAddUnitForm}>Add New</a>
      </div>
    );

    if (property) {
      if (property.units) {
        units = Object.values(property.units).map((unit, unitIndex) => (
          <div class="unit" key={unit._id}>
            <div class="unit-meta">
              <img src={Home} />
              <div class="unit-info">
                <div class="unit-number">{unit.identifier}</div>
                <div class="unit-status">{unit.availability}</div>
              </div>

              <div class="unit-details">
                <div>
                  <div class="unit-detail-content">{unit.monthlyRent}</div>
                  <div class="unit-detail-title"> Rent</div>
                </div>

                <div>
                  <div class="unit-detail-content">{unit.securityDeposit}</div>
                  <div class="unit-detail-title">Deposit</div>
                </div>

                <div>
                  <div class="unit-detail-content">{unit.beds}</div>
                  <div class="unit-detail-title">Beds</div>
                </div>

                <div>
                  <div class="unit-detail-content">{unit.baths}</div>
                  <div class="unit-detail-title">Baths</div>
                </div>
              </div>
            </div>
            <div class="unit-actions">
              <Link to={`/dashboard/properties/${this.props.match.params.propertyIndex}/unit/${unitIndex}`}>
                <span class="edit">Edit</span>
              </Link>
            </div>
          </div>
        ));
      }

      if (this.state.addUnitFormOpen) {
        units = (
          <div class="box-form ">
            <div class="box-form-close" onClick={this.toggleAddUnitForm}>
              <i class="fa-solid fa-times"></i>
            </div>
            <div class={`box-form-content `}>
              <NewUnit onSubmit={this.handleNewUnitSubmission} />
            </div>
          </div>
        );
      }

      return (
        <div id="view-property">
          <div className="heading-row">
            <h1>
              <Link to="/dashboard">Dashboard</Link> <small>&gt;</small> <Link to="/dashboard/properties">Properties</Link> <small>&gt;</small>{" "}
              <strong>
                {property.houseNumber} {property.streetName}
              </strong>
            </h1>
          </div>
          <div className="dashboard-content">
            <div class="container">
              <div class="head">
                <div class="meta">
                  <div class="img">
                    <img src={Home} alt="home" className="home-icon" />
                  </div>
                  <div class="info">
                    <div class="line1">
                      {property.houseNumber} {property.streetName}
                    </div>
                    <div class="line2">
                      {property.city}, {property.state} {property.zipcode}
                    </div>
                  </div>
                </div>
                <div class="actions">
                  <div>
                    <button class={`edit ${this.state.editMode ? "active" : ""}`} onClick={this.toggleEditMode}>
                      Edit
                    </button>
                    <button class="delete" onClick={this.deleteProperty}>
                      Delete
                    </button>
                  </div>
                  <div class="statuses">
                    <div>
                      <strong>Status:</strong> Available
                    </div>

                    <div>
                      <strong>Rent:</strong> $100
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={this.onSubmit} className={this.state.editMode ? "" : "hidden"}>
                <div>
                  <label>House Number</label>
                  <input type="number" name="houseNumber" value={this.state.houseNumber} onChange={this.onChange} />
                </div>
                <div>
                  <label>Street Name</label>
                  <input type="text" name="streetName" value={this.state.streetName} onChange={this.onChange} />
                </div>
                <div>
                  <label>City</label>
                  <input type="text" name="city" value={this.state.city} onChange={this.onChange} />
                </div>
                <div>
                  <label>State</label>
                  <input type="text" name="state" value={this.state.state} onChange={this.onChange} disabled />
                </div>
                <div>
                  <label>Zipcode</label>
                  <input type="text" name="zipcode" value={this.state.zipcode} onChange={this.onChange} />
                </div>

                <div>
                  <input type="submit" />
                </div>
              </form>

              <div class="body">
                <div class="box">
                  <div class="box-title">
                    <h3>Units</h3>
                    <span onClick={this.toggleAddUnitForm}>
                      <i class="fa-solid fa-circle-plus"></i> Add Unit
                    </span>
                  </div>

                  <div class="box-content">{units}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    properties: state.properties,
  };
};

export default connect(mapStateToProps, { deleteProperty, updateProperty, addUnit })(withRouter(SingleProperty));
