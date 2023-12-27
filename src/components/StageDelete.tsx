import React, { useContext } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { deleteStage, getStages } from '../redux/slices/stageSlice';
import { Modal } from 'react-bootstrap';

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
        dispatch(getStages({ ...params, paginate: true, branch_id: branchId }))
      })
    setStageDeleteModalOpen(false)
  }
  return (
    <Modal show={isOpen} onHide={onRequestClose} animation centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Delete Stage</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete {stage.stage_name}?</p>
      </Modal.Body>
      <Modal.Footer>
        <button className='btn btn-secondary' onClick={onRequestClose}>Close</button>
        <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
      </Modal.Footer>
    </Modal>
  )
}

export default StageDelete
