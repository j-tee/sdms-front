import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const ScoreSheetDeleteModal = (props: any) => {
  const {isOpen, params, scoreSheet, setDeleteModalOpen, onRequestClose, branchId, schoolId} = props
  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Score Sheet</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this score sheet?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>
          Close
        </Button>
        <Button variant="danger" onClick={() => {
          // deleteScoreSheet(branchId, schoolId, params.id)
          setDeleteModalOpen(false)
        }}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ScoreSheetDeleteModal