import React from "react";
import { Modal, Button } from "react-bootstrap";

const PopupComponent = props => {
  return (
    <Modal show={props.showPopup}>
      <Modal.Header>
        <Modal.Title>{props.modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{props.modalBody}</p>
      </Modal.Body>
      <Modal.Footer>
        {props.showCancelButton && <Button
          variant="secondary"
          name="No"
          onClick={props.togglePopUp}
        >
          {props.modalCancelButtonText}
        </Button>
        }
        <Button
          variant="primary"
          name="Yes"
          onClick={props.togglePopUp}
        >
          {props.modalOKButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PopupComponent;
