import React, { useContext } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { Button, Modal } from 'react-bootstrap';
import { showToastify } from '../utility/Toastify';
import { deleteAssessment, getAssessments } from '../redux/slices/assessmentSlice';

const ExerciseDeleteModal = (props: any) => {
	const { isOpen, onRequestClose, exercise, params, setDeleteModalOpen, branchId, schoolId } = props;
	const dispatch = useDispatch<AppDispatch>()
	const { setShowToast } = useContext(ToastContext)

	const handleDelete = () => {
		setShowToast(true)
		dispatch(deleteAssessment(exercise.id)).then((res: any) => {
			showToastify(res.payload.message, res.payload.status)
			if (res.payload.status === 'success') {
				dispatch(getAssessments(params))
				setDeleteModalOpen(false)
			}
		})
	}
	return (
		<Modal show={isOpen} onHide={onRequestClose}>
			<Modal.Header closeButton>
				<Modal.Title>Delete Exercise</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Are you sure you want to delete this exercise?</p>
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
	)
}
export default ExerciseDeleteModal