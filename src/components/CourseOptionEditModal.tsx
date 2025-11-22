import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { ProgramSubject } from '../models/subject';
import { updateCourseOption, getCourseOptions } from '../redux/slices/programSubjectSlice';
import { showToastify } from '../utility/Toastify';
import DepartmentDropDown from './DepartmentDropDown';
import ProgramDropDown from './ProgramDropDown';
import StageDropDown from './StageDropDown';
import '../css/ModernModal.css';

interface CourseOptionEditModalProps {
  schoolId: number;
  branchId: number;
  subject: ProgramSubject;
  isOpen: boolean;
  params: any;
  onRequestClose: () => void;
  setCourseOptionEditModalOpen: (isOpen: boolean) => void;
}

const CourseOptionEditModal: FC<CourseOptionEditModalProps> = ({
  schoolId,
  branchId,
  subject,
  isOpen,
  params,
  onRequestClose,
  setCourseOptionEditModalOpen,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  // State to manage form data
  const [formData, setFormData] = useState<ProgramSubject>({
    id: subject.id,
    stage_id: subject.stage_id,
    academic_year_id: subject.academic_year_id,
    subject_id: subject.subject_id,
    program_id: subject.program_id,
    optional: subject.optional,
    credit_hours: subject.credit_hours,
  });

  // Effect to update formData when the modal is opened or subject changes
  useEffect(() => {
    if (isOpen) {
      setFormData({
        id: subject.id,
        stage_id: subject.stage_id,
        academic_year_id: subject.academic_year_id,
        subject_id: subject.subject_id,
        program_id: subject.program_id,
        optional: subject.optional,
        credit_hours: subject.credit_hours,
      });
    }
  }, [isOpen, subject]);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'optional' ? value === 'true' : value, // Convert to boolean for "optional"
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await dispatch(updateCourseOption(formData)).unwrap();
      showToastify(response.message, response.status);

      if (response.status === 'success') {
        await dispatch(getCourseOptions({ ...params, paginate: true, pagination: params.pagination })).unwrap();
        setCourseOptionEditModalOpen(false); // Close modal on successful submission
      }
    } catch (error: any) {
      showToastify(error.message || 'Failed to update the course option', 'error');
    }
  };

  // Handle dropdown changes
  const handleDropdownChange = (field: string | number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} centered className="modern-modal edit-modal">
      <Modal.Header closeButton>
        <Modal.Title><i className="fas fa-edit"></i> Edit Course Option {subject.credit_hours}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row className="d-flex flex-column flex-lg-row">
            <Col>
              <DepartmentDropDown schoolId={schoolId} branchId={branchId} onChange={handleDropdownChange} />
            </Col>
          </Row>
          <Row>
            <Col>
              <ProgramDropDown admission={undefined} branchId={branchId} onChange={handleDropdownChange} departmentId={undefined} />
            </Col>
          </Row>
          <Row>
            <Col>
              <StageDropDown lesson={undefined} branchId={branchId} onChange={handleDropdownChange} />
            </Col>
          </Row>

          <Form.Group controlId="optional" className="mb-3">
            <Form.Label>Optional</Form.Label>
            <Form.Control
              as="select"
              name="optional"
              value={String(formData.optional)}
              onChange={handleChange}
            >
              <option value="">---Select Option---</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="creditHours" className="mb-3">
            <Form.Label>Credit Hours</Form.Label>
            <Form.Control
              type="number"
              name="credit_hours"
              value={formData.credit_hours}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onRequestClose}>
            <i className="fas fa-times"></i> Cancel
          </Button>
          <Button variant="primary" type="submit">
            <i className="fas fa-save"></i> Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CourseOptionEditModal;
