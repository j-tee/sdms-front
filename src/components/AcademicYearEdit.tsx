import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Col, Form, Modal, Row } from 'react-bootstrap'
import { AcademicYear } from '../models/calendar';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { getAcademicYears, updateAcademicYear } from '../redux/slices/calendarSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';

const AcademicYearEdit = (props: any) => {
  const { setAcademicYearEditModalOpen, isOpen, onRequestClose, academic_year, branchId, schoolId } = props;
  const dispatch = useDispatch<AppDispatch>()
  const { setShowToast} = useContext(ToastContext)
  const [formData, setFormData] = useState<AcademicYear>({
    id: academic_year.id,
    branch_id: branchId,
    start_date: academic_year.start_date,
    end_date: academic_year.end_date,
    term_category: academic_year.term_category,
  })
  const handleClick = (e: ChangeEvent<any>) => {
    e.preventDefault();
    const academic_year:AcademicYear={
      id:formData.id,
      branch_id:branchId,
      start_date:formData.start_date,
      end_date:formData.end_date,
      term_category:formData.term_category
    }
    dispatch(updateAcademicYear(academic_year)).then((res: any) => {
      setShowToast(true)
      showToastify(res.payload.message, res.payload.status)
      if(res.payload.status==='success'){
        dispatch(getAcademicYears({ school_id: schoolId, branch_id: branchId, pagination:{current_page:1, per_page:10} })).then((resp:any)=>{
         if(resp.payload.status==='error'){
          showToastify(resp.payload.message, resp.payload.status) 
         }
          setAcademicYearEditModalOpen(false)
        } 
        )
      }
      
    })
  }
  return (
    <Form>
      <Modal animation show={isOpen} onHide={onRequestClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Academic Year</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className='d-flex flex-column flex-lg-row'>
            <Col>
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  placeholder="Enter start date" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="endDate">
                <Form.Label>End Date</Form.Label>
                <Form.Control type="date" value={formData.end_date}
                  onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                  placeholder="Enter end date" />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="termCategory">
                <Form.Label>Term Category</Form.Label>
                <Form.Control as={'select'} type="text" value={formData.term_category}
                  onChange={(e) => setFormData({ ...formData, term_category: e.target.value })}
                  placeholder="Enter end date">
                  <option value=''>---Select---</option>
                  <option value='semester'>Semester</option>
                  <option value='term'>Term</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" onClick={handleClick} className="btn btn-primary">Submit</button>
        </Modal.Footer>
      </Modal>
    </Form>
  )
}

export default AcademicYearEdit
