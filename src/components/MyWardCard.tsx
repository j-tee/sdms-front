import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row, Tab, Tabs } from 'react-bootstrap'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { getMyWards, getParentByEmail } from '../redux/slices/parentSlice'
import { QueryParams } from '../models/queryParams'
import { Link } from 'react-router-dom'
import MyWardDetails from './MyWardDetails'
import MyWardsDropDown from './MyWardsDropDown'
import BranchDropDown from './BranchDropDown'
import MyWardSchoolDropDown from './MyWardSchoolDropDown';
import AcademicYearDropDown from './AcademicYearDropDown'
import AcademicTermDropDown from './AcademicTermDropDown'
import { getRegisteredStudents } from '../redux/slices/studentRegSlice'
import StudentDepartmentDropDown from './StudentDepartmentDropDown'
import StudentProgramDropDown from './StudentProgramDropDown'
import StudentStageDropDown from './StudentStageDropDown'
import StudentClassGroupDropDown from './StudentClassGroupDropDown'
import StudentBranchDropDown from './StudentBranchDropDown'
import StudentAcademicYearDropDown from './StudentAcademicYearDropDown'
import StudentAcademicTermDropDown from './StudentAcademicTermDropDown'
import { Terminal } from 'react-bootstrap-icons'
import TerminalReport from './TerminalReport'
import ReportTimeTable from './ReportTimeTable'
import StudentBillsFees from './StudentBillsFees'
import { getStudentRecentSubscription } from '../redux/slices/subscriptionSlice'
import StudentSubscription from './StudentSubscription'

type AnyType = {
  [key: string]: string;
};

const MyWardCard = (props: any) => {
  const { parent, myWards } = useSelector((state: RootState) => state.parent)
  const {student_reports} = useSelector((state: RootState) => state.scoreSheet)
  // const { registrations } = useSelector((state: RootState) => state.studentReg)

  const dispatch = useDispatch<AppDispatch>()
  const [key, setKey] = useState<string>('first');

  const [params, setParams] = useState<QueryParams>({
    parent_id: parent.id,
    student_id: 0,
    school_id: 0,
    branch_id: 0,
    academic_year_id: 0,
  })
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    switch (field) {
      case 'student_id':
        dispatch(getStudentRecentSubscription({ student_id: parseInt(value) }));
        break;
    }
    setParams((prevData) => ({
      ...prevData,
      [field]: parseInt(value),
    }))
  }
  useEffect(() => {
    dispatch(getParentByEmail(parent?.fathers_email_address || '')).then((res) => {
      dispatch(getMyWards({ ...params, parent_id: res.payload.parent?.id }))
    })
  }, [dispatch, params])
  return (
    <>
      <Container style={{ marginTop: '3.5rem' }}>
        &nbsp;
      </Container>
      <Header />
      <Card>
        <Card.Header>
          <Card.Title className='fs-1 text-muted'>My Wards</Card.Title>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col xs={12} md={4}>
              <MyWardsDropDown
                onChange={handleInputChange}
                params={params}
                myWards={myWards}
              />
            </Col>
            <Col xs={12} md={4}>
              <MyWardSchoolDropDown
                onChange={handleInputChange}
                studentId={params.student_id}
                params={params}
              />
            </Col>
            <Col xs={12} md={4}>
              <StudentBranchDropDown
                onChange={handleInputChange}
                params={params}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <StudentDepartmentDropDown
                onChange={handleInputChange}
                params={params}
              />
            </Col>
            <Col xs={12} md={4}>
              <StudentProgramDropDown
                onChange={handleInputChange}
                params={params}
              />
            </Col>
            <Col xs={12} md={4}>
              <StudentStageDropDown
                onChange={handleInputChange}
                params={params}
              />
            </Col>
          </Row>
          <Row>
            <Col xs={12} md={4}>
              <StudentAcademicYearDropDown
                onChange={handleInputChange}
                params={params}
              />
            </Col>
            <Col xs={12} md={4}>
              <StudentAcademicTermDropDown
                onChange={handleInputChange}
                params={params}
              />
            </Col>
            <Col xs={12} md={4}>
              <StudentClassGroupDropDown
                onChange={handleInputChange}
                params={params}
              />
            </Col>
          </Row>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => k && setKey(k)}
            className="mb-3"
          >
            <Tab eventKey="first" title="Assessments / Reports">
              <TerminalReport params={params} />
            </Tab>
            <Tab eventKey="second" title="Time Table">
              <ReportTimeTable params={params} />
            </Tab>
            <Tab eventKey="third" title="Bills & Fees">
              <StudentBillsFees params={params} />
            </Tab>
            <Tab eventKey="fourth" title="Subscriptions">
              <StudentSubscription index={key} params={params} />
              {/* <MyWardDetails key={key} student={registrations[0]} parent={parent} params={params} />   */}
            </Tab>
          </Tabs>
        </Card.Body>
        <Card.Footer>

        </Card.Footer>
        {/* {myWards.map((ward: any, index: any) => {
        return (
          <MyWardDetails key={index} student={ward} parent={parent} params={params} />
        )
     })} */}
      </Card>
    </>
  )
}

export default MyWardCard
