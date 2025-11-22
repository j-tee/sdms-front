import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Dropdown, DropdownButton, Form, Row, Table } from 'react-bootstrap';
import DepartmentDropDown from './DepartmentDropDown';
import ProgramDropDown from './ProgramDropDown';
import StageDropDown from './StageDropDown';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartments } from '../redux/slices/departmentSlice';
import { ProgramSubject, ProgramSubjectParams, ProgramSubjectViewModel } from '../models/subject';
import { getPrograms } from '../redux/slices/programSlice';
import { getStages } from '../redux/slices/stageSlice';
import { ProgramParams } from '../models/program';
import { StageParams } from '../models/stage';
import { getSubjects } from '../redux/slices/subjectSlice';
import { addCourseOption, getCourseOptions } from '../redux/slices/programSubjectSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { getCurrentAcademicYear, getCurrentTerm } from '../redux/slices/calendarSlice';
import ProgramSubjectDetails from './ProgramSubjectDetails';
import PaginationComponent from './PaginationComponent';
import UserSession from '../utility/userSession';
import CourseOptionEditModal from './CourseOptionEditModal';
import CourseOptionDeleteModal from './CourseOptionDeleteModal';

const CourseOption = (props: any) => {
  const { schoolId, branchId, tabKey } = props;
  const { course_options, pagination } = useSelector((state: RootState) => state.programSubject)
  const dispatch = useDispatch<AppDispatch>();
  const { subjects } = useSelector((state: RootState) => state.subject);
  const { showToast, setShowToast } = useContext(ToastContext)
  const { academic_term, academic_year } = useSelector((state: RootState) => state.calendar)
  const [deptId, setDeptId] = useState<number>(0);
  const privileged_school_roles = ['owner', 'admin', 'secretary', 'principal', 'vice_principal']
  const [roles, setRoles] = useState<string[]>([]);
  const [courseOption, setCourseOption] = useState<ProgramSubject>({} as ProgramSubject);
  const [isCoueseOptionDeleteModalOpen, setCourseOptionDeleteModalOpen] = useState(false);
  const [isCoueseOptionEditModalOpen, setCourseOptionEditModalOpen] = useState(false);
  const [subjectId, setSubjectId] = useState<number>(0);
  const [params, setParams] = useState<ProgramSubjectParams>({
    school_id: schoolId,
    branch_id: branchId,
    pagination: { current_page: 1, per_page: 10 },
    paginate: true
  } as ProgramSubjectParams);
  const [formData, setFormData] = useState<ProgramSubject>({
    stage_id: 0,
    academic_year_id: 0,
    subject_id: 0,
    program_id: 0,
    optional: 0,
    credit_hours: 0,
  });

  type AnyType = {
    [key: string]: string;
  };
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setParams((prev) => ({
      ...prev,
      [field]: value
    }))
    // Update the formData state with the new value
    if(field !== 'department_id'){
      setFormData((prevData) => ({
        ...prevData,
        [field]: value
      }));
    }
    switch (field) {
      case 'department_id': {
        setDeptId(parseInt(value))
        dispatch(getPrograms({ ...params, school_id: schoolId, branch_id: branchId, department_id: parseInt(value) } as ProgramParams))
        break;
      }
      case 'program_id': {
        if (branchId)
          dispatch(getStages({ ...params, school_id: schoolId, branch_id: branchId, program_id: parseInt(value), paginate: false } as StageParams))
        break;
      }
      default: {
        break;
      }
    }
    dispatch(getCourseOptions({...params, school_id: schoolId, branch_id: branchId}))
  };

  const handleEdit = (course_option: ProgramSubjectViewModel) => {
    setCourseOption({
      ...course_option
      // academic_year_id: course_option.academic_year_id ?? academic_year.id
    } as ProgramSubject);
    setCourseOptionEditModalOpen(true);
  }

  const handleDelete = (course_option_id: number) => {
    setSubjectId(course_option_id);
    setCourseOptionDeleteModalOpen(true);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addCourseOption({ ...formData, academic_year_id: academic_year.id ?? 0 })).then((resp: any) => {
      setShowToast(true)
      showToastify(resp.payload.message, resp.payload.status)
      dispatch(getCourseOptions({ ...params, school_id: schoolId, branch_id: branchId, paginate: true }))
    })
  }
  useEffect(() => {
    if (tabKey === 'course-options') {
      const user_roles = UserSession.getroles()
      setRoles(user_roles)
      dispatch(getCourseOptions({ ...params })).then((resp: any) => {
        showToastify(resp.payload.message, resp.payload.status)
      })
      dispatch(getCurrentAcademicYear(branchId)).then((resp: any) => {
        setFormData((prevData) => ({
          ...prevData,
          academic_year_id: academic_year.id as number,
        }));
      })
      
      dispatch(getDepartments({ ...params, school_id: schoolId, branch_id: branchId }))
      dispatch(getSubjects({ ...params, stage_id:0, department_id:0, program_id:0, school_id: schoolId, branch_id: branchId, paginate: false, pagination: { current_page: 1, per_page: 10000 } }))
    }

  }, [schoolId, branchId, tabKey, dispatch, params, academic_year.id])

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
        current_page: 1,
        per_page: perPage,
      },
    }));
  };
  return (
    <div className="academic-section-content">
      {/* Filter Row */}
      <div className="filter-card-modern mb-4">
        <div className="filter-header">
          <div className="filter-icon-wrapper">
            <i className="fas fa-filter"></i>
          </div>
          <h5>Filter Course Options</h5>
        </div>
        <div className="card-body">
        <Row className='d-flex flex-column flex-lg-row'>
          <Col>
            <DepartmentDropDown schoolId={schoolId} branchId={branchId} onChange={handleInputChange} />
          </Col>
          <Col>
            <ProgramDropDown admission={undefined} branchId={branchId} onChange={handleInputChange} departmentId={undefined} />
          </Col>
          <Col>
            <StageDropDown lesson={undefined} branchId={branchId} onChange={handleInputChange} />
          </Col>
        </Row>
        </div>
      </div>

      {/* Add Form */}
      <div className="academic-add-section mb-4">
        <div className="academic-section-header">
          <div className="academic-section-icon">
            <i className="fas fa-plus-circle"></i>
          </div>
          <h5>Add Course Option</h5>
        </div>
        <Form onSubmit={handleSubmit}>
          <Row className='d-flex flex-column flex-lg-row'>
            <Col>
              <Form.Group controlId='subjectName' className='academic-form-group'>
                <Form.Label className="academic-form-label">
                  <i className="fas fa-book me-2"></i>
                  Subject Name
                </Form.Label>
                <Form.Control as={'select'} className="academic-form-control" type="text" value={formData.subject_id}
                  onChange={(e) => setFormData({ ...formData, subject_id: parseInt(e.target.value) })}
                  placeholder="Enter subject name">
                  <option value="">---Select---</option>
                  {subjects.map((subject) => (<option key={subject.id} value={subject.id}>
                    {subject.subject_name}
                  </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='options' className='academic-form-group'>
                <Form.Label className="academic-form-label">
                  <i className="fas fa-check-circle me-2"></i>
                  Optional
                </Form.Label>
                <Form.Control as={'select'} className="academic-form-control" type="text"
                  onChange={(e) => setFormData({ ...formData, optional: parseInt(e.target.value) })}
                  value={formData.optional}
                  placeholder="Enter subject name">
                  <option value="">---Select---</option>
                  <option value="0">No</option>
                  <option value="1">Yes</option>
                </Form.Control>
              </Form.Group>
            </Col>
            {roles && privileged_school_roles.some(role => roles.includes(role)) && <Col>
              <Form.Group controlId='creditHours' className='academic-form-group'>
                <Form.Label className="academic-form-label">
                  <i className="fas fa-clock me-2"></i>
                  Credit Hours
                </Form.Label>
                <Form.Control type="number" className="academic-form-control"
                  onChange={(e) => setFormData({ ...formData, credit_hours: parseFloat(e.target.value) })}
                  value={formData.credit_hours}
                  placeholder="Enter credit hours" />
              </Form.Group>
            </Col>}
          </Row>
          <Row>
            <Col>
              <button type="submit" className="btn btn-add-academic-item">
                <i className="fas fa-plus me-2"></i>
                Add Course Option
              </button>
            </Col>
          </Row>
        </Form>
      </div>

      {/* Course Options Table */}
      <div className="academic-table-wrapper">
        <div className="academic-section-header">
          <div className="academic-section-icon">
            <i className="fas fa-list"></i>
          </div>
          <h5>Course Options</h5>
        </div>
        <Table className="academic-table-modern" size='sm' responsive>
          <thead>
            <tr>
              <th>Subject Name</th>
              <th>Optional</th>
              <th>Credit Hours</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {course_options.map((course_option) => (
              <tr key={course_option.id}>
                <td>
                  <div className="subject-badge">
                    <i className="fas fa-book me-2"></i>
                    {course_option.subject_name}
                  </div>
                </td>
                <td>
                  {course_option.optional ? (
                    <span className="badge bg-warning text-dark">
                      <i className="fas fa-check me-1"></i>
                      Yes
                    </span>
                  ) : (
                    <span className="badge bg-secondary">
                      <i className="fas fa-times me-1"></i>
                      No
                    </span>
                  )}
                </td>
                <td>
                  <span className="credit-hours-badge">
                    <i className="fas fa-clock me-1"></i>
                    {course_option.credit_hours}
                  </span>
                </td>
                <td>
                  <Button variant='link' className="table-action-btn edit-btn-table me-2" onClick={() => handleEdit(course_option)}>
                    <i className="fas fa-edit me-1"></i>
                    Edit
                  </Button>
                  <Button variant="link" className="table-action-btn delete-btn-table" onClick={() => handleDelete(course_option.id)}>
                    <i className="fas fa-trash me-1"></i>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="d-flex flex-column flex-md-row px-2 justify-content-between align-items-center mt-3">
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
      <CourseOptionEditModal
        schoolId={schoolId} branchId={branchId}
        isOpen={isCoueseOptionEditModalOpen} 
        onRequestClose={() => setCourseOptionEditModalOpen(false)}
        subject={courseOption} 
        params={params}
        setCourseOptionEditModalOpen={setCourseOptionEditModalOpen} />

        <CourseOptionDeleteModal
          subjectId={subjectId}
          params={params}
          isOpen={isCoueseOptionDeleteModalOpen}
          onRequestClose={() => setCourseOptionDeleteModalOpen(false)}
          setCourseOptionDeleteModalOpen={setCourseOptionDeleteModalOpen}
        />
    </div>
  )
}

export default CourseOption
