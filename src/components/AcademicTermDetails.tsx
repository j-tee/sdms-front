import React from 'react'
import { Modal } from 'react-bootstrap';

const AcademicTermDetails = (props: any) => {
  const { term, isOpen, setAcademicTermDetailsModalOpen, onRequestClose } = props;
  const handleClose = () => {
    setAcademicTermDetailsModalOpen(false)
  }
  return (
    <Modal show={isOpen} centered animation onHide={onRequestClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>{term.academic_year_name} Academic Year - {term.term_name} Term</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><span>Start Date</span>: <span>{term.start_date}</span></p>
        <p><span>End Date</span>: <span>{term.end_date}</span></p>
        <p><span>Completed</span>: <span>{term.completed ? 'Yes' : 'No'}</span></p>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-secondary' onClick={handleClose}>Close</button>
      </Modal.Footer>
    </Modal>
  )
}

export default AcademicTermDetails
