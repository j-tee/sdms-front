import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { ToastContext } from '../utility/ToastContext'
import DepartmentDropDown from './DepartmentDropDown'
import ProgramDropDown from './ProgramDropDown'
import StageDropDown from './StageDropDown'

const ClassGroupCard = () => {
  const { showToast, setShowToast } = useContext(ToastContext)
  const [params, setParams] = useState({
    school_id: 0,
    branch_id: 0,
    class_group_id: 0,
    program_id: 0,
    department_id:0,
  })

  type AnyType = {
    [key: string]: string;
  };
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    // Update the formData state with the new value
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));

  };  return (
    <div>
      <Card.Title className='d-flex justify-content-center'>
        Class Groups
      </Card.Title>
      <Card.Body>
        <Form>
          <Row>
            <Col>
            <DepartmentDropDown onChange={handleInputChange} branchId={params.branch_id} />
            </Col>
            <Col>
            <ProgramDropDown onChange={handleInputChange} departmentId={params.department_id} />
            </Col>
            <Col>
            <StageDropDown onChange={handleInputChange} branchId={params.branch_id} />
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </div>
  )
}

export default ClassGroupCard
