import React, { Component } from "react";

class QuickFact extends Component {
  render() {
    return (
      <div class="quick-facts" id="messages">
        <div className="icon-container">
          <i class="fas fa-inbox" />
        </div>
        <div className="text-container">
          <div>
            <h3>2</h3>
            <p>Unread Messages</p>
          </div>
        </div>
      </div>
    );
  }
}

export default QuickFact;
