import React, { useContext } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { deleteDepartment, getDepartments } from '../redux/slices/departmentSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';

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
    <Modal show={isOpen} animation centered onHide={onRequestClose} size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Delete Department</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this department?</p>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-secondary' onClick={onRequestClose}>Cancel</button>
        <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
      </Modal.Footer>
    </Modal>
  )
}

export default DepartmentDelete
