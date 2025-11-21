import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { QueryParams } from '../models/queryParams';
import { AssessmentType } from '../models/assessmentTypes';
import { addAssessmentType, getAssessmentTypes } from '../redux/slices/assesmentTypeSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { Button, Card, Col, Form, Row, Table } from 'react-bootstrap';
import AssessmentTypeEdit from './AssessmentTypeEdit';
import UserSession from '../utility/userSession';

const AssessmentTypeCard = (props: any) => {
  const { schoolId, branchId, index } = props;
  const { assessment_types, pagination } = useSelector((state: RootState) => state.assessmentType)
  const dispatch = useDispatch<AppDispatch>()
  const { setShowToast } = useContext(ToastContext)
  const [isAssessmentTypeEditModalOpen, setAssessmentTypeEditModalOpen] = useState(false);
  const [isAssessmentTypeDeleteModalOpen, setAssessmentTypeDeleteModalOpen] = useState(false);  
  const [isAssessmentTypeDetailsModalOpen, setAssessmentTypeDetailsModalOpen] = useState(false);
  const privileged_school_roles = ['owner', 'admin', 'secretary', 'principal', 'vice_principal']
  const [roles, setRoles] = useState<string[]>([]);
  const [assessmentType, setAssessmentType] = useState<AssessmentType>({
    id: 0,
    category: '',
    percentage_score: 0,
    branch_id: 0,
  });
  const [params, setParams] = useState<QueryParams>({
    school_id: schoolId,
    branch_id: branchId,
    pagination: {
      current_page: 1,
      per_page: 10,
      total_items: 0,
      total_pages: 0,
    },
    paginate: true,
  });

  const [formData, setFormData] = useState<AssessmentType>({
    category: '',
    percentage_score: 0,
    branch_id: 0, // Add the missing branch_id property
  });

  useEffect(() => {
    const user_roles = UserSession.getroles()
      setRoles(user_roles)
    dispatch(getAssessmentTypes({ ...params, branch_id: branchId, school_id: schoolId }))
      .then((res: any) => {
        setShowToast(true)
        showToastify(res.payload.message, res.payload.status)
      })
  }, [dispatch, branchId, schoolId, setShowToast])

  const handleSubmit = (e: any) => {  
    e.preventDefault();
    setShowToast(true)
    dispatch(addAssessmentType({ ...formData, branch_id: branchId }))
      .then((res: any) => {
        dispatch(getAssessmentTypes({ ...params, branch_id: branchId, school_id: schoolId }))
        setShowToast(true)
        showToastify(res.payload.message, res.payload.status)
      })
  }

  const handleEdit = (assessment_type: AssessmentType) => {
    setAssessmentTypeEditModalOpen(true);
    setAssessmentType(assessment_type);
  }

  return (
    <div className="academic-section-content">
      {/* Add Assessment Type Form */}
      {roles && privileged_school_roles.some(role=>roles.includes(role)) && (
        <div className="academic-add-section mb-4">
          <div className="academic-section-header">
            <div className="academic-section-icon">
              <i className="fas fa-plus-circle"></i>
            </div>
            <h5>Add Assessment Type</h5>
          </div>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group controlId="formBasicEmail" className='academic-form-group'>
                  <Form.Label className="academic-form-label">
                    <i className="fas fa-clipboard-list me-2"></i>
                    Category
                  </Form.Label>
                  <Form.Select placeholder="Enter category" name="category" className="academic-form-control"
                    value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                    <option value="">---Select----</option>
                    <option value="CA">Continuous Assessment</option>
                    <option value="TA">Terminal Assessment</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formBasicEmail" className='academic-form-group'>
                  <Form.Label className="academic-form-label">
                    <i className="fas fa-percentage me-2"></i>
                    Percentage Score
                  </Form.Label>
                  <Form.Control type="number" className="academic-form-control" placeholder="Enter percentage score" name="percentage_score" 
                    value={formData.percentage_score} onChange={(e) => setFormData({...formData, percentage_score: parseFloat(e.target.value)})} />
                </Form.Group>
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col>
                <Button className="btn-add-academic-item" type="submit">
                  <i className="fas fa-check me-2"></i>
                  Submit Assessment Type
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      )}

      {/* Assessment Types Table */}
      <div className="academic-table-wrapper">
        <div className="academic-section-header">
          <div className="academic-section-icon">
            <i className="fas fa-clipboard-list"></i>
          </div>
          <h5>Assessment Types</h5>
        </div>
        <Table className="academic-table-modern" size='sm' responsive>
          <thead>
            <tr>
              <th>#</th>
              <th><i className="fas fa-tags me-2"></i>Category</th>
              <th><i className="fas fa-percentage me-2"></i>Percentage Score</th>
              <th><i className="fas fa-code-branch me-2"></i>Branch Name</th>
              <th><i className="fas fa-school me-2"></i>School Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assessment_types && assessment_types.length > 0 ? (
              assessment_types.map((assessment_type: any, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <span className={`assessment-category-badge ${assessment_type.category === 'CA' ? 'ca-badge' : 'ta-badge'}`}>
                      <i className={`fas ${assessment_type.category === 'CA' ? 'fa-tasks' : 'fa-file-alt'} me-2`}></i>
                      {assessment_type.category === 'CA' ? 'Continuous Assessment' : 'Terminal Assessment'}
                    </span>
                  </td>
                  <td>
                    <span className="percentage-badge">
                      <i className="fas fa-chart-line me-1"></i>
                      {assessment_type.percentage_score}%
                    </span>
                  </td>
                  <td>{assessment_type.branch_name}</td>
                  <td>{assessment_type.school_name}</td>
                  <td>
                    <Button onClick={() => handleEdit(assessment_type)} variant="link" className="table-action-btn edit-btn-table" size="sm">
                      <i className="fas fa-edit me-1"></i>
                      Edit
                    </Button>
                    <Button variant="link" className="table-action-btn delete-btn-table" size="sm">
                      <i className="fas fa-trash me-1"></i>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">
                    <i className="fas fa-clipboard fa-3x mb-3"></i>
                    <p>No assessment types found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <AssessmentTypeEdit isOpen={isAssessmentTypeEditModalOpen} 
      assessmentType={assessmentType}
      onRequestClose={() => setAssessmentTypeEditModalOpen(false)}
      setAssessmentTypeEditModalOpen={setAssessmentTypeEditModalOpen}
      schoolId={schoolId} branchId={branchId} index={index} params={params} />
    </div>
  )
}

export default AssessmentTypeCard
