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
    <div>
      {roles && privileged_school_roles.some(role=>roles.includes(role)) && <Form onSubmit={ handleSubmit }>
        <Card.Body>
          <Row>
            <Col>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Category</Form.Label>
                <Form.Select placeholder="Enter category" name="category" 
                value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option value="">---Select----</option>
                  <option value="CA">Continuous Assessment</option>
                  <option value="TA">Terminal Assessment</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Percentage Score</Form.Label>
                <Form.Control type="number" placeholder="Enter percentage score" name="percentage_score" 
                value={formData.percentage_score} onChange={(e) => setFormData({...formData, percentage_score: parseFloat(e.target.value)})} />
              </Form.Group>
            </Col>
          </Row>
          <Row className='mt-3'>
            <Col>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Form>}
      <Card.Body>
        <Card.Title>Assessment Types</Card.Title>
        <Card.Text>
          <Table size='sm' variant='' responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Percentage Score</th>
                <th>Branch Name</th>
                <th>School Name</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              { assessment_types && assessment_types.map((assessment_type: any, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{assessment_type.category === 'CA'? 'Continuous Assessment':'Terminal Assessment'}</td>
                  <td>{assessment_type.percentage_score}</td>
                  <td>{assessment_type.branch_name}</td>
                  <td>{assessment_type.school_name}</td>
                  <td className='d-flex flex-column flex-lg-row gap -lg-2'>
                    <span>
                      <Button onClick={() => handleEdit(assessment_type)} variant="link" size="sm" className='me-2'>
                        Edit
                      </Button>
                    </span>
                    <span>
                      <Button variant="link" size="sm">
                        Delete
                      </Button>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Text>  
      </Card.Body>
      <AssessmentTypeEdit isOpen={isAssessmentTypeEditModalOpen} 
      assessmentType={assessmentType}
      onRequestClose={() => setAssessmentTypeEditModalOpen(false)}
      setAssessmentTypeEditModalOpen={setAssessmentTypeEditModalOpen}
      schoolId={schoolId} branchId={branchId} index={index} params={params} />
    </div>
  )
}

export default AssessmentTypeCard
