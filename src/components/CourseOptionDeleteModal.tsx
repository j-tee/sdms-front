import React, { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { deleteCourseOption, getCourseOptions } from '../redux/slices/programSubjectSlice';
import { showToastify } from '../utility/Toastify';
import '../css/ModernModal.css';

interface CourseOptionDeleteModalProps {
  subjectId: number;
  params: any;
  isOpen: boolean;
  onRequestClose: () => void;
  setCourseOptionDeleteModalOpen: (isOpen: boolean) => void;
}

const CourseOptionDeleteModal: FC<CourseOptionDeleteModalProps> = ({
  subjectId,
  params,
  isOpen,
  onRequestClose,
  setCourseOptionDeleteModalOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // Handle delete action
  const handleDelete = async () => {
    try {
      const response = await dispatch(deleteCourseOption(subjectId)).unwrap();
      showToastify(response.message, response.status);

      if (response.status === 'success') {
        await dispatch(getCourseOptions({ ...params, paginate: true, pagination: params.pagination })).unwrap();
        setCourseOptionDeleteModalOpen(false); // Close modal on successful deletion
      }
    } catch (error: any) {
      showToastify(error.message || 'Failed to delete the course option', 'error');
    }
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} centered className="modern-modal delete-modal">
      <Modal.Header closeButton>
        <Modal.Title><i className="fas fa-trash-alt"></i> Delete Course Option</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="delete-icon">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <p className="delete-message">Are you sure you want to delete <strong>this course option</strong>?</p>
        <p className="delete-warning">This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>
          <i className="fas fa-times"></i> Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          <i className="fas fa-trash"></i> Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CourseOptionDeleteModal;
