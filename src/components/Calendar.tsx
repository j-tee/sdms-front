import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useParams } from 'react-router-dom';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { AcademicYear, AcademicYearViewModel, YearParams } from '../models/calendar';
import { addAcademicYear, getAcademicYears } from '../redux/slices/calendarSlice';
import AcademicYearCard from './AcademicYearCard';
import Header from './Header';

const Calendar = () => {
  const { schoolId, branchId } = useParams()
  const dispatch = useDispatch<AppDispatch>();
  const { academic_years } = useSelector((state: RootState) => state.calendar)
  const [params, setParams] = useState<YearParams>({
    school_id: 0,
    branch_id: 0,
    pagination: {
      current_page: 1,
      per_page: 10,
      total_items: 0,
      total_pages: 0
    }
  })
  const [formData, setFormData] = useState<AcademicYear>({
    branch_id: 0,
    start_date: '',
    end_date: '',
  })

  const AddNewAcademicYear = () => {
    dispatch(addAcademicYear({ ...formData, branch_id: branchId && parseInt(branchId) }))
  }
  useEffect(() => {
    setParams((prevParams) => ({
      ...prevParams,
      school_id: typeof schoolId === 'number' ? schoolId : prevParams.school_id,
    }));
    dispatch(getAcademicYears({ ...params, school_id: schoolId, branch_id: branchId }));
  }, [schoolId, branchId]);
  
  return (
    <>
      <Header />
      <Container style={{ marginTop: '3.5rem' }}>
        &nbsp;
      </Container>
      <Card mt-4>
        <Card.Body>
          <Card.Title className='fs-1 text-muted'>Academic Years</Card.Title>
          <Card.Text>
            {branchId && parseInt(branchId) > 0 ?
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId='startDate'>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control type='date' value={formData.start_date}
                      onChange={(e) => setFormData({...formData, start_date:e.target.value})} />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group controlId='endDate'>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control type='date' value={formData.end_date}
                      onChange={(e)=>setFormData({...formData, end_date:e.target.value})} />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col className='mt-2'>
                  <Button onClick={AddNewAcademicYear} variant="primary">Go somewhere</Button>
                  </Col>
                </Row>
              </Form> : "Go to branches to add a new academic year"}

          </Card.Text>
        </Card.Body>
      </Card>

      {academic_years.length && academic_years.map((year: AcademicYearViewModel) => (
        <AcademicYearCard academicYear={year} />
      ))}
    </>
  )
}

export default Calendar
