import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import { AcademicTerm } from '../models/calendar';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { getAcademicTerms, updateAcademicTerm } from '../redux/slices/calendarSlice';

const AcademicTermEdit = (props: any) => {
  const { term, schoolId, branchId, isOpen, params, onRequestClose, setAcademicTermEditModalOpen } = props;
  const dispatch = useDispatch<AppDispatch>()
  const { setShowToast } = useContext(ToastContext)
  const [formData, setFormData] = useState<AcademicTerm>({
    term_name: term.term_name,
    start_date: term.start_date,
    end_date: term.end_date,
    completed: term.completed,
    academic_year_id: term.academic_year_id,
  })
  const addUpdateTerm = (e: ChangeEvent<any>) => {
    e.preventDefault()
    const academic_term: AcademicTerm = {
      id: term.id,
      term_name: formData.term_name,
      start_date: formData.start_date,
      end_date: formData.end_date,
      completed: formData.completed,
      academic_year_id: formData.academic_year_id,
    }

    dispatch(updateAcademicTerm(academic_term)).then((res: any) => {
      setShowToast(true)
      showToastify(res.payload.message, res.payload.status)
      if (res.payload.status === 'success') {
        dispatch(getAcademicTerms({ ...params, year_id: formData.academic_year_id, pagination: params.pagination })).then((resp: any) => {
          setAcademicTermEditModalOpen(false)
        }
        )
      }
    }
    )
    setAcademicTermEditModalOpen(false)
  }
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      term_name: term.term_name,
      start_date: term.start_date,
      end_date: term.end_date,
      completed: term.completed,
      academic_year_id: term.academic_year_id,
    }))
  }, [term, params])
  return (
    <Modal animation show={isOpen} onHide={onRequestClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Edit: {term.academic_year_name} Academic Year - {term.term_name} Term</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Card>
          <Card.Body>
            <Form>
              <Row className='d-flex flex-column flex-lg-row'>
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
                  <Button size='sm' onClick={addUpdateTerm}>Update Term</Button>
                </Col>
              </Row>
            </Form>

          </Card.Body>
        </Card>
      </Modal.Body>
    </Modal>
  )
}

export default AcademicTermEdit
