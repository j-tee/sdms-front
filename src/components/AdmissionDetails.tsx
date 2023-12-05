import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Form, Row, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { getStudentById } from '../redux/slices/studentSlice'
import { showToastify } from '../utility/Toastify'
import { ToastContext } from '../utility/ToastContext'

const AdmissionDetails = (props:any) => {
  const { index, schoolId, branchId } = props;
  const dispatch = useDispatch<AppDispatch>()
  const { setShowToast } = useContext(ToastContext)
  const {student, std_message, std_status} = useSelector((state:RootState) => state.student)
  // const [student_id, setStudent_id] = useState('')

  const getStudent = (studentId: string) => {
    // setStudent_id(studentId);  // Assuming you have a state variable setEmail for storing the email
    if (studentId && index === 'admission') {
      dispatch(getStudentById(encodeURIComponent(studentId)))
        .then((res: any) => {
          setShowToast(true);
          showToastify(std_message, std_status);
        })
    }
  }
  useEffect(() => {
    setShowToast(true);
          showToastify(std_message, std_status);
  },[setShowToast, std_message, std_status, student])
  return (
    <Card>
      <Card.Header>Admission Details</Card.Header>
      <Card.Body>
        {student.image_url && <Card.Img variant='top' src={student.image_url} style={{width:'100px', height:'100px'}} />}
      {!student.student_id && (
            <Row className='my-3 d-flex flex-row justify-content-center'>
              <Col>
                <Form>
                  <Form.Group className='d-flex flex-lg-row flex-column justify-content-center gap-3'>
                    <Form.Label>Find Student</Form.Label>
                    <Form.Control
                      style={{ width: '70%' }}
                      placeholder='Enter student ID'
                      type='text'
                      onBlur={(e) => getStudent(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Col>
            </Row>
          )}
      </Card.Body>
    </Card>
  )
}

export default AdmissionDetails
