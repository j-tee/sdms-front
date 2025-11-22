import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { deleteAcademicTerm, getAcademicTerms } from '../redux/slices/calendarSlice';
import '../css/ModernModal.css';

const AcademicTermDelete = (props: any) => {
  const { term, schoolId, branchId, isOpen, params, onRequestClose, setAcademicTermDeleteModalOpen } = props;
  const dispatch = useDispatch<AppDispatch>()
  const {setShowToast} = useContext(ToastContext)
  const deleteTerm = () => {
    dispatch(deleteAcademicTerm(term)).then((res: any) => {
      setShowToast(true)
      showToastify(res.payload.message, res.payload.status)
      if (res.payload.status === 'success') {
        dispatch(getAcademicTerms({ ...params, year_id: term.academic_year_id, pagination: params.pagination })).then((resp: any) => {
          setAcademicTermDeleteModalOpen(false)
        }
        )
      }
    }
    )
    setAcademicTermDeleteModalOpen(false)
  }
  const closeModal = () => {
    setAcademicTermDeleteModalOpen(false)
  }
  return (
    <Modal animation show={isOpen} centered onHide={onRequestClose} size='lg' className="modern-modal delete-modal">
      <Modal.Header closeButton>
        <Modal.Title>
          <i className="fas fa-trash-alt"></i>
          Delete Term
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="delete-icon">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <p className="delete-message">Are you sure you want to delete <strong>{term.term_name}</strong> from <strong>{term.academic_year_name}</strong>?</p>
        <p className="delete-warning">This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          <i className="fas fa-times"></i>
          Cancel
        </Button>
        <Button variant="danger" onClick={deleteTerm}>
          <i className="fas fa-trash"></i>
          Delete
        </Button>
      </Modal.Footer>

    </Modal>
  )
}

export default AcademicTermDelete
