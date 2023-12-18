import React, { useContext } from 'react'
import { Form, Modal } from 'react-bootstrap';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { deleteAcademicYear, getAcademicYears } from '../redux/slices/calendarSlice';

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
      <Modal animation show={isOpen} onHide={onRequestClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Delete Academic Year</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this academic year?</p>
          <p>Start Date: {new Date(year.start_date).toDateString()}</p>
          <p>End Date: {new Date(year.end_date).toDateString()}</p>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleDelete} className="btn btn-primary">Yes</button>
          <button onClick={handleNoDeleteClick} className="btn btn-primary">No</button>
        </Modal.Footer>
      </Modal>
    </Form>
  )
}

export default AcademicYearDelete


