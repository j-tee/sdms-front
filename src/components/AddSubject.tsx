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
    <div className="academic-add-section">
      <div className="academic-section-header">
        <div className="academic-section-icon">
          <i className="fas fa-plus-circle"></i>
        </div>
        <h3 className="academic-section-title">Add New Subject</h3>
      </div>

      <form onSubmit={handleSubmit} className="academic-add-form">
        <Row>
          <Col md={5}>
            <Form.Group className="academic-form-group" controlId="subject_name">
              <Form.Label className="academic-form-label">
                <i className="fas fa-book me-2"></i>
                Subject Name
              </Form.Label>
              <Form.Control 
                value={formData.subject_name} 
                onChange={(e) => setFormData({ ...formData, subject_name: e.target.value })}
                type="text" 
                placeholder="Enter subject name"
                className="academic-form-control" 
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="academic-form-group" controlId="subject_code">
              <Form.Label className="academic-form-label">
                <i className="fas fa-code me-2"></i>
                Subject Code
              </Form.Label>
              <Form.Control 
                value={formData.subject_code} 
                onChange={(e) => setFormData({ ...formData, subject_code: e.target.value })}
                type="text" 
                placeholder="Enter subject code"
                className="academic-form-control" 
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <div className="academic-form-group">
              <Form.Label className="academic-form-label" style={{opacity: 0}}>Action</Form.Label>
              <button type="submit" className="btn-add-academic-item">
                <i className="fas fa-plus-circle me-2"></i>
                Add Subject
              </button>
            </div>
          </Col>
        </Row>
      </form>
    </div>
  )
}

export default AddSubject
