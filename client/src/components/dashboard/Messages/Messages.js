import React, { Component } from "react";
import { Link } from "react-router-dom";
import { updateActivePage } from "../../../redux/actions/siteMetaActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./Messages.css";

class Messages extends Component {
  UNSAFE_componentWillMount() {
    this.props.updateActivePage("Message Center");
  }

  componentDidMount() {
    var element = document.getElementById("messages");

    element.scrollTop = element.scrollHeight;
  }
  render() {
    return (
      <div>
        <div className="heading-row">
          <h1>
            <Link to="/dashboard">Dashboard</Link> <small>&gt;</small> <strong>Messages</strong>
          </h1>
        </div>
        <div className="dashboard-content">
          <div id="message-center">
            <div class="conversations">
              <div class="head">
                <strong>Contacts</strong>
              </div>
              <div class="contact">
                <div class="name">Sharon</div>
                <div class="unread">1</div>
              </div>

              <div class="contact">
                <div class="name">Jim</div>
                <div class="unread">1</div>
              </div>

              <div class="contact">
                <div class="name">Augie</div>
              </div>
            </div>

            <div class="conversation">
              <div class="messages" id="messages">
                <div class="message sent">
                  <div class="content">latest</div>
                  <div class="time">July 4, 2022 at 5:53pm</div>
                </div>
                <div class="message received">
                  <div class="content">Do something about it</div>
                  <div class="time">July 4, 2022 at 5:54pm</div>
                </div>
                <div class="message sent">
                  <div class="content">My fridge is leaking</div>
                  <div class="time">July 4, 2022 at 5:53pm</div>
                </div>
                <div class="message received">
                  <div class="content">Do something about it</div>
                  <div class="time">July 4, 2022 at 5:54pm</div>
                </div>
                <div class="message sent">
                  <div class="content">My fridge is leaking</div>
                  <div class="time">July 4, 2022 at 5:53pm</div>
                </div>
                <div class="message received">
                  <div class="content">Do something about it</div>
                  <div class="time">July 4, 2022 at 5:54pm</div>
                </div>
                <div class="message sent">
                  <div class="content">My fridge is leaking</div>
                  <div class="time">July 4, 2022 at 5:53pm</div>
                </div>
                <div class="message received">
                  <div class="content">Do something about it</div>
                  <div class="time">July 4, 2022 at 5:54pm</div>
                </div>
                <div class="message sent">
                  <div class="content">My fridge is leaking</div>
                  <div class="time">July 4, 2022 at 5:53pm</div>
                </div>
                <div class="message received">
                  <div class="content">Do something about it</div>
                  <div class="time">July 4, 2022 at 5:54pm</div>
                </div>
                <div class="message sent">
                  <div class="content">My fridge is leaking</div>
                  <div class="time">July 4, 2022 at 5:53pm</div>
                </div>
                <div class="message received">
                  <div class="content">Do something about it</div>
                  <div class="time">July 4, 2022 at 5:54pm</div>
                </div>
                <div class="message sent">
                  <div class="content">My fridge is leaking</div>
                  <div class="time">July 4, 2022 at 5:53pm</div>
                </div>
                <div class="message received">
                  <div class="content">Do something about it</div>
                  <div class="time">July 4, 2022 at 5:54pm</div>
                </div>
                <div class="message sent">
                  <div class="content">My fridge is leaking</div>
                  <div class="time">July 4, 2022 at 5:53pm</div>
                </div>
                <div class="message received">
                  <div class="content">Do something about it</div>
                  <div class="time">July 4, 2022 at 5:54pm</div>
                </div>
                <div class="message sent">
                  <div class="content">My fridge is leaking</div>
                  <div class="time">July 4, 2022 at 5:53pm</div>
                </div>
                <div class="message received">
                  <div class="content">Do something about it</div>
                  <div class="time">July 4, 2022 at 5:54pm</div>
                </div>
                <div class="message sent">
                  <div class="content">My fridge is leaking</div>
                  <div class="time">July 4, 2022 at 5:53pm</div>
                </div>
                <div class="message received">
                  <div class="content">Do something about it</div>
                  <div class="time">July 4, 2022 at 5:54pm</div>
                </div>
                <div class="message sent">
                  <div class="content">My fridge is leaking</div>
                  <div class="time">July 4, 2022 at 5:53pm</div>
                </div>
                <div class="message received">
                  <div class="content">Do something about it</div>
                  <div class="time">July 4, 2022 at 5:54pm</div>
                </div>
                <div class="message sent">
                  <div class="content">My fridge is leaking</div>
                  <div class="time">July 4, 2022 at 5:53pm</div>
                </div>
                <div class="message received">
                  <div class="content">Do something about it</div>
                  <div class="time">July 4, 2022 at 5:54pm</div>
                </div>
              </div>
              <div class="compose">
                <input type="text"></input>
                <input type="submit" value={"Send"}></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Messages.propTypes = {
  updateActivePage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  siteMeta: state.siteMeta,
  properties: state.properties,
  auth: state.auth,
});

export default connect(mapStateToProps, { updateActivePage })(Messages);
