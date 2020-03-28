import React from "react";
import { Modal, Button } from "react-bootstrap";

const PopupComponent = () => {
  return (
    <Modal show={true}>
      {/* onHide Function Needs to be Implemented for closing popup  */}
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Modal body text goes here.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary">Close</Button>
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopupComponent;
