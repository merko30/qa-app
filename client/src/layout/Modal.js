import React from "react";
import { Button } from "react-bootstrap";

import Modal from "react-bootstrap/Modal";

class MyModal extends React.Component {
  render() {
    const { children, title, show, handleClose } = this.props;
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {React.Children.map(children, child =>
              React.cloneElement(child, { handleClose })
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default MyModal;
