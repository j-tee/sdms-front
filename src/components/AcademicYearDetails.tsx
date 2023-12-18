import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import AcademicYearEdit from './AcademicYearEdit';
import AcademicYearDelete from './AcademicYearDelete';
import AcademicYearDetailsModal from './AcademicYearDetailsModal';

const AcademicYearDetails = (props: any) => {
  const { year, schoolId, branchId } = props;
  const [isAcademicYearEditModalOpen, setAcademicYearEditModalOpen] = useState(false);
  const [isAcademicYearDeleteModalOpen, setAcademicYearDeleteModalOpen] = useState(false);
  const [isAcademicYearDetailsModalOpen, setAcademicYearDetailsModalOpen] = useState(false);
  const handleEdit = () => {
    setAcademicYearEditModalOpen(true)
  }

  const handleDelete = () => {
    setAcademicYearDeleteModalOpen(true)
  }

  const handleDetails = () => {
    setAcademicYearDetailsModalOpen(true)
  }
  return (
    <div className='pb-2 border border-bottom-1 border-top-0 border-right-0 border-left-0'>
      <Row className='d-flex flex-row'>
        <Col>Start Date</Col>
        <Col>End Date</Col>
      </Row>
      <Row className='d-flex flex-row'>
        <Col>{new Date(year.start_date).toDateString()}</Col>
        <Col>{new Date(year.end_date).toDateString()}</Col>
      </Row>
      <Row className='d-flex flex-row mt-3'>
        <span>
          <Card.Link fw-light onClick={handleEdit}><em>Edit</em></Card.Link>
          <Card.Link link-info  text-decoration-underline onClick={handleDelete}><em>Delete</em></Card.Link>
          <Card.Link link-info  text-decoration-underline onClick={handleDetails}><em>Details</em></Card.Link>
        </span>
      </Row>
      <AcademicYearDetailsModal 
       schoolId={schoolId} branchId={branchId} year={year}
       isOpen={isAcademicYearDetailsModalOpen}
       setAcademicYearDetailsModalOpen={setAcademicYearDetailsModalOpen}
       onRequestClose={() => setAcademicYearDetailsModalOpen(false)}
      />
      <AcademicYearDelete
        schoolId={schoolId} branchId={branchId} year={year}
        isOpen={isAcademicYearDeleteModalOpen}
        setAcademicYearDeleteModalOpen={setAcademicYearDeleteModalOpen}
        onRequestClose={() => setAcademicYearDeleteModalOpen(false)}
      />
      <AcademicYearEdit
        schoolId={schoolId} branchId={branchId} academic_year={year}
        isOpen={isAcademicYearEditModalOpen}
        setAcademicYearEditModalOpen={setAcademicYearEditModalOpen}
        onRequestClose={() => setAcademicYearEditModalOpen(false)}
      />
    </div>
  )
}

export default AcademicYearDetails
