import React, { useContext } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { Modal } from 'react-bootstrap';
import { deleteClassGroup, getClassGroups } from '../redux/slices/classGroupSlice';
import { showToastify } from '../utility/Toastify';

const ClassGroupDelete = (props: any) => {
  const { isOpen, onRequestClose, classGroup, params, branchId, schoolId, setClassGroupDeleteModalOpen } = props; 
  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);
  const handleDelete = () => {
    dispatch(deleteClassGroup({ ...classGroup }))
      .then((res: any) => {
        setShowToast(true);
        showToastify(res.payload.message, res.payload.status);
        setClassGroupDeleteModalOpen(false);
        dispatch(getClassGroups({ ...params, paginate: true, branch_id: branchId, school_id:schoolId }))
      })
    setClassGroupDeleteModalOpen(false)
  }
  return (
    <Modal show={isOpen} animation centered onHide={onRequestClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Delete Class Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete {classGroup.group_name}?</p>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-secondary' onClick={onRequestClose}>Close</button>
        <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
      </Modal.Footer>
    </Modal>
  )
}

export default ClassGroupDelete
