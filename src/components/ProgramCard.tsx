import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { ToastContext } from '../utility/ToastContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { getDepartments } from '../redux/slices/departmentSlice';
import { DepartmentParams, DepartmentViewModel } from '../models/department';
import { Program, ProgramParams, ProgramViewModel } from '../models/program';
import { addProgram, getPrograms } from '../redux/slices/programSlice';
import { showToastify } from '../utility/Toastify';
import ProgramList from './ProgramList';

const ProgramCard = (props: any) => {
  const { schoolId, branchId, tabIndex } = props;
  const { showToast, setShowToast } = useContext(ToastContext)
  const { departments } = useSelector((state: RootState) => state.department)
  const { message, status, program, programs } = useSelector((state: RootState) => state.program)
  const dispatch = useDispatch<AppDispatch>()
  const [params, setParams] = useState<DepartmentParams>({
    branch_id: 0,
    school_id: 0,
    paginate: false,
    pagination: {
      per_page: 10,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })

  const [progParams, setProgParams] = useState<ProgramParams>({
    branch_id: 0,
    department_id: 0,
    paginate: true,
    pagination: {
      per_page: 10,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })
  const [formData, setFormData] = useState<Program>({
    prog_name: '',
    department_id: 0,
  })

  const handleSubmit = () => {
    dispatch(addProgram({ ...formData }))
  }

  useEffect(() => {
    if (tabIndex === 'second') {
      dispatch(getPrograms({ ...progParams, branch_id: branchId, department_id: formData.department_id }))
      dispatch(getDepartments({ ...params, school_id: schoolId, branch_id: branchId, paginate: false }))
    }
  }, [tabIndex, dispatch, progParams, params, formData])

  useEffect(() => {
    setShowToast(true)
    showToastify(message, status)
  }, [message, setShowToast, showToast, status])
  return (
    <div>
      <Card.Title className='d-flex justify-content-center fs-1 text-muted'>
        Programs
      </Card.Title>
      <Card.Body>
        <Form>
          <Row>
            <Col>
              <Form.Group controlId='deptId'>
                <Form.Control as='select' value={formData.department_id}
                  onChange={(e) => setFormData({ ...formData, department_id: parseInt(e.target.value) })}>
                  <option value={''}>---Select Department---</option>
                  {departments.map((dept: DepartmentViewModel) => (
                    <option value={dept.id} key={dept.id}>{dept.dept_name} Department</option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='programName'>
                <Form.Control type='text' placeholder='Program Name' onChange={(e) => setFormData({ ...formData, prog_name: e.target.value })} />
              </Form.Group>
            </Col>
            <Col>
              <Button onClick={handleSubmit}>Add New Program</Button>
            </Col>
          </Row>
        </Form>
        {programs.map((prog: ProgramViewModel) => (
          // <span>{prog.prog_name}</span>
          <ProgramList prog={prog} />
        ))}
      </Card.Body>
    </div>
  )
}

export default ProgramCard
