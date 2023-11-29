import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { ToastContext } from '../utility/ToastContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Department, DepartmentParams, DepartmentViewModel } from '../models/department';
import { addDepartment, getDepartments } from '../redux/slices/departmentSlice';
import { showToastify } from '../utility/Toastify';
import DepartmentList from './DepartmentList';

const DepartmentCard = (props: any) => {
  const { schoolId, branchId, tabIndex } = props;
  const { showToast, setShowToast } = useContext(ToastContext)
  const { departments, status, message } = useSelector((state: RootState) => state.department)
  const dispatch = useDispatch<AppDispatch>()
  const [params] = useState<DepartmentParams>({
    branch_id: 0,
    school_id: 0,
    paginate:true,
    pagination: {
      per_page: 10,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })
  const [formData, setFormData] = useState<Department>({
    dept_name: '',
    branch_id: 0
  })
  useEffect(() => {
    setFormData((prevData) => (
      { ...prevData, branch_id: branchId }
    ))
  }, [branchId])

  useEffect(() => {
    if (showToast && message && status) {
      showToastify(message, status)
    }
  }, [message, showToast, status])

  const addNewDepartment = () => {
    setShowToast(true)
    dispatch(addDepartment({ ...formData, branch_id: branchId }))
  }

  useEffect(() => {
    showToastify(message,status)
    if(tabIndex === 'first'){
      dispatch(getDepartments({ ...params, school_id: schoolId, branch_id: branchId }))
    }   
  }, [branchId, showToast, tabIndex, dispatch, params, schoolId])
  return (
    <div>
      <Card.Title className='d-flex justify-content-center fs-1 text-muted'>
        Departments
      </Card.Title>
      <Card.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId='deptName'>
                {/* <Form.Label>Department Name</Form.Label> */}
                <Form.Control placeholder='Department Name' type='text' value={formData.dept_name} onChange={(e) => setFormData({ ...formData, dept_name: e.target.value })} />
              </Form.Group>
            </Col>
            <Col>
              <Button onClick={addNewDepartment}>Add New Department</Button>
            </Col>
          </Row>
        </Form>
        {departments.map((dept: DepartmentViewModel) => (
          <DepartmentList department={dept} />
        ))}
      </Card.Body>
    </div>
  )
}

export default DepartmentCard
