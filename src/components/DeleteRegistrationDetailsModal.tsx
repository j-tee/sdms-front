import React from 'react'
import { Modal } from 'react-bootstrap';
import '../css/ModernModal.css';

const DeleteRegistrationDetailsModal = (props: any) => {
    const { isOpen, onRequestClose, setDeleteModalOpen, params } = props;

  return (
    <Modal show={isOpen} onHide={onRequestClose} className="modern-modal delete-modal">
      <Modal.Header closeButton>
        <Modal.Title><i className="fas fa-trash-alt"></i> Delete Registration Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="delete-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <p className="delete-message">Are you sure you want to delete <strong>these registration details</strong>?</p>
          <p className="delete-warning">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
            <button onClick={() => setDeleteModalOpen(false)} className="btn btn-secondary"><i className="fas fa-times"></i> Close</button>
        </Modal.Footer>
    </Modal>
  )
}

export default DeleteRegistrationDetailsModal
