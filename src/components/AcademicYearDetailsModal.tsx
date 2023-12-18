import React from 'react'
import { Card, Modal } from 'react-bootstrap';

const AcademicYearDetailsModal = (props: any) => {
  const { year, schoolId, branchId, isOpen, onRequestClose, setAcademicYearDetailsModalOpen } = props;
  return (
    <Modal animation show={isOpen} onHide={onRequestClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{year.academic_year} Academic Year Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <p className='d-flex justify-content-between'><span>School:</span> <span>{year.school_name}, {year.branch_name}</span></p>
            <p className='d-flex justify-content-between'><span>Start Date:</span> <span>{new Date(year.start_date).toDateString()}</span></p>
            <p className='d-flex justify-content-between'><span>End Date:</span> <span>{new Date(year.end_date).toDateString()}</span></p>
            <p className='d-flex justify-content-between'><span>Term Category:</span> <span>{year.term_category}</span></p>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => setAcademicYearDetailsModalOpen(false)} className="btn btn-primary">Close</button>
      </Modal.Footer>
    </Modal>
  )
}

export default AcademicYearDetailsModal
