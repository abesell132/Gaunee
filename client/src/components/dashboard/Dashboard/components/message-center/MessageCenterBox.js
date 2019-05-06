import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./message-center.css";

class MessageCenterBox extends Component {
  render() {
    return (
      <div className="message-center">
        <div className="change-later">
          <p>
            <Link to="/dashboard/messages">Message Center</Link>
          </p>
        </div>
      </div>
    );
  }
}

export default MessageCenterBox;
