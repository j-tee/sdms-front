import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentAcademicYears } from '../redux/slices/calendarSlice';
import { Col, Modal, Nav, Row, Tab } from 'react-bootstrap';
import StudentAcademicYearDropDown from './StudentAcademicYearDropDown';
import StudentAcademicTermDropDown from './StudentAcademicTermDropDown';
import { getStudentClassGroup } from '../redux/slices/classGroupSlice';
import StudentBillsCard from './StudentBillsCard';
import StudentPaymentDetails from './StudentPaymentDetails';
import { getStudentRecentSubscription } from '../redux/slices/subscriptionSlice';

type AnyType = {
  [key: string]: string;
};

const StudentBillFeesModal = (props: any) => {
  const { tabIndex, student, onRequestClose, isOpen } = props;
  const { class_group } = useSelector((state: RootState) => state.classGroup)
  const [index, SetIndex] = useState<string | null>('first')
  const dispatch = useDispatch<AppDispatch>();
  
  const [params, setParams] = useState({
    student_id: student.id,
    academic_year_id: 0,
    academic_term_id: 0,
  });

  useEffect(() => {
    dispatch(getStudentAcademicYears({ ...params, student_id: student.id }));
  }, [dispatch, student, tabIndex, params]);
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    // Update the formData state with the new value
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (student && student.id) {
      dispatch(getStudentAcademicYears({ student_id: student.id }));
    }
  }, [dispatch, student])

  useEffect(() => {
    if (params.academic_year_id && params.academic_term_id && student) {
      dispatch(getStudentClassGroup({ ...params }));
    }
  }, [dispatch, params, student])
  return (
    <>
      <Modal show={isOpen} animation centered onHide={onRequestClose} size='xl'>
        <Modal.Header closeButton>
          <Modal.Title>Bills and Fees</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row style={{ marginBottom: '10px' }}>
            <Col>
              <StudentAcademicYearDropDown studentId={student.id} onChange={handleInputChange} />
            </Col>
            <Col>
              <StudentAcademicTermDropDown studentId={student.id} yearId={params.academic_year_id} onChange={handleInputChange} />
            </Col>
          </Row>
          <Tab.Container onSelect={(e) => SetIndex(e)} id="left-tabs-example" defaultActiveKey="first">
            <Row style={{ marginTop: '10px' }}>
              <Col sm={2} className='border-right'>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Bills</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Payments</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="first"><StudentBillsCard params={params} class_group={class_group} student={student} tabIndex={index} /></Tab.Pane>
                  <Tab.Pane eventKey="second"><StudentPaymentDetails params={params} class_group={class_group} student={student} tabIndex={index} /></Tab.Pane>
                  
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default StudentBillFeesModal