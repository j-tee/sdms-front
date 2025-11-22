import React, { useContext } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { deleteBranch, getBranches } from '../redux/slices/schoolSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { Modal } from 'react-bootstrap';
import '../css/ModernModal.css';

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
      <Modal show={isOpen} animation centered onHide={onRequestClose} size='lg' className="modern-modal delete-modal">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-trash-alt"></i>
            Delete Branch
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="delete-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <p className="delete-message">Are you sure you want to delete <strong>{branch.branch_name}</strong>?</p>
          <p className="delete-warning">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={onRequestClose}>
            <i className="fas fa-times"></i>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleSubmit}>
            <i className="fas fa-trash"></i>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    )
  
}

export default BranchDelete
