import React, { useContext } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { Modal, ModalHeader } from 'react-bootstrap';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { deleteAdmission, getAdmissions } from '../redux/slices/admissionSlice';

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
    <Modal show={isOpen} animation centered onHide={onRequestClose}>
      <ModalHeader closeButton>
        <Modal.Title>Delete Admission</Modal.Title>
      </ModalHeader>
      <Modal.Body>
        <p>Are you sure you want to delete this admission?</p>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-secondary' onClick={onRequestClose}>Cancel</button>
        <button className='btn btn-danger' onClick={() => {handleDelete()}}>Delete</button>
      </Modal.Footer>
    </Modal>
  )
}

export default AdmissionDelete
