import React, { useContext } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { Modal } from 'react-bootstrap';
import { deleteClassGroup, getClassGroups } from '../redux/slices/classGroupSlice';
import { showToastify } from '../utility/Toastify';
import '../css/ModernModal.css';

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
    <Modal show={isOpen} animation centered onHide={onRequestClose} size='lg' className="modern-modal delete-modal">
      <Modal.Header closeButton>
        <Modal.Title><i className="fas fa-trash-alt"></i> Delete Class Group</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="delete-icon">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <p className="delete-message">Are you sure you want to delete <strong>{classGroup.group_name}</strong>?</p>
        <p className="delete-warning">This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-secondary' onClick={onRequestClose}><i className="fas fa-times"></i> Close</button>
        <button className='btn btn-danger' onClick={handleDelete}><i className="fas fa-trash"></i> Delete</button>
      </Modal.Footer>
    </Modal>
  )
}

export default ClassGroupDelete
