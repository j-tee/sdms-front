import React from 'react'
import { Card, Modal, ModalHeader } from 'react-bootstrap';

const AdmissionDetails = (props: any) => {
  const { admission, isOpen, onRequestClose, setAdmissionDetailsModalOpen } = props;
  const handleClose = () => {
    setAdmissionDetailsModalOpen(false)
  }
  return (
    <Modal show={isOpen} centered animation onHide={onRequestClose} size='lg'>
      <ModalHeader closeButton>
        <Modal.Title>Admission Details</Modal.Title>
      </ModalHeader>
      <Modal.Body>
        <Card>
          <div className='d-flex flex-column flex-lg-row gap-3'>
            <Card.Img variant="top" src={admission.picture} style={{ width: "100px" }} />
            <Card.Title className='d-flex flex-column text-muted'>
              <span>
                {admission.student_name}
              </span>
              <span>
                {admission.admission_stage}
              </span>
              <span>
                {admission.admission_program}
              </span>
              <span>
                {new Date(admission.admission_date).toDateString()}
              </span>
            </Card.Title>
          </div>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-secondary' onClick={handleClose}>Close</button>
      </Modal.Footer>
    </Modal>
  )
}

export default AdmissionDetails
