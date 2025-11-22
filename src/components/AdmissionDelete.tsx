import React, { useContext } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { Modal, ModalHeader } from 'react-bootstrap';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { deleteAdmission, getAdmissions } from '../redux/slices/admissionSlice';
import '../css/ModernModal.css';

const AdmissionDelete = (props: any) => {
  const { schoolId, branchId, admission, isOpen, params, setAdmissionDeleteModalOpen, onRequestClose } = props;
  const dispatch = useDispatch<AppDispatch>()
  const { setShowToast } = useContext(ToastContext)
  const handleDelete = () => {
    dispatch(deleteAdmission({ ...admission}))
    .then((res: any) => {
      dispatch(getAdmissions({ ...params, school_id: schoolId, branch_id: branchId, paginate: true }))
      setShowToast(true)
      showToastify(res.payload.message, res.payload.status)
    }   
    )
    setAdmissionDeleteModalOpen(true)
  }
  return (
    <Modal show={isOpen} animation centered onHide={onRequestClose} className="modern-modal delete-modal">
      <ModalHeader closeButton>
        <Modal.Title><i className="fas fa-trash-alt"></i> Delete Admission</Modal.Title>
      </ModalHeader>
      <Modal.Body>
        <div className="delete-icon">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <p className="delete-message">Are you sure you want to delete <strong>this admission</strong>?</p>
        <p className="delete-warning">This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-secondary' onClick={onRequestClose}><i className="fas fa-times"></i> Cancel</button>
        <button className='btn btn-danger' onClick={() => {handleDelete()}}><i className="fas fa-trash"></i> Delete</button>
      </Modal.Footer>
    </Modal>
  )
}

export default AdmissionDelete
