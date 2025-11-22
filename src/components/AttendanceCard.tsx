import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Button, Col, Dropdown, DropdownButton, Form, Row, Tab, Table, Tabs, Toast } from 'react-bootstrap';
import StaffDropDown from './StaffDropDown';
import LessonDropDown from './LessonDropDown';
import { getLessons } from '../redux/slices/lessonSlice';
import { addAttendance, getAttendances, getAttendees } from '../redux/slices/attendanceSlice';
import { getStaffClassGroups } from '../redux/slices/classGroupSlice';
import { getStaffs } from '../redux/slices/staffSlice';
import { Attendance, AttendanceViewModel } from '../models/attendance';
import { StudentRegViewModel } from '../models/student';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { formatDate } from '../models/utilities';
import { getCurrentTerm } from '../redux/slices/calendarSlice';
import StaffClassGroupDropDown from './StaffClassGroupDropDown';
import PaginationComponent from './PaginationComponent';
import CustomDatePicker from './CustomDatePicker';

const AttendanceCard = (props: any) => {
  const { schoolId, branchId, index } = props;
  const { academic_term } = useSelector((state: RootState) => state.calendar)
  const { attendees, attendances, attendances_pagination } = useSelector((state: RootState) => state.attendance)
  const [onRoll, setOnRoll] = useState<Attendance[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const { setShowToast } = useContext(ToastContext)
  const [key, setKey] = useState<string>('mark-attendance');
  const [field, setField] = useState<any>('');
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
 
  const [params, setParams] = useState({
    staff_id: 0,
    lesson_id: 0,
    program_id: 0,
    attendance_date: '',
    branch_id: branchId,
    school_id: schoolId,
    assessment_type_id: 0,
    academic_term_id: 0,
    subject_id: 0,
    class_group_id: 0,
    department_id: 0,
    stage_id: 0,
    paginate: false,
    pagination: {
      per_page: 10,
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
    setField(field)
    switch (field) {
      case 'attendane_date':
        setAttendanceDate(value)
        dispatch(getAttendances({ ...params, attendance_date: value, paginate: true }))
        break;
      case 'staff_id':
        dispatch(getLessons({ ...params, staff_id: params.staff_id, branch_id: branchId, paginate: false }))
        break;
      case 'lesson_id':
        dispatch(getStaffClassGroups({ ...params, lesson_id: params.lesson_id, paginate: false }))
        dispatch(getAttendances({ ...params, attendance_date:attendanceDate, class_group_id: params.class_group_id, paginate: false }))
        break;
      case 'class_group_id':
        dispatch(getAttendees({ ...params, attendance_date:attendanceDate, class_group_id: params.class_group_id, paginate: true }))
        dispatch(getAttendances({ ...params, class_group_id: params.class_group_id, paginate: false }))
        break;
      default:
        break;
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload: any = { student_attendance: {
      attendance: onRoll.map((student) => {
        return {
          student_id: student.student_id,
          lesson_id: params.lesson_id,
          status: student.status,
          academic_term_id: academic_term.id,
          attendance_date: attendanceDate,
        };
      })},
    }
    dispatch(addAttendance(payload))
      .then((res: any) => {
        getAttendances({ ...params, attendance_date: attendanceDate, paginate: true })
        setShowToast(true)
        showToastify(res.payload.message, res.payload.status)
      })
  }

  useEffect(() => {
  
  }, [branchId, index, field, params.lesson_id,params, params.class_group_id])

// let updatedOnRoll: React.SetStateAction<Attendance[]> = []


const handleCheckChange = (e: any) => {
  const { checked, value } = e.target;
  setOnRoll((prevOnRoll) => {
    const updatedOnRoll = prevOnRoll.map((student) => {
      if (student.student_id === parseInt(value)) {
        return {
          ...student,
          status: checked ? 'present' : 'absent',
        };
      }
      return student;
    });
    return updatedOnRoll;
  });
};
useEffect(() => {
  if (index === 'attendance') {
    dispatch(getCurrentTerm(branchId))
    setParams({
      ...params,
      branch_id: branchId,
      academic_term_id: academic_term.id ? academic_term.id : 0
    });
    dispatch(getStaffs({ ...params, paginate: false }))
    dispatch(getAttendees({ ...params, attendance_date:attendanceDate, class_group_id: params.class_group_id, paginate: true }))
    if (attendees && attendees.length > 0) {
      const students = attendees.map((attendee: any) => ({
        student_id: attendee.student_id,
        lesson_id: params.lesson_id,
        academic_term_id:academic_term.id,
        status: attendances.find((attendance: AttendanceViewModel) => attendance.student_id === attendee.student_id)?.status || 'absent',
        attendance_date: attendanceDate,
      }));
      setOnRoll(students);
    }
  }
}, [attendees, attendances,params, params.lesson_id]);

const handleItemsPerPageChange = (perPage: number) => {
  setParams((prevParams) => ({
    ...prevParams,
    pagination: {
      ...prevParams.pagination,
      per_page: perPage,
      current_page: 1,
    },
  }));
  dispatch(getAttendees({ ...params, attendance_date:attendanceDate, class_group_id: params.class_group_id, paginate: true }))
};
const handlePageChange = (page: number) => {
  setParams((prevParams) => ({
    ...prevParams,
    pagination: {
      ...prevParams.pagination,
      current_page: page,
    },
  }));
  dispatch(getAttendees({ ...params, attendance_date:attendanceDate, class_group_id: params.class_group_id, paginate: true }))
}
  return (
    <div className="academic-section-content">
      {/* Filter Section */}
      <div className="filter-card-modern mb-4">
        <div className="filter-header">
          <div className="filter-icon-wrapper">
            <i className="fas fa-filter"></i>
          </div>
          <h5>Filter Attendance</h5>
        </div>
        <div className="card-body">
        <Form onSubmit={handleSubmit}>
          <Row className='d-flex flex-column flex-lg-row'>
            <Col>
              <StaffDropDown schoolId={schoolId} branchId={branchId} onChange={handleInputChange} value={undefined} />
            </Col>
            <Col>
              <LessonDropDown schoolId={schoolId} branchId={branchId} onChange={handleInputChange} staffId={0} academicTermId={0} />
            </Col>
            <Col>
              <StaffClassGroupDropDown onChange={handleInputChange} schoolId={schoolId} branchId={branchId} />
            </Col>
            <Col>
              <Form.Group controlId='startDate' className='academic-form-group'>
                <Form.Label className="academic-form-label">
                  <i className="fas fa-calendar me-2"></i>
                  Attendance Date
                </Form.Label>
                <CustomDatePicker className="academic-form-control" value={attendanceDate}
                  onChange={(date) => handleInputChange('attendane_date',date)} />
              </Form.Group>
            </Col>
          </Row>
        </Form>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => k && setKey(k)}
        className="modern-tabs-horizontal mb-4"
      >
        <Tab 
          eventKey="mark-attendance" 
          title={
            <span>
              <i className="fas fa-user-check me-2"></i>
              Mark Class Attendance
            </span>
          }
        >
          <div className="academic-table-wrapper">
            <div className="academic-section-header mb-3">
              <div className="academic-section-icon">
                <i className="fas fa-clipboard-check"></i>
              </div>
              <h5>Student Attendance Register</h5>
            </div>
            <Table className="academic-table-modern" size="sm">
              <thead>
                <tr>
                  <th><i className="fas fa-id-badge me-2"></i>Student ID</th>
                  <th><i className="fas fa-user me-2"></i>Student Name</th>
                  <th><i className="fas fa-check-circle me-2"></i>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {attendees && attendees.length > 0 ? (
                  attendees.map((student: StudentRegViewModel) => (
                    <tr key={student.student_id}>
                      <td>
                        <span className="student-id-badge">
                          <i className="fas fa-hashtag me-1"></i>
                          {student.admission_id}
                        </span>
                      </td>
                      <td>
                        <span className="student-name-label">
                          <i className="fas fa-user-graduate me-2"></i>
                          {student.last_name} {student.first_name}
                        </span>
                      </td>
                      <td>
                        <div className="attendance-switch-wrapper">
                          <Form.Check 
                            type='switch'
                            id={`attendance-${student.student_id}`}
                            checked={onRoll.find((roll) => roll.student_id === student.student_id)?.status === 'present' ? true : false}
                            label={
                              <span className={`attendance-status-label ${onRoll.find((roll) => roll.student_id === student.student_id)?.status === 'present' ? 'present' : 'absent'}`}>
                                <i className={`fas ${onRoll.find((roll) => roll.student_id === student.student_id)?.status === 'present' ? 'fa-check-circle' : 'fa-times-circle'} me-2`}></i>
                                {onRoll.find((roll) => roll.student_id === student.student_id)?.status === 'present' ? 'Present' : 'Absent'}
                              </span>
                            }
                            onChange={(e) => handleCheckChange(e)}
                            value={student.student_id} 
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>
                      <div className="empty-state">
                        <i className="fas fa-user-times fa-3x mb-3"></i>
                        <p>No students found for this class</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
            
            {attendees && attendees.length > 0 && (
              <Row>
                <Col>
                  <Button className='btn-add-academic-item mb-4' onClick={handleSubmit}>
                    <i className="fas fa-check-double me-2"></i>
                    Submit Attendance
                  </Button>
                </Col>
              </Row>
            )}
          <div className="d-flex flex-column flex-md-row px-2 justify-content-between align-items-center">
            <PaginationComponent
              params={params}
              activePage={attendances_pagination?.current_page}
              itemsCountPerPage={attendances_pagination?.per_page}
              totalItemsCount={attendances_pagination?.total_items || 0}
              pageRangeDisplayed={5}
              totalPages={attendances_pagination?.total_pages}
              hideDisabled={attendances_pagination?.total_pages === 0}
              hideNavigation={attendances_pagination?.total_pages === 1}
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
        </Tab>

        <Tab 
          eventKey="student" 
          title={
            <span>
              <i className="fas fa-list-alt me-2"></i>
              View Class Attendance
            </span>
          }
        >
          <div className="academic-table-wrapper">
            <div className="academic-section-header mb-3">
              <div className="academic-section-icon">
                <i className="fas fa-clipboard-list"></i>
              </div>
              <h5>Attendance Records</h5>
            </div>
            <Table className="academic-table-modern" size="sm">
              <thead>
                <tr>
                  <th><i className="fas fa-calendar-day me-2"></i>Day of Week</th>
                  <th><i className="fas fa-book me-2"></i>Lesson</th>
                  <th><i className="fas fa-calendar me-2"></i>Attendance Date</th>
                  <th><i className="fas fa-user me-2"></i>Student Name</th>
                  <th><i className="fas fa-check-circle me-2"></i>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {attendances && attendances.length > 0 ? (
                  attendances.map((student: AttendanceViewModel) => (
                    <tr key={student.student_id}>
                      <td>
                        <span className="day-badge">
                          <i className="fas fa-calendar-day me-2"></i>
                          {student.day_of_week}
                        </span>
                      </td>
                      <td>
                        <div className="subject-badge">
                          <i className="fas fa-book me-2"></i>
                          {student.lesson_name}
                        </div>
                      </td>
                      <td>
                        <span className="date-badge">
                          <i className="fas fa-calendar-alt me-1"></i>
                          {formatDate(student.attendance_date)}
                        </span>
                      </td>
                      <td>
                        <span className="student-name-label">
                          <i className="fas fa-user-graduate me-2"></i>
                          {student.last_name} {student.first_name}
                        </span>
                      </td>
                      <td>
                        {student.status === 'present' ? (
                          <span className="badge bg-success">
                            <i className="fas fa-check me-1"></i>
                            Present
                          </span>
                        ) : (
                          <span className="badge bg-danger">
                            <i className="fas fa-times me-1"></i>
                            Absent
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>
                      <div className="empty-state">
                        <i className="fas fa-clipboard fa-3x mb-3"></i>
                        <p>No attendance records found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Tab>
      </Tabs>
    </div>
  )
}

export default AttendanceCard
