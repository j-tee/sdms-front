import { useContext, useState } from 'react'
import { ToastContext } from '../utility/ToastContext';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { addSubject, getSubjects } from '../redux/slices/subjectSlice';
import { Col, Form, Row } from 'react-bootstrap';
import { showToastify } from '../utility/Toastify';

const AddSubject = (props: any) => {
  const { schoolId, branchId, params } = props;
  const { setShowToast } = useContext(ToastContext);
  const dispatch = useDispatch<AppDispatch>();
 
  const [formData, setFormData] = useState({
    subject_name: "",
    branch_id: branchId,
    subject_code: "",
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addSubject({ ...formData, branch_id: branchId })).then((resp) => {
      dispatch(getSubjects({ ...params, school_id: schoolId, branch_id: branchId }))
      showToastify(resp.payload.message, resp.payload.status);
      setShowToast(true);
    })
  }
 
  return (
    <div className='mb-5'>
      <form onSubmit={handleSubmit}>
        <Row className='d-flex flex-column flex-lg-row'>
          <Col>
            <Form.Group className="mb-3" controlId="subject_name">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control 
              value={formData.subject_name} onChange={(e) => setFormData({ ...formData, subject_name: e.target.value })}
              type="text" placeholder="Enter subject name" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="subject_code">
              <Form.Label>Subject Code</Form.Label>
              <Form.Control 
              value={formData.subject_code} onChange={(e) => setFormData({ ...formData, subject_code: e.target.value })}
              type="text" placeholder="Enter subject code" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <button type="submit" className="btn btn-primary">Add Subject</button>
          </Col>
        </Row>
      </form>
    </div>
  )
}

export default AddSubject
