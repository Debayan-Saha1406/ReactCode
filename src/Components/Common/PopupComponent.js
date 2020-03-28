import React from "react";
import { Modal, Button } from "react-bootstrap";

const PopupComponent = (props) => {
  return (
    <Modal show={props.showPopup}>
      <Modal.Header >
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.modalBody}</p>
      </Modal.Body>
      <Modal.Footer>
  <Button variant="secondary" onClick={props.togglePopUp} >{props.modalCancelButtonText}</Button>
  <Button variant="primary" onClick={props.togglePopUp} >{props.modalOKButtonText}</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopupComponent;
