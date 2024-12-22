import React, { useContext } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { deleteGradingScale, getGradingScales } from '../redux/slices/gradingScaleSlice';
import { showToastify } from '../utility/Toastify';
import { Form, Modal } from 'react-bootstrap';

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
    <Modal show={isOpen} animation centered onHide={onRequestClose} size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Grading Scale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you want to delete this grading scale?
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-danger">
            Delete
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onRequestClose}
          >
            Cancel
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default GradingScaleDeleteModal
