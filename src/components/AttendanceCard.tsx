import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Button, Col, Dropdown, DropdownButton, Form, Row, Tab, Table, Tabs } from 'react-bootstrap';
import StaffDropDown from './StaffDropDown';
import LessonDropDown from './LessonDropDown';
import { getLessons } from '../redux/slices/lessonSlice';
import { addAttendance, getAttendances, getAttendees } from '../redux/slices/attendanceSlice';
import { getStaffClassGroups } from '../redux/slices/classGroupSlice';
import PaginationComponent from './PaginationComponent';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import StaffClassGroupDropDown from './StaffClassGroupDropDown';
import { StudentRegViewModel } from '../models/student';
import { AttendanceViewModel } from '../models/attendance';
import { formatDate } from '../models/utilities';
import { parse } from 'path';

const AttendanceCard = (props: any) => {
  const { schoolId, branchId, index } = props;
  const { academic_term } = useSelector((state: RootState) => state.calendar);
  const { attendees, attendances, attendances_pagination, attendees_pagination } = useSelector((state: RootState) => state.attendance);

  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);

  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [key, setKey] = useState<string>('mark-attendance');
  const [onRoll, setOnRoll] = useState<{ student_id: number; status: string }[]>([]);

  const [attendeeParams, setAttendeeParams] = useState({
    staff_id: 0,
    lesson_id: 0,
    program_id: 0,
    attendance_date: '' as string,
    branch_id: branchId,
    school_id: schoolId,
    class_group_id: 0,
    paginate: true,
    pagination: {
      per_page: 10,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  });

  // const [attendanceParams, setAttendanceParams] = useState({
  //   staff_id: 0,
  //   lesson_id: 0,
  //   program_id: 0,
  //   attendance_date: '',
  //   branch_id: branchId,
  //   school_id: schoolId,
  //   class_group_id: 0,
  //   paginate: true,
  //   pagination: {
  //     per_page: 1000,
  //     current_page: 1,
  //     total_items: 0,
  //     total_pages: 0
  //   }
  // });

  type AnyType = {
    [key: string]: string;
  };

  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    if (field === 'attendance_date') {
      setAttendanceDate(value as string);
    }

    setAttendeeParams((prev) => ({ ...prev, [field]: value }));
    // setAttendanceParams((prev) => ({ ...prev, [field]: value }));

    switch (field) {
      case 'attendance_date':
        dispatch(getAttendees({ ...attendeeParams, attendance_date: value as string }));
        dispatch(getAttendances({ ...attendeeParams, attendance_date: value as string }));
        break;
      case 'staff_id':
        dispatch(getLessons({ ...attendeeParams, staff_id: parseInt(value.toString()) }));
        break;
      case 'lesson_id':
        dispatch(getStaffClassGroups({ ...attendeeParams, lesson_id: parseInt(value.toString()) }));
        break;
      case 'class_group_id':
        dispatch(getAttendees({ ...attendeeParams, class_group_id: parseInt(value.toString()) }));
        dispatch(getAttendances({ ...attendeeParams, class_group_id: parseInt(value.toString()) }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      student_attendance: {
        attendance: onRoll.map((student) => {
          return {
            student_id: student.student_id,
            lesson_id: attendeeParams.lesson_id,
            status: student.status,
            academic_term_id: academic_term.id,
            attendance_date: attendanceDate,
          };
        })
      },
    };
    dispatch(addAttendance(payload)).then((res: any) => {
      dispatch(getAttendances(attendeeParams));
      setShowToast(true);
      showToastify(res.payload.message, res.payload.status);
    });
  };
  useEffect(() => {
    if (key === 'mark-attendance') {
      dispatch(getAttendances(attendeeParams));
      dispatch(getAttendees(attendeeParams));
    }
    if (key === 'student') {
      dispatch(getAttendances(attendeeParams));
    }
  }, [key, attendeeParams, dispatch]);

  useEffect(() => {
    if (attendees && attendees.length > 0) {
      const updatedOnRoll = attendees.map((attendee: any) => ({
        student_id: attendee.student_id,
        lesson_id: attendeeParams.lesson_id,
        academic_term_id: academic_term.id,
        status: attendances.find((attendance: AttendanceViewModel) => attendance.student_id === attendee.student_id)?.status || 'absent',
        attendance_date: attendanceDate,
      }));
      setOnRoll(updatedOnRoll); // Update `onRoll` immediately
    }
  }, [attendees, attendances, attendeeParams.lesson_id, academic_term.id, attendanceDate]);
  // useEffect(() => {
  //   if (key === 'mark-attendance') {
  //     dispatch(getAttendances({...attendeeParams}));
  //     dispatch(getAttendees({...attendeeParams}))
  //     .then((res: any) => {
  //       if (attendees && attendees.length > 0) {
  //         const students = attendees.map((attendee: any) => ({
  //           student_id: attendee.student_id,
  //           lesson_id: attendeeParams.lesson_id,
  //           academic_term_id: academic_term.id,
  //           status: attendances.find((attendance: AttendanceViewModel) => attendance.student_id === attendee.student_id)?.status || 'absent',
  //           attendance_date: attendanceDate,
  //         }));
  //         setOnRoll((prevStudents) => [...students]);
  //       }
  //       // if (res.payload.data) {
  //       //   const students = res.payload.data.map((student: any) => ({
  //       //     student_id: student.student_id,
  //       //     lesson_id: attendeeParams.lesson_id,
  //       //     academic_term_id: academic_term.id,
  //       //     status: 'absent',
  //       //     attendance_date: attendanceDate,
  //       //   }));
  //       //   setOnRoll((prevStudents) => [...students]);
  //       // }
  //     });
  //   }
  //   if (key === 'student') {
  //     dispatch(getAttendances(attendeeParams));
  //   }
  // }, [key, attendeeParams, attendanceDate, academic_term.id, dispatch]);

  const handleAttendeePageChange = (page: number) => {
    // setAttendanceParams((prevParams) => ({
    //   ...prevParams,
    //   pagination: {
    //     ...prevParams.pagination,
    //     current_page: page,
    // }}));
    setAttendeeParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        current_page: page,
      },
    }));
  };

  const handleAttendeesItemsPerPageChange = (perPage: number) => {
    // setAttendanceParams((prevParams) => ({
    //   ...prevParams,
    //   pagination: {
    //     ...prevParams.pagination,
    //     per_page: perPage,
    //     current_page: 1,
    //   },
    // }))
    setAttendeeParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        per_page: perPage,
        current_page: 1,
      },
    }));
  };

  const handleCheckChange = (e: any) => {
    const { checked, value } = e.target;
    console.log('onRoll=====>', onRoll);
    setOnRoll((prevOnRoll) => {
      return prevOnRoll.map((student) => {
        if (student.student_id === parseInt(value)) {
          console.log('student.student_id=====>', student.student_id, parseInt(value));
          return {
            ...student,
            status: checked ? 'present' : 'absent', // Update the status correctly
          };
        }
        return student;
      });
    });
  };

  // const handleAttendancesPageChange = (page: number) => {
  //   setAttendanceParams((prevParams) => ({
  //     ...prevParams,
  //     paginate: true,
  //     pagination: {
  //       ...prevParams.pagination,
  //       current_page: page,
  //     },
  //   }));
  // };

  // const handleAttendanceItemsPerPageChange = (perPage: number) => {
  //   setAttendanceParams((prevParams) => ({
  //     ...prevParams,
  //     paginate: true,
  //     pagination: {
  //       ...prevParams.pagination,
  //       per_page: perPage,
  //       current_page: 1,
  //     },
  //   }));
  // };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row className="d-flex flex-column flex-lg-row">
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
            <Form.Group controlId="startDate">
              <Form.Label>Attendance Date</Form.Label>
              <Form.Control
                type="date"
                value={attendanceDate}
                onChange={(e) => handleInputChange('attendance_date', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" className="mt-3">
          Save Attendance
        </Button>
      </Form>

      <Tabs id="attendance-tabs" activeKey={key} onSelect={(k) => setKey(k || 'mark-attendance')} className="mt-4">
        <Tab eventKey="mark-attendance" title="Mark Attendance">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Student Name</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {attendees && attendees.map((student: StudentRegViewModel) => (
                <tr key={`attendee-${student.student_id}`}>
                  <td>{student.admission_id}</td>
                  <td>{student.last_name} {student.first_name}</td>
                  <td>
                    <Form.Check
                      type="switch"
                      checked={onRoll.find((roll) => roll.student_id === student.student_id)?.status === 'present'}
                      label={onRoll.find((roll) => roll.student_id === student.student_id)?.status === 'present' ? 'Present' : 'Absent'}
                      onChange={(e) => handleCheckChange(e)}
                      value={student.student_id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Row>
            <Col>
              <Button variant='outline-info' className='mb-4' onClick={handleSubmit}>Submit Attendance</Button>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="student" title="View Class Attendance">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Day of Week</th>
                <th>Lesson</th>
                <th>Attendance Date</th>
                <th>Student Name</th>
                <th>Attendance</th>
              </tr>
            </thead>
            <tbody>
              {attendances && attendances.map((student: AttendanceViewModel) => (
                <tr key={`attendance-${student.student_id}-${student.attendance_date}`}>
                  <td>{student.day_of_week}</td>
                  <td>{student.lesson_name}</td>
                  <td>{formatDate(student.attendance_date)}</td>
                  <td>{student.last_name} {student.first_name}</td>
                  <td>{student.status === 'present' ? 'Present' : 'Absent'}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* <div className="d-flex flex-column flex-md-row px-2 justify-content-between align-items-center">
            <PaginationComponent
              params={attendeeParams}
              activePage={attendances_pagination?.current_page}
              itemsCountPerPage={attendances_pagination?.per_page}
              totalItemsCount={attendances_pagination?.total_items || 0}
              pageRangeDisplayed={5}
              totalPages={attendances_pagination?.total_pages}
              hideDisabled={attendances_pagination?.total_pages === 0}
              hideNavigation={attendances_pagination?.total_pages === 1}
              onChange={handleAttendancesPageChange}
            />
            <DropdownButton
              className="mt-2 mt-md-0 mb-2"
              id="dropdown-items-per-page"
              title={`Items per page: ${attendances_pagination?.per_page}`}
            >
              <Dropdown.Item onClick={() => handleAttendanceItemsPerPageChange(5)}>5</Dropdown.Item>
              <Dropdown.Item onClick={() => handleAttendanceItemsPerPageChange(10)}>10</Dropdown.Item>
              <Dropdown.Item onClick={() => handleAttendanceItemsPerPageChange(20)}>20</Dropdown.Item>
              <Dropdown.Item onClick={() => handleAttendanceItemsPerPageChange(50)}>50</Dropdown.Item>
            </DropdownButton>
          </div> */}
        </Tab>
      </Tabs>
      <div className="d-flex flex-column flex-md-row px-2 justify-content-between align-items-center">
            <PaginationComponent
              params={attendeeParams}
              activePage={attendees_pagination?.current_page}
              itemsCountPerPage={attendees_pagination?.per_page}
              totalItemsCount={attendees_pagination?.total_items || 0}
              pageRangeDisplayed={5}
              totalPages={attendees_pagination?.total_pages}
              hideDisabled={attendees_pagination?.total_pages === 0}
              hideNavigation={attendees_pagination?.total_pages === 1}
              onChange={handleAttendeePageChange}
            />
            <DropdownButton
              className="mt-2 mt-md-0 mb-2"
              id="dropdown-items-per-page"
              title={`Items per page: ${attendees_pagination?.per_page}`}
            >
              <Dropdown.Item onClick={() => handleAttendeesItemsPerPageChange(5)}>5</Dropdown.Item>
              <Dropdown.Item onClick={() => handleAttendeesItemsPerPageChange(10)}>10</Dropdown.Item>
              <Dropdown.Item onClick={() => handleAttendeesItemsPerPageChange(20)}>20</Dropdown.Item>
              <Dropdown.Item onClick={() => handleAttendeesItemsPerPageChange(50)}>50</Dropdown.Item>
            </DropdownButton>
          </div>
    </>
  );
};

export default AttendanceCard;