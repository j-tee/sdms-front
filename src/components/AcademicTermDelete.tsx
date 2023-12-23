import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { deleteAcademicTerm, getAcademicTerms } from '../redux/slices/calendarSlice';

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
    <Modal animation show={isOpen} centered onHide={onRequestClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Delete: {term.academic_year_name} Academic Year - {term.term_name} Term</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this term?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="danger" onClick={deleteTerm}>
          Delete
        </Button>
      </Modal.Footer>

    </Modal>
  )
}

export default AcademicTermDelete
