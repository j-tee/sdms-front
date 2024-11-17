import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Tab, Tabs } from 'react-bootstrap'
import AcademicYearDropDown from './AcademicYearDropDown'
import AcademicTermDropDown from './AcademicTermDropDown'
import DepartmentDropDown from './DepartmentDropDown'
import ProgramDropDown from './ProgramDropDown'
import StageDropDown from './StageDropDown'
import { QueryParams } from '../models/queryParams'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { getCurrentTerm } from '../redux/slices/calendarSlice'
import { getRegisteredStudents, getRegistrationInformation } from '../redux/slices/studentRegSlice'
import { getPrograms } from '../redux/slices/programSlice'
import { getStages } from '../redux/slices/stageSlice'
import RegisteredStudents from './RegisteredStudents'
import UnregisteredStudent from './UnregisteredStudent'

const NewlyAdmittedStudents = (props: any) => {
  const { schoolId, branchId, handleInputChange, reg_info, registrations, academic_term_id } = props;
  const [key, setKey] = useState<string>('registered');
  const dispatch = useDispatch<AppDispatch>()
  const [params, setParams] = useState<QueryParams>({
    reg_date: '',
    stage_id: 0,
    program_id: 0,
    department_id: 0,
    branch_id: 0,
    school_id: 0,
    academic_term_id: 0,
    class_group_id: 0,
    student_id: 0,
    pagination: {
      current_page: 1,
      per_page: 10,
      total_items: 0,
      total_pages: 0
    }
  });

  return (
    <Card>
      <Card.Header>
        <Card.Title>Newly Admitted Students Registration</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col>
            <AcademicYearDropDown onChange={handleInputChange} branchId={branchId} schoolId={schoolId} />
          </Col>
          <Col>
            <AcademicTermDropDown onChange={handleInputChange} branchId={branchId} schoolId={schoolId} yearId={undefined} />
          </Col>
        </Row>
        <Row className='d-flex flex-column flex-lg-row'>

          <Col>
            <DepartmentDropDown onChange={handleInputChange} admission={undefined} branchId={branchId} schoolId={schoolId} />
          </Col>
          <Col>
            <ProgramDropDown admission={undefined} onChange={handleInputChange} departmentId={params.department_id} branchId={branchId} />
          </Col>
          <Col>
            <StageDropDown lesson={(undefined)} onChange={handleInputChange} admission={undefined} branchId={branchId} />
          </Col>
        </Row>
        <Row className='my-5'>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => k && setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="registered" title="Registered Students">
              <RegisteredStudents students={registrations} index={key} params={params} branchId={branchId} schoolId={schoolId} />
            </Tab>
            <Tab eventKey="unregistered" title="Unregistered Students">
              <UnregisteredStudent academic_term_id={academic_term_id} onChange={handleInputChange} students={reg_info.all_unregistered_students} index={key} params={params} branchId={branchId} schoolId={schoolId} />
            </Tab>
          </Tabs>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default NewlyAdmittedStudents