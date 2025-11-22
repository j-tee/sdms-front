import React, { useContext } from 'react'
import { Form, Modal } from 'react-bootstrap';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { deleteAcademicYear, getAcademicYears } from '../redux/slices/calendarSlice';
import '../css/ModernModal.css';

const AcademicYearDelete = (props: any) => {
  const { setAcademicYearDeleteModalOpen, year, schoolId, branchId, isOpen, onRequestClose } = props;
  const dispatch = useDispatch<AppDispatch>()
  const { setShowToast } = useContext(ToastContext)

  const handleNoDeleteClick = () => {
    setAcademicYearDeleteModalOpen(false)
  }
  const handleDelete = () => {
    dispatch(deleteAcademicYear(year)).then((res: any) => {
      setShowToast(true)
      showToastify(res.payload.message, res.payload.status)
      if (res.payload.status === 'success') {
        dispatch(getAcademicYears({ school_id: schoolId, branch_id: branchId, pagination: { current_page: 1, per_page: 10 } }));
      }
    }
    )
    setAcademicYearDeleteModalOpen(false)
  }

  return (
    <Form>
      <Modal animation show={isOpen} onHide={onRequestClose} size="lg" className="modern-modal delete-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-trash-alt"></i>
            Delete Academic Year
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="delete-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <p className="delete-message">Are you sure you want to delete this academic year?</p>
          <div className="alert alert-warning">
            <strong>Start Date:</strong> {new Date(year.start_date).toDateString()}<br/>
            <strong>End Date:</strong> {new Date(year.end_date).toDateString()}
          </div>
          <p className="delete-warning">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleNoDeleteClick} className="btn btn-secondary">
            <i className="fas fa-times"></i>
            Cancel
          </button>
          <button onClick={handleDelete} className="btn btn-danger">
            <i className="fas fa-trash"></i>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </Form>
  )
}

export default AcademicYearDelete


