import React, { useContext } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { deleteGradingScale, getGradingScales } from '../redux/slices/gradingScaleSlice';
import { showToastify } from '../utility/Toastify';
import { Form, Modal } from 'react-bootstrap';
import '../css/ModernModal.css';

const GradingScaleDeleteModal = (props: any) => {
    const {
        schoolId,
        branchId,
        isOpen,
        grading,
        onRequestClose,
        setDeleteModalOpen,
      } = props;
      const dispatch = useDispatch<AppDispatch>();
        const { setShowToast } = useContext(ToastContext);

    const handleSubmit = (e: any) => {
        e.preventDefault();
    
        dispatch(deleteGradingScale(grading.id)).then((result: any) => {
          setShowToast(true);
          setDeleteModalOpen(false);
          showToastify(result.payload.message, result.payload.status);
          dispatch(getGradingScales({ school_id: schoolId, branch_id: branchId }));
        });
      };
  return (
    <Modal show={isOpen} animation centered onHide={onRequestClose} size="lg" className="modern-modal delete-modal">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title><i className="fas fa-trash-alt"></i> Delete Grading Scale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="delete-icon">
            <i className="fas fa-exclamation-triangle"></i>
          </div>
          <p className="delete-message">Are you sure you want to delete <strong>this grading scale</strong>?</p>
          <p className="delete-warning">This action cannot be undone.</p>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-danger">
            <i className="fas fa-trash"></i> Delete
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onRequestClose}
          >
            <i className="fas fa-times"></i> Cancel
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default GradingScaleDeleteModal
