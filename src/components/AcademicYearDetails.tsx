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
    <div className='academic-year-item-modern'>
      <div className="academic-year-dates-grid">
        <div className="date-info-item">
          <div className="date-info-icon">
            <i className="fas fa-calendar-day"></i>
          </div>
          <div className="date-info-content">
            <div className="date-info-label">Start Date</div>
            <div className="date-info-value">{new Date(year.start_date).toDateString()}</div>
          </div>
        </div>
        <div className="date-info-item">
          <div className="date-info-icon">
            <i className="fas fa-calendar-check"></i>
          </div>
          <div className="date-info-content">
            <div className="date-info-label">End Date</div>
            <div className="date-info-value">{new Date(year.end_date).toDateString()}</div>
          </div>
        </div>
      </div>
      <div className="academic-year-actions">
        <button className="academic-year-action-btn edit-btn" onClick={handleEdit}>
          <i className="fas fa-edit"></i>
          Edit
        </button>
        <button className="academic-year-action-btn details-btn" onClick={handleDetails}>
          <i className="fas fa-info-circle"></i>
          Details
        </button>
        <button className="academic-year-action-btn delete-btn" onClick={handleDelete}>
          <i className="fas fa-trash-alt"></i>
          Delete
        </button>
      </div>
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
