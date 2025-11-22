import React, { useContext } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { deleteDepartment, getDepartments } from '../redux/slices/departmentSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import '../css/ModernModal.css';

const DepartmentDelete = (props: any) => {
  const { department, params, branchId, schoolId, isOpen, onRequestClose, setDepartmentDeleteModalOpne } = props;
  const dispatch = useDispatch<AppDispatch>()
  const {setShowToast} = useContext(ToastContext)
  const handleDelete = () => {
    dispatch(deleteDepartment(department.id))
    .then((res: any) => {
      setDepartmentDeleteModalOpne(false)
      setShowToast(true)
      // showToastify(res.payload.message, res.payload.status)
      dispatch(getDepartments({ ...params, school_id: schoolId, branch_id: branchId, paginate:true }))
    })
  }
  return (
    <Modal show={isOpen} animation centered onHide={onRequestClose} size='lg' className="modern-modal delete-modal">
      <Modal.Header closeButton>
        <Modal.Title><i className="fas fa-trash-alt"></i> Delete Department</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="delete-icon">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <p className="delete-message">Are you sure you want to delete <strong>this department</strong>?</p>
        <p className="delete-warning">This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-secondary' onClick={onRequestClose}><i className="fas fa-times"></i> Cancel</button>
        <button className='btn btn-danger' onClick={handleDelete}><i className="fas fa-trash"></i> Delete</button>
      </Modal.Footer>
    </Modal>
  )
}

export default DepartmentDelete
