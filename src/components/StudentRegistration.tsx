import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Button, Card, Col, Form, Row, Tab, Tabs } from 'react-bootstrap';
import DepartmentDropDown from './DepartmentDropDown';
import ProgramDropDown from './ProgramDropDown';
import StageDropDown from './StageDropDown';
import { getPrograms } from '../redux/slices/programSlice';
import { getStages } from '../redux/slices/stageSlice';
import { StudentRegParams } from '../models/student';
import RegisteredStudents from './RegisteredStudents';
import UnregisteredStudent from './UnregisteredStudent';
import { getRegisteredStudents, getRegistrationInformation } from '../redux/slices/studentRegSlice';
import { QueryParams } from '../models/queryParams';

const StudentRegistration = (props: any) => {
  const { schoolId, branchId, tabIndex } = props;
  const {reg_info, registrations} = useSelector((state:RootState) => state.studentReg)
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
  // useEffect(() => {
  //   setParams((prevData) => ({
  //     ...params, stage_id: 5
  //   }))
  // }, [params])
  type AnyType = {
    [key: string]: string;
  };
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    switch (field) {
      case 'department_id': {
        dispatch(getPrograms({ ...params, branch_id: branchId, department_id: parseInt(value), paginate: false }))
        break;
      }
      case 'program_id': {
        if(branchId)
        dispatch(getStages({ ...params, branch_id: branchId, department_id: 0, paginate: false }))
        break;
      }
    }
  };
  useEffect(() => {
    if(tabIndex === 'second')
    dispatch(getRegisteredStudents({...params, branch_id:branchId, school_id:schoolId}))
    dispatch(getRegistrationInformation({...params, branch_id:branchId, school_id:schoolId}))
  }, [tabIndex, schoolId, branchId, dispatch, params])
  return (
    <Card>
      <Card.Header>
        <Card.Title>Reporting and Registration</Card.Title>
      </Card.Header>
      <Card.Body>
        <Row className='d-flex flex-column flex-lg-row'>
          <Col>
            <DepartmentDropDown onChange={handleInputChange} branchId={branchId} schoolId={schoolId} />
          </Col>
          <Col>
            <ProgramDropDown admission={undefined} onChange={handleInputChange} departmentId={params.department_id} branchId={branchId} />
          </Col>
          <Col>
            <StageDropDown lesson={(undefined)} onChange={handleInputChange} branchId={branchId} />
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
              <UnregisteredStudent onChange={handleInputChange} students={reg_info.all_unregistered_students} index={key} params={params} branchId={branchId} schoolId={schoolId} />
            </Tab>
          </Tabs>
        </Row>
      </Card.Body>
    </Card>
  )
}

export default StudentRegistration
