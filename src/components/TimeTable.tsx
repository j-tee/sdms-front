import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Dropdown, DropdownButton, Form, Row, Table } from 'react-bootstrap'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getStaffs } from '../redux/slices/staffSlice';
import StaffDropDown from './StaffDropDown';
import { Lesson, LessonViewModel } from '../models/Lesson';
import ProgramDropDown from './ProgramDropDown';
import StageDropDown from './StageDropDown';
import ClassGroupDropDown from './ClassGroupDropDown';
import ProgramSubjectDropDown from './ProgramSubjectDropDown';
import DayOfWeekDropDown from './DayOfWeekDropDown';
import { getCourseOptions } from '../redux/slices/programSubjectSlice';
import { getPrograms } from '../redux/slices/programSlice';
import { getStages } from '../redux/slices/stageSlice';
import { getClassGroups, getStaffClassGroups } from '../redux/slices/classGroupSlice';
import { ClassGroupParams } from '../models/classGroup';
import TimePicker from 'react-time-picker';
import { addLesson, getLessons } from '../redux/slices/lessonSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import TimeTableEditModal from './TimeTableEditModal';
import { QueryParams } from '../models/queryParams';
import UserSession from '../utility/userSession';
import PaginationComponent from './PaginationComponent';
import { getCurrentAcademicYear } from '../redux/slices/calendarSlice';

