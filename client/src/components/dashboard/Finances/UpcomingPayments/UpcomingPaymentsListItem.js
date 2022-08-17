import React, { Component } from "react";

class UpcomingPaymentsListItem extends Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };
  }

  toggleDescription = () => this.setState({ isOpen: !this.state.isOpen });

  render() {
    return (
      <>
        <tr onClick={this.toggleDescription}>
          <td>Aug 01, 2022</td>
          <td>
            <strong>Rent</strong>
            <br />
            <small>Shared Accross Properties</small>
          </td>
          <td>$1,000</td>

          <td>
            <i class="fas fa-angle-down"></i>
          </td>
        </tr>

        <tr className={`description ${this.state.isOpen ? "" : "hidden"}`}>
          <td colSpan={4}>
            <div>
              <label></label>
            </div>
            <div class="upload">
              <i class="fas fa-cloud-upload"></i>
              <span>Drag and drop, or browse your files</span>
            </div>

            <div class="upcoming-charges-actions">
              <i class="fas fa-pen"></i>
              <i class="fas fa-trash-alt"></i>
              <button>Mark Complete</button>
            </div>
          </td>
        </tr>
      </>
    );
  }
}

export default UpcomingPaymentsListItem;
