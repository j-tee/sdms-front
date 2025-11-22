import React, { useContext } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { deleteStage, getStages } from '../redux/slices/stageSlice';
import { Modal } from 'react-bootstrap';
import '../css/ModernModal.css';

const StageDelete = (props: any) => {
  const { isOpen, onRequestClose, stage, params, branchId, schoolId, setStageDeleteModalOpen } = props; 
  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);
  const handleDelete = () => {
    dispatch(deleteStage({ ...stage }))
      .then((res: any) => {
        setShowToast(true);
        // showToastify(res.payload.message, res.payload.status);
        setStageDeleteModalOpen(false);
        if(branchId)
        dispatch(getStages({ ...params, paginate: true, branch_id: branchId }))
      })
    setStageDeleteModalOpen(false)
  }
  return (
    <Modal show={isOpen} onHide={onRequestClose} animation centered size='lg' className="modern-modal delete-modal">
      <Modal.Header closeButton>
        <Modal.Title><i className="fas fa-trash-alt"></i> Delete Stage</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="delete-icon">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <p className="delete-message">Are you sure you want to delete <strong>{stage.stage_name}</strong>?</p>
        <p className="delete-warning">This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-secondary' onClick={onRequestClose}><i className="fas fa-times"></i> Close</button>
        <button className='btn btn-danger' onClick={handleDelete}><i className="fas fa-trash"></i> Delete</button>
      </Modal.Footer>
    </Modal>
  )
}

export default StageDelete
