import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { AcademicTerm, AcademicTermViewModel, TermParams } from '../models/calendar';
import { addAcademicTerm, getAcademicTerms } from '../redux/slices/calendarSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';

const AcademicTermCard = (props: any) => {
  const { academic_terms, message, status } = useSelector((state: RootState) => state.calendar)
  const { showToast, setShowToast } = useContext(ToastContext)
  const { yearId } = props;
  const dispatch = useDispatch<AppDispatch>()

  const [params, setParams] = useState<TermParams>({
    year_id: 0,
    pagination: {
      per_page: 10,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })

  const [formData, setFormData] = useState<AcademicTerm>({
    term_name: '',
    start_date: '',
    end_date: '',
    completed: false,
    academic_year_id: 0
  })

  useEffect(() => {
    setShowToast(false)
  },[setShowToast])

  const addNewTerm = async () => {
    setShowToast(true)
    await dispatch(addAcademicTerm({ ...formData, academic_year_id: yearId }))
  }
  useEffect(() => {
    if (message && status && showToast) {
      showToastify(message, status)
      dispatch(getAcademicTerms({ ...params, year_id: yearId }))
    }
  }, [message, setShowToast, showToast, status])

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      academic_year_id: yearId
    }))
  }, [])

  useEffect(() => {
    dispatch(getAcademicTerms({ ...params, year_id: yearId }))
    if(status==='error'){
      setShowToast(true)
      showToastify(message,status)
    }
  }, [dispatch, message, params, setShowToast, status, yearId])
  return (
    <div>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId='termName'>
              <Form.Label>Term/Sem</Form.Label>
              <Form.Control type='text' value={formData.term_name}
                onChange={(e) => setFormData({ ...formData, term_name: e.target.value })} />
            </Form.Group>
          </Col>
          <Col><Form.Group controlId='startDate'>
            <Form.Label>Start Date</Form.Label>
            <Form.Control type='date' value={formData.start_date}
              onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} />
          </Form.Group></Col>
          <Col><Form.Group controlId='endDate'>
            <Form.Label>End Date</Form.Label>
            <Form.Control type='date' value={formData.end_date}
              onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} />
          </Form.Group></Col>
        </Row>
        <Row>
          <Col className='my-2'>
            <Button size='sm' onClick={addNewTerm}>Add New Term</Button>
          </Col>
        </Row>
      </Form>
      <Table striped hover responsive bordered variant='dark'>
        <thead>
          <tr>
            <th>Term / Semester</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {academic_terms && academic_terms.map((term: AcademicTermViewModel) => (
            <tr>
              <td>{term.term_name}</td>
              <td>{new Date(term.start_date).toDateString()}</td>
              <td>{new Date(term.end_date).toDateString()}</td>
              <td className='d-flex flex-lg-row flex-column gap-2'>
                <Button><i className="fa fa-edit" aria-hidden="true">Edit</i></Button>
                <Button><i className="fa fa-trash" aria-hidden="true">Delete</i></Button>
                <Button><i className="fa fa-info-circle" aria-hidden="true">Details</i></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default AcademicTermCard
