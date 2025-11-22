import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Subject } from '../models/subject';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { ToastContext } from '../utility/ToastContext';
import { getSubjects, updateSubject } from '../redux/slices/subjectSlice';
import { showToastify } from '../utility/Toastify';
import { Modal, Button, Form } from 'react-bootstrap';
import '../css/ModernModal.css';

interface SubjectEditModalProps {
    schoolId: number;
    branchId: number;
    subject: Subject;
    isOpen: boolean;
    params: any;
    onRequestClose: () => void;
    setSubjectEditModalOpen: (isOpen: boolean) => void;
}

const SubjectEditModal: React.FC<SubjectEditModalProps> = ({
    schoolId,
    branchId,
    subject,
    isOpen,
    params,
    onRequestClose,
    setSubjectEditModalOpen,
}) => {
    const dispatch = useDispatch<AppDispatch>();
    const { setShowToast } = useContext(ToastContext);
    const [formData, setFormData] = useState<Subject>({
        id: subject.id,
        subject_name: subject.subject_name,
        subject_code: subject.subject_code,
        branch_id: subject.branch_id,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await dispatch(updateSubject(formData)).unwrap();
            setShowToast(true);
            showToastify(response.message, response.status);

            if (response.status === 'success') {
                await dispatch(getSubjects({ ...params, paginate: true, pagination: params.pagination })).unwrap();
                setSubjectEditModalOpen(false);
            }
        } catch (error: any) {
            showToastify(error.message || 'An error occurred', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            ...subject,
        }));
    }, [subject]);

    return (
        <Modal show={isOpen} onHide={onRequestClose} centered className="modern-modal edit-modal">
            <Modal.Header closeButton>
                <Modal.Title><i className="fas fa-edit"></i> Edit Subject</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formSubjectName" className="mb-3">
                        <Form.Label>Subject Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="subject_name"
                            value={formData.subject_name}
                            onChange={handleInputChange}
                            placeholder="Enter subject name"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formSubjectCode" className="mb-3">
                        <Form.Label>Subject Code</Form.Label>
                        <Form.Control
                            type="text"
                            name="subject_code"
                            value={formData.subject_code}
                            onChange={handleInputChange}
                            placeholder="Enter subject code"
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formBranchId" className="mb-3">
                        <Form.Label>Branch ID</Form.Label>
                        <Form.Control
                        disabled
                            type="number"
                            name="branch_id"
                            value={formData.branch_id}
                            onChange={handleInputChange}
                            placeholder="Enter branch ID"
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                        <i className="fas fa-save"></i> {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default SubjectEditModal;
