import React, { useEffect, useState } from 'react'
import { Col, Dropdown, DropdownButton, Form, Row, Table } from 'react-bootstrap';
import AssessmentTypeDropDown from './AssessmentTypeDropDown';
import LessonDropDown from './LessonDropDown';
import StaffDropDown from './StaffDropDown';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getStaffs } from '../redux/slices/staffSlice';
import { getAssessmentTypes } from '../redux/slices/assesmentTypeSlice';
import { getLessons } from '../redux/slices/lessonSlice';
import { getCurrentTerm } from '../redux/slices/calendarSlice';
import { Assessment } from '../models/assessment';
import { addAssessment, getAssessments } from '../redux/slices/assessmentSlice';
import { showToastify } from '../utility/Toastify';
import { getStaffSubjectList } from '../redux/slices/subjectSlice';
import StaffSubjectDropDown from './StaffSubjectDropDown';
import StaffClassGroupDropDown from '../redux/slices/StaffClassGroupDropDown';
import { getStaffClassGroups } from '../redux/slices/classGroupSlice';
import PaginationComponent from './PaginationComponent';

const ContinuousAssessmentCard = (props: any) => {
  const { schoolId, branchId, index } = props;
  const { academic_term } = useSelector((state: RootState) => state.calendar)
  const { assessments, pagination } = useSelector((state: RootState) => state.assessment)
  const dispatch = useDispatch<AppDispatch>()
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState<Assessment>({
    subject_id: 0,
    assessment_type_id: 0,
    assessment_name: '',
    base_mark: 0,
    pass_mark: 0,
    academic_term_id: 0,
    staff_id: 0,

  });

  const [params, setParams] = useState({
    program_id: 0,
    branch_id: branchId,
    school_id: schoolId,
    assessment_type_id: 0,
    subject_id: 0,
    class_group_id: 0,
    department_id: 0,
    stage_id: 0,
    paginate: false,
    pagination: {
      per_page: 20,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })
  type AnyType = {
    [key: string]: string;
  };
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    switch (field) {
      case 'staff_id':
        dispatch(getLessons({ ...params, staff_id: parseInt(value), academic_term_id: academic_term.id, branch_id: branchId, paginate: false }))
        dispatch(getStaffClassGroups({ ...params, academic_term_id: academic_term.id, staff_id: parseInt(value), branch_id: branchId, paginate: false }))
        dispatch(getStaffSubjectList({ ...params, staff_id: parseInt(value), branch_id: branchId, academic_term_id: academic_term.id, paginate: false }))
        break;
      case 'subject_id':
        dispatch(getStaffClassGroups({ ...params, academic_term_id: academic_term.id, subject_id: parseInt(value), branch_id: branchId, paginate: false }))
        break;
    }
    dispatch(getAssessmentTypes({ ...params, branch_id: branchId, paginate: false }))


  }
  
  useEffect(() => {
    if (index === 'ca') {
      dispatch(getAssessments({ ...params, branch_id: branchId, paginate: true }))
      dispatch(getCurrentTerm(branchId))
      dispatch(getStaffs({ ...params, branch_id: branchId, paginate: false }))
    }
  }, [branchId, index, params])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const assessment: Assessment = {
      ...formData,
      subject_id: parseInt(formData.subject_id.toString()),
      staff_id: parseInt(formData.staff_id.toString()),
      academic_term_id: academic_term.id ?? 0,
      assessment_type_id: parseInt(formData.assessment_type_id.toString()),
      base_mark: parseInt(formData.base_mark.toString()),
      pass_mark: parseInt(formData.pass_mark.toString()),
      assessment_name: formData.assessment_name,
    }
    dispatch(addAssessment(assessment))
      .then((res: any) => {
        setShowToast(true)
        showToastify(res.payload.message, res.payload.status)
        dispatch(getAssessments({ ...params, branch_id: branchId, paginate: true }))
      })
  }
  const handlePageChange = (page: number) => {
    // setCurrentPage(page);
    setParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        current_page: page,
      },
    }));
  };

  const handleItemsPerPageChange = (perPage: number) => {
    // setItemsPerPage(perPage);
    setParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        per_page: perPage,
      },
    }));
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <StaffDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} value={undefined} />
          </Col>
          <Col>
            <AssessmentTypeDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} />
          </Col>
          <Col>
            <StaffSubjectDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} />
          </Col>
          <Col>
            <StaffClassGroupDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="assessment_name">
              <Form.Label>Assessment</Form.Label>
              <Form.Control type="text"
                onChange={(e) => handleInputChange('assessment_name', e.target.value)}
                value={formData.assessment_name}
                placeholder="E.g Class Work, Home Work etc" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="base_mark">
              <Form.Label>Base Mark</Form.Label>
              <Form.Control type="number"
                onChange={(e) => handleInputChange('base_mark', e.target.value)}
                value={formData.base_mark}
                placeholder="Base Mark" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="pass_mark">
              <Form.Label>Pass Mark</Form.Label>
              <Form.Control type="number"
                onChange={(e) => handleInputChange('pass_mark', e.target.value)}
                value={formData.pass_mark}
                placeholder="Pass Mark" />
            </Form.Group>
          </Col>
        </Row>
        <Row className='mt-2'>
          <Col>
            <button className="btn btn-primary" type="submit">Add Assessment</button>
          </Col>
        </Row>
      </Form>
      <Table striped bordered hover size="sm" className='mt-4' variant='light'>
        <thead>
          <tr>
            <th>Assessment Name</th>
            <th>Base Mark</th>
            <th>Pass Mark</th>
            <th>Assessment Type</th>
            <th>Subject</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          {assessments.map((assessment) => (
            <tr key={assessment.id}>
              <td>{assessment.assessment_name}</td>
              <td>{assessment.base_mark}</td>
              <td>{assessment.pass_mark}</td>
              <td>{assessment.category}</td>
              <td>{assessment.subject_name}</td>
              <td>{assessment.class_group_name}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <h2>{params.pagination?.per_page}</h2>
      <h2>{params.pagination?.total_items || 0}</h2>
      <h2>{params.pagination?.total_pages}</h2> */}
     <div className="d-flex flex-column flex-md-row px-2 justify-content-between align-items-center">
            <PaginationComponent
              params={params}
              activePage={pagination?.current_page}
              itemsCountPerPage={pagination?.per_page}
              totalItemsCount={pagination?.total_items || 0}
              pageRangeDisplayed={5}
              totalPages={pagination?.total_pages}
              hideDisabled={pagination?.total_pages === 0}
              hideNavigation={pagination?.total_pages === 1}
              onChange={handlePageChange}
            />
            <DropdownButton
              className="mt-2 mt-md-0 mb-2"
              id="dropdown-items-per-page"
              title={`Items per page: ${params.pagination?.per_page}`}
            >
              <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
            </DropdownButton>
          </div>
    </>
  )
}

export default ContinuousAssessmentCard
