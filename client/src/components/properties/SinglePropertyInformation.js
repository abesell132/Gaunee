import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteProperty, getProperties } from "../../actions/propertyActions";

class SinglePropertyInformation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedProperty: ""
    };
    this.deleteProperty = this.deleteProperty.bind(this);
  }

  deleteProperty(e) {
    e.preventDefault();
    let propertyID = {
      id: this.props.properties.properties[e.currentTarget.name]._id
    };
    console.log(propertyID);
    this.props.deleteProperty(propertyID);
    this.props.getProperties();
    this.props.getProperties();
    this.props.getProperties();
  }

  componentDidMount() {
    this.setState({
      selectedProperty: this.props.selectedProperty
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedProperty !== this.props.selectedProperty) {
      this.setState({ selectedProperty: this.props.selectedProperty });
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.selectedProperty !== prevState.selectedProperty) {
      return { selectedProperty: nextProps.selectedProperty };
    } else return null;
  }

  render() {
    let properties = this.props.properties.properties;

    let propertyName = properties[this.state.selectedProperty]
      ? properties[this.state.selectedProperty].name
      : "";
    let propertyUnits = properties[this.state.selectedProperty]
      ? Object.keys(properties[this.state.selectedProperty].units).map(
          (key, unit) => (
            <div>
              <p>{properties[this.state.selectedProperty].units[key].rent}</p>
            </div>
          )
        )
      : "";

    let singleProperty = properties[this.state.selectedProperty] ? (
      <div>
        <p className="section-title">
          {propertyName}{" "}
          <button
            className="btn delete-property-button"
            onClick={this.deleteProperty}
            name={this.state.selectedProperty}
          >
            Delete
          </button>
          <Link to="/dashboard/properties/add">
            <button className="btn edit-property-button">Edit</button>
          </Link>
        </p>
        <div className="padding-20">
          <h1>{properties[this.state.selectedProperty].address1}</h1>
          {propertyUnits}
        </div>
      </div>
    ) : (
      ""
    );

    return <div>{singleProperty}</div>;
  }
}

const mapStateToProps = state => ({
  profile: state.profile,
  siteMeta: state.siteMeta,
  properties: state.properties,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteProperty, getProperties }
)(SinglePropertyInformation);
