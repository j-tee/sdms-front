import React from "react";
import { Modal } from "react-bootstrap";

const ViewRegistrationModal = (props: any) => {
  const { isOpen, onRequestClose, params, setDetailsModalOpen } = props;
  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>View Registration Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>View Registration Details</p>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => setDetailsModalOpen(false)}>Close</button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewRegistrationModal;
