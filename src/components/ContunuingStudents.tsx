import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../redux/store'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Tab, Tabs } from 'react-bootstrap'
import AcademicYearDropDown from './AcademicYearDropDown'
import AcademicTermDropDown from './AcademicTermDropDown'
import { QueryParams } from '../models/queryParams'
import { getRegistrationInformation } from '../redux/slices/studentRegSlice'
import DepartmentDropDown from './DepartmentDropDown'
import ProgramDropDown from './ProgramDropDown'
import StageDropDown from './StageDropDown'
import RegisteredStudents from './RegisteredStudents'
import UnregisteredStudent from './UnregisteredStudent'

const ContunuingStudents = (props: any) => {
  const { schoolId, branchId, handleInputChange, tabIndex } = props;
  const { academic_term } = useSelector((state: RootState) => state.calendar)
  const { registered, registrations, continuing_students_not_registered } = useSelector((state: RootState) => state.studentReg)
  const dispatch = useDispatch<AppDispatch>()
  const [key, setKey] = useState<string>('registered');
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
  useEffect(() => {
    if (tabIndex === 'contunuing')
      dispatch(getRegistrationInformation({ ...params, academic_term_id: params.academic_term_id ? params.academic_term_id : academic_term.id, branch_id: branchId, school_id: schoolId }))
  }, [academic_term.id, branchId, dispatch, params, schoolId, tabIndex])
  return (
    <>
      <Row className='d-flex flex-column flex-lg-row'>
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
          <StageDropDown onChange={handleInputChange} branchId={branchId} />
        </Col>
      </Row>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => k && setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="registered" title="Registered Students">
          <RegisteredStudents students={registered} index={key} params={params} branchId={branchId} schoolId={schoolId} />
        </Tab>
        <Tab eventKey="unregistered" title="Unregistered Students">
          <UnregisteredStudent onChange={handleInputChange} students={continuing_students_not_registered} index={key} params={params} branchId={branchId} schoolId={schoolId} />
        </Tab>
      </Tabs>
    </>
  )
}

export default ContunuingStudents