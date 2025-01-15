import React from 'react'
import { Form, Modal } from 'react-bootstrap'

const UpdateRegistrationDetails = (props: any) => {
    const { params, onRequestClose, isOpen, setUpdateModalOpen} = props
    const handleSubmit = (e: any) => {
        e.preventDefault();
    }
  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Form onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>Update Registration Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Update Registration Details</p>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => setUpdateModalOpen(false)}>Close</button>
      </Modal.Footer>
        </Form>
    </Modal>
  )
}

export default UpdateRegistrationDetails
