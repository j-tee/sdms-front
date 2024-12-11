import React, { FC } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { deleteCourseOption, getCourseOptions } from '../redux/slices/programSubjectSlice';
import { showToastify } from '../utility/Toastify';

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
    <Modal show={isOpen} onHide={onRequestClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Course Option</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this course option? This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CourseOptionDeleteModal;
