import React from 'react'
import { Card, Modal } from 'react-bootstrap';
import '../css/ModernModal.css';

const AcademicYearDetailsModal = (props: any) => {
  const { year, schoolId, branchId, isOpen, onRequestClose, setAcademicYearDetailsModalOpen } = props;
  return (
    <Modal animation show={isOpen} onHide={onRequestClose} size="lg" className="modern-modal details-modal">
      <Modal.Header closeButton>
        <Modal.Title><i className="fas fa-info-circle"></i> {year.academic_year} Academic Year Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <p className='d-flex justify-content-between'><span>School:</span> <span>{year.school_name}, {year.branch_name}</span></p>
            <p className='d-flex justify-content-between'><span>Start Date:</span> <span>{new Date(year.start_date).toDateString()}</span></p>
            <p className='d-flex justify-content-between'><span>End Date:</span> <span>{new Date(year.end_date).toDateString()}</span></p>
            <p className='d-flex justify-content-between'><span>Term Category:</span> <span>{year.next_term_start_date}</span></p>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => setAcademicYearDetailsModalOpen(false)} className="btn btn-primary"><i className="fas fa-times"></i> Close</button>
      </Modal.Footer>
    </Modal>
  )
}

export default AcademicYearDetailsModal
