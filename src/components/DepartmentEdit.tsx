import React, { useContext, useState } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { getDepartments, updateDepartment } from '../redux/slices/departmentSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import '../css/ModernModal.css';

const DepartmentEdit = (props: any) => {
  const { department, schoolId, params, branchId, isOpen, onRequestClose, setDepartmentEditModalOpen } = props;
  const dispatch = useDispatch<AppDispatch>()
  const {setShowToast} = useContext(ToastContext)
  const [formData, setFormData] = useState({
    id: department.id,
    dept_name: department.dept_name,
    branch_id: branchId
  })
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateDepartment({ ...formData, branch_id: branchId }))
    .then((res: any) => {
      setDepartmentEditModalOpen(false)
      setShowToast(true)
      dispatch(getDepartments({ ...params, school_id: schoolId, branch_id: branchId, paginate:true }))
    })
  }
  return (
    <Modal show={isOpen} onHide={onRequestClose} animation centered size='lg' className="modern-modal edit-modal">
      <Modal.Header closeButton>
        <Modal.Title><i className="fas fa-edit"></i> Edit Department</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <Card.Title>Department</Card.Title>
            <Form onSubmit={handleSubmit}>
                <Row className='d-flex flex-column flex-lg-row gap-2 mb-4 mb-lg-2'>
                  <Col>
                    <Form.Group controlId='deptName'>
                      {/* <Form.Label>Department Name</Form.Label> */}
                      <Form.Control placeholder='Department Name' type='text' value={formData.dept_name} onChange={(e) => setFormData({ ...formData, dept_name: e.target.value })} />
                    </Form.Group>
                  </Col>
                </Row>
                <Modal.Footer>
                  <Button variant='secondary' onClick={onRequestClose}>
                    <i className="fas fa-times"></i> Close
                  </Button>
                  <Button variant='primary' type='submit'>
                    <i className="fas fa-save"></i> Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  )
}

export default DepartmentEdit
