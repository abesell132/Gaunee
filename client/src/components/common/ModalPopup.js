import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./common.css";
class ModalPopup extends Component {
  render() {
    return (
      <div>
        <Modal
          size={this.props.size}
          show={this.props.showModal}
          dialogClassName={this.props.dialogClassName}
          centered
        >
          <Modal.Header closeButton onClick={this.props.onHide}>
            <Modal.Title id="contained-modal-title-vcenter">
              {this.props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.bodyContent}</Modal.Body>
          <Modal.Footer className={this.props.showFooter ? "" : "hidden"}>
            <Button onClick={this.props.onHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ModalPopup;
