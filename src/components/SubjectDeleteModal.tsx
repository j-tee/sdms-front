import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { Modal, Button } from 'react-bootstrap';
import { deleteSubject, getSubjects } from '../redux/slices/subjectSlice';
import { showToastify } from '../utility/Toastify';

interface SubjectDeleteModalProps {
    schoolId: number;
    branchId: number;
  isOpen: boolean;
  onRequestClose: () => void;
  subjectId: number;
  params: any;
  setSubjectDeleteModalOpen: (isOpen: boolean) => void;
}

const SubjectDeleteModal: React.FC<SubjectDeleteModalProps> = ({
    schoolId,
    branchId,
  isOpen,
  onRequestClose,
  subjectId,
  params,
  setSubjectDeleteModalOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await dispatch(deleteSubject(subjectId)).unwrap();
      showToastify(response.message, response.status);

      if (response.status === 'success') {
        await dispatch(getSubjects({ ...params, pagination: params.pagination })).unwrap();
        setSubjectDeleteModalOpen(false);
      }
    } catch (error: any) {
      showToastify(error.message || 'Failed to delete the subject', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this subject? This action cannot be undone.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onRequestClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? 'Deleting...' : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SubjectDeleteModal;
