import React, { useContext } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { deleteBranch, getBranches } from '../redux/slices/schoolSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { Modal } from 'react-bootstrap';

const BranchDelete = (props: any) => {
  const { branch, params, schoolId, isOpen, onRequestClose, setBranchDeleteModalOpen } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext)
  const handleSubmit = () => {
    dispatch(deleteBranch(branch)).then((res: any) => {
      setShowToast(true);
      showToastify(res.payload.message, res.payload.status);
      if (res.payload.status === 'success') {
        dispatch(getBranches({ ...params, pagination: params.pagination })).then((resp: any) => {
          setBranchDeleteModalOpen(false);
        });
      }

    }
    );
  }
    return (
      <Modal show={isOpen} animation centered onHide={onRequestClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Delete: {branch.branch_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this branch?</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-danger" onClick={handleSubmit}>Delete</button>
          <button className="btn btn-secondary" onClick={onRequestClose}>Cancel</button>
        </Modal.Footer>
      </Modal>
    )
  
}

export default BranchDelete
