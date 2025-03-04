import React, { useContext } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { Button, Modal } from 'react-bootstrap';

const ExerciseDetailsModal = (props: any) => {
  const { isOpen, onRequestClose, exercise, params, setDetailsModalOpen, branchId, schoolId } = props;
  
  return (
    <Modal show={isOpen} onHide={onRequestClose}>
      <Modal.Header closeButton>
        <Modal.Title>Exercise Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {exercise && (
          <div>
            <p><strong>Subject:</strong> {exercise.subject_name}</p>
            <p><strong>Assessment Type:</strong> {exercise.category}</p>
            <p><strong>Assessment Name:</strong> {exercise.assessment_name}</p>
            <p><strong>Base Mark:</strong> {exercise.base_mark}</p>
            <p><strong>Pass Mark:</strong> {exercise.pass_mark}</p>
            <p><strong>Academic Term:</strong> {exercise.academic_term_name}</p>
            <p><strong>Staff:</strong> {exercise.staff_name}</p>
            <p><strong>Class:</strong> {exercise.class_group_name}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onRequestClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ExerciseDetailsModal