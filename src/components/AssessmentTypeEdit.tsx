import React, { useContext, useEffect, useState } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { AssessmentType } from '../models/assessmentTypes';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { getAssessmentTypes, updateAssessmentType } from '../redux/slices/assesmentTypeSlice';
import { showToastify } from '../utility/Toastify';

const AssessmentTypeEdit = (props: any) => {
  const { schoolId, branchId, assessmentType, params, isOpen, onRequestClose, setAssessmentTypeEditModalOpen } = props;
  const dispatch = useDispatch<AppDispatch>()
  const { setShowToast } = useContext(ToastContext)
  const [formData, setFormData] = useState<AssessmentType>({
    id: assessmentType?.id,
    category: assessmentType?.category,
    percentage_score: assessmentType?.percentage_score,
    branch_id: assessmentType?.branch_id, // Add the missing branch_id property
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowToast(true)
    dispatch(updateAssessmentType({ ...formData, branch_id: branchId }))
      .then((res: any) => {
        dispatch(getAssessmentTypes({ ...params, branch_id: branchId, school_id: schoolId }))
        setShowToast(true)
        showToastify(res.payload.message, res.payload.status)
        setAssessmentTypeEditModalOpen(false)
      })
  }

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      id: assessmentType?.id,
      category: assessmentType?.category,
      percentage_score: assessmentType?.percentage_score,
      branch_id: assessmentType?.branch_id, // Add the missing branch_id property   
    }))
  }, [assessmentType])
  return (
    <Modal show={isOpen} onHide={onRequestClose} animation centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Edit Assessment Type</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Row>
            <Col>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Category</Form.Label>
                <Form.Select placeholder="Enter category" name="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  required
                >
                  <option value="CAT">CAT</option>
                  <option value="EXAM">EXAM</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Percentage Score</Form.Label>
                <Form.Control type="number" placeholder="Enter percentage score" name="percentage_score"
                  value={formData.percentage_score}
                  onChange={(e) => setFormData({ ...formData, percentage_score: parseFloat(e.target.value) })}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AssessmentTypeEdit