const TimeTable = (props: any) => {
  const { schoolId, branchId, tabKey, lessonTabIndex } = props;
  const dispatch = useDispatch<AppDispatch>();

  const { setShowToast } = useContext(ToastContext);
  const [isTimeTableEditModalOpen, setTimeTableEditModalOpen] = useState(false);
  const privileged_school_roles = ['owner', 'admin', 'secretary', 'principal', 'vice_principal']
  const [roles, setRoles] = useState<string[]>([]);
  const { lessons, pagination } = useSelector((state: RootState) => state.lesson)
  const { academic_year } = useSelector((state: RootState) => state.calendar)
  const [startTime, setStartTime] = useState<string>('7:45');
  const [endTime, setEndTime] = useState<string>('8:45');
  const [params, setParams] = useState<QueryParams>({
    school_id: schoolId,
    branch_id: branchId,
    program_id: 0,
    stage_id: 0,
    department_id: 0,
    class_group_id: 0,
    staff_id: 0,
    program_subject_id: 0,
    day_of_week: '',
    start_time: '',
    end_time: '',
    academic_year_id: academic_year.id,
    pagination: { per_page: 10, current_page: 1, total_items: 0, total_pages: 0 },
    paginate: true
  })
  const [lesson, setLesson] = useState<LessonViewModel>({
    id: 0,
    class_group_id: 0,
    staff_id: 0,
    program_subject_id: 0,
    day_of_week: '',
    start_time: '',
    end_time: '',
    class_group_name: '',
    staff_name: '',
    subject_name: '',
    program_name: '',
    stage_name: '',
    term_name: '',
    dept_name: '',
  });

  const [formData, setFormData] = useState<Lesson>({
    class_group_id: 0,
    staff_id: 0,
    program_subject_id: 0,
    day_of_week: '',
    start_time: '',
    end_time: '',
  });

  type AnyType = {
    [key: string]: string;
  };

  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    // Determine whether to parse to an integer or use the string directly
    const isNumericField = ['stage_id', 'program_id', 'staff_id', 'program_subject_id', 'class_group_id'].includes(field as string);
    const parsedValue = isNumericField ? parseInt(value, 10) : value;

    // Update the params and formData with the appropriate value
   
    setParams((prevData) => ({
      ...prevData,
      [field]: isNumericField ? parsedValue : value,
      paginate: false,
    }));
   
    if((field !== 'program_id') && (field !== 'stage_id')){
      setFormData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
   
    const updatedParams = {
      ...params,
      [field]: isNumericField ? parsedValue : value,
      paginate: false,
    };

    // Handle specific field cases
    switch (field) {
      case 'stage_id':
        dispatch(getClassGroups(updatedParams as ClassGroupParams));
        break;

      case 'day_of_week':
        // Specific logic for day_of_week
        break;

      case 'program_id':
        if (branchId) {
          dispatch(getStages(updatedParams));
        }
        break;

      case 'staff_id':
        dispatch(getStaffClassGroups(updatedParams));
        break;

      case 'program_subject_id':
        // Logic for program_subject_id
        break;

      case 'class_group_id':
        // Logic for class_group_id
        break;
      case 'start_time':
        // Logic for start_time
        setStartTime(value);
        break;
      case 'end_time':
        setEndTime(value);
        break
      default:
        break;
    }
  };

  useEffect(() => { 
    if (tabKey === 'time-table') {
     setEndTime('8:45')
      setStartTime('7:45')
      setFormData((prevData) => ({
        ...prevData,
        start_time: startTime || '7:45',
        end_time: endTime || '8:45',
      }));
    }
   }, []);
  useEffect(() => {
    if (tabKey === 'time-table') {
      const user_roles = UserSession.getroles()
      setRoles(user_roles)
      dispatch(getCurrentAcademicYear(branchId || 0))
      if (lessonTabIndex === 'second') {
        dispatch(getLessons({ ...params, academic_year_id: academic_year.id, pagination: params.pagination!, paginate: true }))
          .then((res) => {
            setShowToast(true);
            showToastify(res.payload.message, res.payload.status);
          })
      }

      dispatch(getPrograms({ ...params, branch_id: branchId || 0, paginate: false }))
      dispatch(getCourseOptions({ ...params, pagination: params.pagination!, paginate: false }))
      dispatch(getStaffs({ ...params, paginate: false }))
    }
  }, [params]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addLesson({ ...formData }))
      .then((res) => {
        setShowToast(true);
        showToastify(res.payload.message, res.payload.status);
        dispatch(getLessons({ ...params, pagination: params.pagination!, paginate: true }))
          .then((res) => {
            setShowToast(true);
            showToastify(res.payload.message, res.payload.status);
          })
      }
      )
  }
  const handleEdit = (lesson: any) => {
    setTimeTableEditModalOpen(true)
    setLesson((prevParams) => ({
      ...prevParams,
      id: lesson.id,
      class_group_id: lesson.class_group_id,
      class_group_name: lesson.class_group_name,
      staff_id: lesson.staff_id,
      program_subject_id: lesson.program_subject_id,
      day_of_week: lesson.day_of_week,
      start_time: lesson.start_time,
      end_time: lesson.end_time,
      staff_name: lesson.staff_name,
      stage_name: lesson.stage_name,
      subject_name: lesson.subject_name,
      program_name: lesson.program_name,
      term_name: lesson.term_name,
    }))
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
    <div className="academic-section-content">
      {/* Filter and Add Section */}
      <div className="academic-add-section mb-4">
        <div className="academic-section-header">
          <div className="academic-section-icon">
            <i className="fas fa-calendar-plus"></i>
          </div>
          <h5>Create Time Table Entry</h5>
        </div>
        <Form onSubmit={handleSubmit}>
          <Row className='d-flex flex-column flex-lg-row mb-3'>
            <Col>
              <StaffDropDown onChange={handleInputChange} value={undefined} branchId={0} schoolId={0} />
            </Col>
            <Col>
              <ProgramDropDown admission={undefined} onChange={handleInputChange} departmentId={undefined} branchId={0} />
            </Col>
            <Col>
              <StageDropDown lesson={undefined} onChange={handleInputChange} branchId={0} />
            </Col>
          </Row>
          <Row className='d-flex flex-column flex-lg-row mb-3'>
            <Col>
              <ClassGroupDropDown lesson={undefined} onChange={handleInputChange} programId={params.program_id || 0} stageId={params.stage_id || 0} departmentId={params.department_id || 0} />
            </Col>
            <Col>
              <ProgramSubjectDropDown onChange={handleInputChange} lesson={undefined} />
            </Col>
            <Col>
              <DayOfWeekDropDown onChange={handleInputChange} lesson={undefined} />
            </Col>
          </Row>
          {roles && privileged_school_roles.some(role => roles.includes(role)) && (
            <>
              <Row className='d-flex flex-column flex-lg-row align-items-center mb-3'>
                <Col md={6}>
                  <Form.Group className='academic-form-group'>
                    <Form.Label className="academic-form-label">
                      <i className="fas fa-clock me-2"></i>
                      Start Time
                    </Form.Label>
                    <TimePicker
                      onChange={(value) => handleInputChange('start_time', value as string)}
                      value={startTime}
                      className="academic-time-picker"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className='academic-form-group'>
                    <Form.Label className="academic-form-label">
                      <i className="fas fa-clock me-2"></i>
                      End Time
                    </Form.Label>
                    <TimePicker
                      onChange={(e) => handleInputChange('end_time', e as string)}
                      value={endTime}
                      className="academic-time-picker"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <button type="submit" className="btn btn-add-academic-item">
                    <i className="fas fa-save me-2"></i>
                    Save Time Table Entry
                  </button>
                </Col>
              </Row>
            </>
          )}
        </Form>
      </div>

      {/* Time Table Display */}
      <div className="academic-table-wrapper">
        <div className="academic-section-header">
          <div className="academic-section-icon">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <h5>Time Table</h5>
        </div>
        <Table className="academic-table-modern" responsive size='sm'>
          <thead>
            <tr>
              <th><i className="fas fa-calendar-day me-2"></i>Day</th>
              <th><i className="fas fa-clock me-2"></i>Start Time</th>
              <th><i className="fas fa-clock me-2"></i>End Time</th>
              <th><i className="fas fa-book me-2"></i>Subject</th>
              <th><i className="fas fa-users me-2"></i>Class</th>
              <th><i className="fas fa-chalkboard-teacher me-2"></i>Staff</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {lessons.length > 0 ? (
              lessons.map((lesson, index) => (
                <tr key={index}>
                  <td>
                    <span className="day-badge">
                      <i className="fas fa-calendar-day me-2"></i>
                      {lesson.day_of_week}
                    </span>
                  </td>
                  <td>
                    <span className="time-badge">
                      <i className="fas fa-hourglass-start me-1"></i>
                      {new Date(lesson.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>
                  <td>
                    <span className="time-badge">
                      <i className="fas fa-hourglass-end me-1"></i>
                      {new Date(lesson.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </td>
                  <td>
                    <div className="subject-badge">
                      <i className="fas fa-book me-2"></i>
                      {lesson.subject_name}
                    </div>
                  </td>
                  <td>
                    <span className="class-badge">
                      <i className="fas fa-users me-1"></i>
                      {lesson.class_group_name}
                    </span>
                  </td>
                  <td>
                    <span className="staff-badge">
                      <i className="fas fa-user-tie me-1"></i>
                      {lesson.staff_name}
                    </span>
                  </td>
                  <td>
                    <Button variant='link' className="table-action-btn edit-btn-table" size='sm' onClick={() => handleEdit(lesson)}>
                      <i className="fas fa-edit me-1"></i>
                      Edit
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7}>
                  <div className="empty-state">
                    <i className="fas fa-calendar-times fa-3x mb-3"></i>
                    <p>No time table entries found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        
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
      </div>
      <TimeTableEditModal schoolId={schoolId} lesson={lesson}
        branchId={branchId}
        isOpen={isTimeTableEditModalOpen}
        params={params}
        onRequestClose={() => setTimeTableEditModalOpen(false)}
        setTimeTableEditModalOpen={setTimeTableEditModalOpen} />
    </div>
  )
}

export default TimeTable
