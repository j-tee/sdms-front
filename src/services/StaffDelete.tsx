import React, { useContext } from 'react'
import { ToastContext } from '../utility/ToastContext';
import { deleteStaff, getStaffs } from '../redux/slices/staffSlice';
import { showToastify } from '../utility/Toastify';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';

const StaffDelete = (props: any) => {
  const { staff, isOpen, params, setStaffDeleteModalOpen, onRequestClose, branchId, schoolId } = props; 
  const { setShowToast } = useContext(ToastContext)
  const dispatch = useDispatch<AppDispatch>()
  const handleDelete = () => {
    dispatch(deleteStaff(staff)).then((res: any) => {
      setShowToast(true)
      showToastify(res.payload.message, res.payload.status)
      dispatch(getStaffs({...params, branch_id: branchId ? parseInt(branchId) : 0,paginate: true, school_id: schoolId ? parseInt(schoolId) : 0})) 
    })
  }
  return (
    <Modal show={isOpen} onHide={onRequestClose} animation centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Delete Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this staff?</p>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-primary' onClick={handleDelete}>Delete</button>
        <button className='btn btn-danger' onClick={onRequestClose}>Cancel</button> 
      </Modal.Footer>
    </Modal>
  )
}

export default StaffDelete
