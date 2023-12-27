import React, { useContext, useState } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { getDepartments, updateDepartment } from '../redux/slices/departmentSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';

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
    console.log('formData', formData)
    dispatch(updateDepartment({ ...formData, branch_id: branchId }))
    .then((res: any) => {
      setDepartmentEditModalOpen(false)
      setShowToast(true)
      dispatch(getDepartments({ ...params, school_id: schoolId, branch_id: branchId, paginate:true }))
      // showToastify(res.payload.message, res.payload.status)
    })
  }
  return (
    <Modal show={isOpen} onHide={onRequestClose} animation centered size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Edit Department</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <Card.Title>Department</Card.Title>
            <Card.Text>
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
                    Close
                  </Button>
                  <Button variant='primary' type='submit'>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  )
}

export default DepartmentEdit
