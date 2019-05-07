import React, { Component } from "react";

class QuickFact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      number: this.props.number,
      text: this.props.text,
      icon: this.props.icon
    };
  }
  render() {
    return (
      <div class="quick-facts" id={this.state.name}>
        <div className="icon-container">
          <i class={this.state.icon} />
        </div>
        <div className="text-container">
          <div>
            <h3>{this.state.number}</h3>
            <p>{this.state.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default QuickFact;
