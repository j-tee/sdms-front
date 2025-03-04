import React, { useContext, useEffect, useState } from 'react'
import { ToastContext } from '../utility/ToastContext';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import StaffDropDown from './StaffDropDown';
import AssessmentTypeDropDown from './AssessmentTypeDropDown';
import StaffSubjectDropDown from './StaffSubjectDropDown';
import StaffClassGroupDropDown from './StaffClassGroupDropDown';
import { Assessment } from '../models/assessment';
import { getLessons } from '../redux/slices/lessonSlice';
import { getStaffClassGroups } from '../redux/slices/classGroupSlice';
import { getStaffSubjectList } from '../redux/slices/subjectSlice';
import { getAssessmentTypes } from '../redux/slices/assesmentTypeSlice';
import { showToastify } from '../utility/Toastify';
import { getAssessments, updateAssessment } from '../redux/slices/assessmentSlice';

const ExerciseEditModal = (props: any) => {
	const { isOpen, onRequestClose, exercise, params, setEditModalOpen, branchId, schoolId } = props;
	const dispatch = useDispatch<AppDispatch>()
	const { setShowToast } = useContext(ToastContext)

	const [formData, setFormData] = useState<Assessment>({
		subject_id: 0,
		assessment_type_id: 0,
		assessment_name: '',
		base_mark: 0,
		pass_mark: 0,
		academic_term_id: 0,
		staff_id: 0,

	});
	
	type AnyType = {
		[key: string]: string;
	};
	const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
		
		setFormData((prevData) => ({
			...prevData,
			[field]: value,
		}));
		switch (field) {
			case 'staff_id':
				dispatch(getLessons({ ...params, staff_id: parseInt(value), branch_id: branchId, paginate: false }))
				dispatch(getStaffClassGroups({ ...params, staff_id: parseInt(value), branch_id: branchId, paginate: false }))
				dispatch(getStaffSubjectList({ ...params, staff_id: parseInt(value), branch_id: branchId, paginate: false }))
				break;
			case 'subject_id':
				dispatch(getStaffClassGroups({ ...params, subject_id: parseInt(value), branch_id: branchId, paginate: false }))
				break;
		}
		dispatch(getAssessmentTypes({ ...params, branch_id: branchId, paginate: false }))


	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		dispatch(updateAssessment(formData)).then((res: any) => {
			setShowToast(true)
			showToastify(res.payload.message, res.payload.status)
			if (res.payload.status === 'success') {
				dispatch(getAssessments({ ...params, branch_id: branchId, paginate: false }))
				setEditModalOpen(false)
			}
		}
		)
	}
	useEffect(() => {
		setFormData(exercise)
	}, [exercise])
	return (
		<Modal animation show={isOpen} centered onHide={onRequestClose} size='lg'>
			<Form onSubmit={handleSubmit}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Exercise</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Row>
						<Col>
							<StaffDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} value={undefined} />
						</Col>
						<Col>
							<AssessmentTypeDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} />
						</Col>
						<Col>
							<StaffSubjectDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} />
						</Col>
						<Col>
							<StaffClassGroupDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} />
						</Col>
					</Row>
					<Row>
						<Col>
							<Form.Group controlId="assessment_name">
								<Form.Label>Assessment</Form.Label>
								<Form.Control type="text"
									onChange={(e) => handleInputChange('assessment_name', e.target.value)}
									value={formData.assessment_name}
									placeholder="E.g Class Work, Home Work etc" />
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="base_mark">
								<Form.Label>Base Mark</Form.Label>
								<Form.Control type="number"
									onChange={(e) => handleInputChange('base_mark', e.target.value)}
									value={formData.base_mark}
									placeholder="Base Mark" />
							</Form.Group>
						</Col>
						<Col>
							<Form.Group controlId="pass_mark">
								<Form.Label>Pass Mark</Form.Label>
								<Form.Control type="number"
									onChange={(e) => handleInputChange('pass_mark', e.target.value)}
									value={formData.pass_mark}
									placeholder="Pass Mark" />
							</Form.Group>
						</Col>
					</Row>
					
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={onRequestClose}>
						Close
					</Button>
					<Button variant="danger" type='submit'>
						Update
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default ExerciseEditModal