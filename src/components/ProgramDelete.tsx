import React, { useContext } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { Modal } from 'react-bootstrap';
import { deleteProgram, getPrograms } from '../redux/slices/programSlice';
import { showToastify } from '../utility/Toastify';

const ProgramDelete = (props: any) => {
  const { isOpen, onRequestClose, program, params, branchId, schoolId, setProgramDeleteModalOpne } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);
  const handleDelete = () => {
    dispatch(deleteProgram({ ...program }))
      .then((res: any) => {
        setShowToast(true);
        showToastify(res.payload.message, res.payload.status);
        setProgramDeleteModalOpne(false);
        dispatch(getPrograms({ ...params, branch_id: branchId, school_id: schoolId, department_id: program.department_id, paginate: true }))
      })
    setProgramDeleteModalOpne(false)
  }
  return (
    <Modal show={isOpen} onHide={onRequestClose} animation centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Program</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete {program.prog_name}?</p>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-secondary' onClick={onRequestClose}>Close</button>
        <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProgramDelete
