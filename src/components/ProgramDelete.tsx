import React, { useContext } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { Modal } from 'react-bootstrap';
import { deleteProgram, getPrograms } from '../redux/slices/programSlice';
import { showToastify } from '../utility/Toastify';
import '../css/ModernModal.css';

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
    <Modal show={isOpen} onHide={onRequestClose} animation centered className="modern-modal delete-modal">
      <Modal.Header closeButton>
        <Modal.Title><i className="fas fa-trash-alt"></i> Delete Program</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="delete-icon">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <p className="delete-message">Are you sure you want to delete <strong>{program.prog_name}</strong>?</p>
        <p className="delete-warning">This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-secondary' onClick={onRequestClose}><i className="fas fa-times"></i> Close</button>
        <button className='btn btn-danger' onClick={handleDelete}><i className="fas fa-trash"></i> Delete</button>
      </Modal.Footer>
    </Modal>
  )
}

export default ProgramDelete
