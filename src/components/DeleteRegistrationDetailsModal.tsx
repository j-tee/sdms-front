import React from 'react'
import { Modal } from 'react-bootstrap';

const DeleteRegistrationDetailsModal = (props: any) => {
    const { isOpen, onRequestClose, setDeleteModalOpen, params } = props;

  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Registration Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Delete Registration Details</p>
        </Modal.Body>
        <Modal.Footer>
            <button onClick={() => setDeleteModalOpen(false)}>Close</button>
        </Modal.Footer>
    </Modal>
  )
}

export default DeleteRegistrationDetailsModal
