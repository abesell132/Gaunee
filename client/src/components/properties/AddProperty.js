import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import update from "react-addons-update";
import { addProperty, getProperties } from "../../actions/propertyActions";

import "./add-property.css";

class AddProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipcode: "",
      units: [],
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.addUnit = this.addUnit.bind(this);
    this.onChangeOfRepeaterField = this.onChangeOfRepeaterField.bind(this);
    this.deleteUnit = this.deleteUnit.bind(this);

    // this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  addUnit() {
    console.log("clicked");
    let newelement = {
      rent: "",
      baths: "",
      beds: "",
      squareFeet: ""
    };
    this.setState(prevState => ({
      units: [...prevState.units, newelement]
    }));
  }
  deleteUnit(e) {
    const index = parseInt(e.currentTarget.name);
    const filteredItems = this.state.units
      .slice(0, index)
      .concat(this.state.units.slice(index + 1, this.state.units.length));
    console.log(filteredItems);
    this.setState({
      units: filteredItems
    });
  }

  onChangeOfRepeaterField(e) {
    e.preventDefault();
    var res = e.currentTarget.name.split("-");
    console.log(e.target.value);
    res[1] = parseInt(res[1]);
    switch (res[0]) {
      case "baths":
        this.setState({
          units: update(this.state.units, {
            [res[1]]: { baths: { $set: e.target.value } }
          })
        });
        return;
      case "beds":
        this.setState({
          units: update(this.state.units, {
            [res[1]]: { beds: { $set: e.target.value } }
          })
        });
        return;
      case "rent":
        if (this.state.units[res[1]].rent) {
          this.setState({
            units: update(this.state.units, {
              [res[1]]: { rent: { $set: e.target.value } }
            })
          });
        } else {
          this.setState({
            units: update(this.state.units, {
              [res[1]]: { rent: { $set: `$${e.target.value}` } }
            })
          });
        }

        return;

      case "squareFeet":
        this.setState({
          units: update(this.state.units, {
            [res[1]]: { squareFeet: { $set: e.target.value } }
          })
        });
        return;
      default:
        console.log("default");
        return;
    }
  }

  onChange(e) {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    this.setState(
      {
        errors: {}
      },
      () => {
        const propertyData = {
          address1: this.state.address1,
          address2: this.state.address2,
          city: this.state.city,
          state: this.state.state,
          zipcode: this.state.zipcode,
          units: this.state.units
        };
        this.setState(
          {
            address1: "",
            address2: "",
            city: "",
            state: "",
            zipcode: "",
            units: []
          },
          () => {
            this.props.addProperty(propertyData);
            this.props.getProperties();
            this.props.getProperties();
            this.props.getProperties();
          }
        );
      }
    );

    e.preventDefault();
  }

  render() {
    let properties = this.state.units.map((unit, index) => (
      <div className="unit-container">
        <div class="row">
          <div className="col-sm-3">
            <TextFieldGroup
              type="number"
              label="# of Baths"
              placeholder="2"
              name={`baths-${index}`}
              value={this.state.units[index].baths}
              onChange={this.onChangeOfRepeaterField}
            />
          </div>
          <div className="col-sm-3">
            <TextFieldGroup
              type="number"
              label="# of Bedrooms"
              placeholder="3"
              name={`beds-${index}`}
              value={this.state.units[index].beds}
              onChange={this.onChangeOfRepeaterField}
            />
          </div>
          <div className="col-sm-3">
            <TextFieldGroup
              type="text"
              label="Rent"
              placeholder="$450"
              name={`rent-${index}`}
              value={this.state.units[index].rent}
              onChange={this.onChangeOfRepeaterField}
            />
          </div>
          <div className="col-sm-3">
            <TextFieldGroup
              type="number"
              label="Square Feet"
              placeholder="2317"
              name={`squareFeet-${index}`}
              value={this.state.units[index].squareFeet}
              onChange={this.onChangeOfRepeaterField}
            />
          </div>
        </div>
        <div className="button-container">
          <button
            className="btn btn-danger"
            name={index}
            onClick={this.deleteUnit}
          >
            Delete Unit
          </button>
        </div>
      </div>
    ));
    const { errors } = this.state;

    const options = [
      {
        label: "Select State",
        value: 0
      },
      {
        label: "Alabama - AL",
        value: "Alabama"
      },
      {
        label: "Alaska - AK",
        value: "Alaska"
      },
      {
        label: "Arizona - AZ",
        value: "Arizona"
      },
      {
        label: "Arkansas - AR",
        value: "Arkansas"
      },
      {
        label: "California - CA",
        value: "California"
      },
      {
        label: "Colorado - CO",
        value: "Colorado"
      },
      {
        label: "Connecticut - CT",
        value: "Connecticut"
      },
      {
        label: "Delaware - DE",
        value: "Delaware"
      },
      {
        label: "Florida - FL",
        value: "Florida"
      },
      {
        label: "Georgia - GA",
        value: "Georgia"
      },
      {
        label: "Hawaii - HI",
        value: "Hawaii"
      },
      {
        label: "Idaho - ID",
        value: "Idaho"
      },
      {
        label: "Illinois - IL",
        value: "Illinois"
      },
      {
        label: "Indiana - IN",
        value: "Indiana"
      },
      {
        label: "Iowa - IA",
        value: "Iowa"
      },
      {
        label: "Kansas - KS",
        value: "Kansas"
      },
      {
        label: "Kentucky - KY",
        value: "Kentucky"
      },
      {
        label: "Louisiana - LA",
        value: "Louisiana"
      },
      {
        label: "Maine - ME",
        value: "Maine"
      },
      {
        label: "Maryland - MD",
        value: "Maryland"
      },
      {
        label: "Massachusetts - MA",
        value: "Massachusetts"
      },
      { label: "Michigan - MI", value: "Michigan" },
      {
        label: "Minnesota - MN",
        value: "Minnesota"
      },

      {
        label: "Mississippi - MS",
        value: "Mississippi"
      },
      {
        label: "Missouri - MO",
        value: "Missouri"
      },
      {
        label: "Montana - MT",
        value: "Montana"
      },
      {
        label: "Nebraska - NE",
        value: "Nebraska"
      },
      {
        label: "Nevada - NV",
        value: "Nevada"
      },
      {
        label: "New Hampshire - NH",
        value: "New Hampshire"
      },
      {
        label: "New Jersey - NJ",
        value: "New Jersey"
      },
      {
        label: "New Mexico - NM",
        value: "New Mexico"
      },
      {
        label: "New York - NY",
        value: "New York"
      },
      {
        label: "North Carolina - NC",
        value: "North Carolina"
      },
      {
        label: "North Dakota - ND",
        value: "North Dakota"
      },
      {
        label: "Ohio - OH",
        value: "Ohio"
      },
      {
        label: "Oklahoma - OK",
        value: "Oklahoma"
      },
      {
        label: "Oregon - OR",
        value: "Oregon"
      },
      {
        label: "Pennsylvania - PA",
        value: "Pennsylvania"
      },
      {
        label: "Rhode Island - RI",
        value: "Rhode Island"
      },
      {
        label: "South Carolina - SC",
        value: "South Carolina"
      },
      {
        label: "South Dakota - SD",
        value: "South Dakota"
      },
      {
        label: "Tennessee - TN",
        value: "Tennessee"
      },
      {
        label: "Texas - TX",
        value: "Texas"
      },
      {
        label: "Utah - UT",
        value: "Utah"
      },
      {
        label: "Vermont - VT",
        value: "Vermont"
      },
      {
        label: "Virginia - VA",
        value: "Virginia"
      },
      {
        label: "Washington - WA",
        value: "Washington"
      },
      {
        label: "West Virginia - WV",
        value: "West Virginia"
      },
      {
        label: "Wisconsin - WI",
        value: "Wisconsin"
      },
      {
        label: "Wyoming - WY",
        value: "Wyoming"
      },
      {
        label: "American Samoa - AS",
        value: "American Samoa"
      },
      {
        label: "District of Columbia - DC",
        value: "District of Columbia"
      },
      {
        label: "Federated States of Micronesia - FM",
        value: "Federated States of Micronesia"
      },
      {
        label: "Guam - GU",
        value: "Guam"
      },
      {
        label: "Marshall Islands - MH",
        value: "Marshall Islands"
      },
      {
        label: "Northern Mariana Islands - MP",
        value: "Northern Mariana Islands"
      },
      {
        label: "Palau - PW",
        value: "Palau"
      },
      {
        label: "Puerto Rico - PR",
        value: "Puerto Rico"
      },
      {
        label: "Virgin Islands - VI",
        value: "Virgin Islands"
      }
    ];

    return (
      <div className="add-property">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Add Property</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Address Line 1"
                  name="address1"
                  value={this.state.address1}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="Address Line 2"
                  name="address2"
                  value={this.state.address2}
                  onChange={this.onChange}
                />
                <div className="row">
                  <div className="col-sm-4">
                    <TextFieldGroup
                      placeholder="City"
                      name="city"
                      value={this.state.city}
                      onChange={this.onChange}
                    />
                  </div>
                  <div className="col-sm-4">
                    <SelectListGroup
                      name="state"
                      value={this.state.state}
                      onChange={this.onChange}
                      options={options}
                      error={errors.status}
                    />
                  </div>
                  <div className="col-sm-4">
                    <TextFieldGroup
                      placeholder="Zipcode"
                      name="zipcode"
                      value={this.state.zipcode}
                      onChange={this.onChange}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={this.addUnit}
                    className="btn btn-light repeater-form-button"
                  >
                    Add Unit
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                <div className="repeater-inputs">{properties}</div>
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddProperty.propTypes = {
  profile: PropTypes.object.isRequired,
  addProperty: PropTypes.func.isRequired,
  getProperties: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addProperty, getProperties }
)(withRouter(AddProperty));
