import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import DepartmentDropDown from './DepartmentDropDown';
import ProgramDropDown from './ProgramDropDown';
import StageDropDown from './StageDropDown';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getDepartments } from '../redux/slices/departmentSlice';
import { ProgramSubject, ProgramSubjectParams } from '../models/subject';
import { getPrograms } from '../redux/slices/programSlice';
import { getStages } from '../redux/slices/stageSlice';
import { ProgramParams } from '../models/program';
import { StageParams } from '../models/stage';
import { getSubjects } from '../redux/slices/subjectSlice';
import { addCourseOption, getCourseOptions } from '../redux/slices/programSubjectSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { getCurrentTerm } from '../redux/slices/calendarSlice';
import ProgramSubjectDetails from './ProgramSubjectDetails';
import PaginationComponent from './PaginationComponent';
import UserSession from '../utility/userSession';

const CourseOption = (props: any) => {
  const { schoolId, branchId, tabKey } = props;
  const { course_options, pagination } = useSelector((state: RootState) => state.programSubject)
  const dispatch = useDispatch<AppDispatch>();
  const { subjects } = useSelector((state: RootState) => state.subject);
  const { showToast, setShowToast } = useContext(ToastContext)
  const { academic_term } = useSelector((state: RootState) => state.calendar)
  const [deptId, setDeptId] = useState<number>(0);
  const privileged_school_roles = ['owner', 'admin', 'secretary', 'principal', 'vice_principal']
  const [roles, setRoles] = useState<string[]>([]);
  const [params, setParams] = useState<ProgramSubjectParams>({
    school_id: schoolId, 
    branch_id: branchId, 
    pagination: { current_page: 1, per_page: 10 }, 
    paginate: true
  } as ProgramSubjectParams);
  const [formData, setFormData] = useState<ProgramSubject>({
    stage_id: 0,
    academic_term_id: 0,
    subject_id: 0,
    program_id: 0,
    optional: 0,
    credit_hours: 0,
  });

  type AnyType = {
    [key: string]: string;
  };
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    // Update the formData state with the new value
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    switch (field) {
      case 'department_id': {
        setDeptId(parseInt(value))
        dispatch(getPrograms({ ...params, school_id: schoolId, branch_id: branchId, department_id: parseInt(value) } as ProgramParams))
        break;
      }
      case 'program_id': {
        if(branchId)
        dispatch(getStages({ ...params, school_id: schoolId, branch_id: branchId, program_id: parseInt(value), paginate: false } as StageParams))
        break;
      }
      default: {
        break;
      }
    }
    
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addCourseOption({ ...formData, academic_term_id: academic_term.id ?? 0 })).then((resp: any) => {
      setShowToast(true)
      showToastify(resp.payload.message, resp.payload.status)
      dispatch(getCourseOptions({ ...params, school_id: schoolId, branch_id: branchId, paginate: true  }))
    })
  }
  useEffect(() => {
    if (tabKey === 'course-options') {
      const user_roles = UserSession.getroles()
      setRoles(user_roles)
      dispatch(getCourseOptions({...params})).then((resp: any) => {
        showToastify(resp.payload.message, resp.payload.status)
      })
      dispatch(getCurrentTerm(branchId)).then((resp: any) => {
        setFormData((prevData) => ({
          ...prevData,
          academic_term_id: academic_term.id as number,
        }));
      })
      dispatch(getDepartments({ ...params, school_id: schoolId, branch_id: branchId }))
      dispatch(getSubjects({ ...params, school_id: schoolId, branch_id: branchId, paginate: false, pagination: { current_page: 1, per_page: 10000 } }))
    }
    
  }, [schoolId, branchId, tabKey, dispatch, params])

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
    <div>
      <Row className='d-flex flex-column flex-lg-row'>
        <Col>
          <DepartmentDropDown schoolId={schoolId} branchId={branchId} onChange={handleInputChange} />
        </Col>
        <Col>
          <ProgramDropDown value={undefined} branchId={branchId} onChange={handleInputChange} departmentId={undefined} />
        </Col>
        <Col>
          <StageDropDown lesson={undefined} branchId={branchId} onChange={handleInputChange} />
        </Col>
      </Row>
      <Form onSubmit={handleSubmit}>
        <Row className='d-flex flex-column flex-lg-row'>
          <Col>
            <Form.Group controlId='subjectName' className='mb-3'>
              <Form.Label>Subject Name</Form.Label>
              <Form.Control as={'select'} type="text" value={formData.subject_id}
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
            <Form.Group controlId='options' className='mb-3'>
              <Form.Label>Optional</Form.Label>
              <Form.Control as={'select'} type="text"
                onChange={(e) => setFormData({ ...formData, optional: parseInt(e.target.value) })}
                value={formData.optional}
                placeholder="Enter subject name">
                <option value="">---Select---</option>
                <option value="0">No</option>
                <option value="1">Yes</option>
              </Form.Control>
            </Form.Group>
          </Col>
          {roles && privileged_school_roles.some(role=>roles.includes(role)) && <Col>
            <Form.Group controlId='creditHours' className='mb-3'>
              <Form.Label>Credit Hours</Form.Label>
              <Form.Control type="number"
                onChange={(e) => setFormData({ ...formData, credit_hours: parseFloat(e.target.value) })}
                value={formData.credit_hours}
                placeholder="Enter credit hours" />

            </Form.Group>
          </Col>}
        </Row>
        <Row>
          <Col>
            <button type="submit" className="btn btn-primary">Add Course Option</button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Card.Header>
          Course Options
        </Card.Header>
        {course_options.map((course_option) => (
          <ProgramSubjectDetails branchId={branchId} schoolId={schoolId} key={course_option.id} course_option={course_option} />
        ))}
      </Row>
      <div className="d-flex px-2 justify-content-between flex-column flex-lg-row align-items-center">
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
        <DropdownButton className="mb-2" id="dropdown-items-per-page" title={`Items per page: ${params.pagination?.per_page}`}>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  )
}

export default CourseOption
