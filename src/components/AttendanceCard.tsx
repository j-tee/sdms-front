import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState} from '../redux/store';
import { Col, Form, Row, Tab, Table, Tabs, Toast } from 'react-bootstrap';
import StaffDropDown from './StaffDropDown';
import LessonDropDown from './LessonDropDown';
import ClassGroupDropDown from './ClassGroupDropDown';
import { getLessons } from '../redux/slices/lessonSlice';
import { addAttendance, getAttendances, getAttendees } from '../redux/slices/attendanceSlice';
import { getClassGroups } from '../redux/slices/classGroupSlice';
import { getStaffs } from '../redux/slices/staffSlice';
import { Attendance, AttendanceViewModel } from '../models/attendance';
import { StudentRegViewModel } from '../models/student';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';

const AttendanceCard = (props: any) => {
  const { schoolId, branchId, index } = props;
  const { academic_term } = useSelector((state: RootState) => state.calendar)
  const { attendees, attendances } = useSelector((state: RootState) => state.attendance)
  const [onRoll, setOnRoll] = useState<Attendance[]>([])
  const dispatch = useDispatch<AppDispatch>()
  const {setShowToast} = useContext(ToastContext)
  const [show, setShow] = useState(false);
  const [key, setKey] = useState<string>('mark-attendance');
  const [formData, setFormData] = useState({
    student_id: '',
    lesson_id: '',
    status: '',
    attendance_date: '',
  });

  const [params, setParams] = useState({
    lesson_id: 0,
    program_id: 0,
    attendance_date: '',
    branch_id: branchId,
    school_id: schoolId,
    assessment_type_id: 0,
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
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    switch (field) {
      case 'staff_id':
        dispatch(getLessons({ ...params, staff_id: parseInt(value), academic_term_id: academic_term.id, branch_id: branchId, paginate: false }))
        break;
      case 'lesson_id':
        dispatch(getClassGroups({ ...params, lesson_id: parseInt(value), paginate: false }))
        break;
      case 'class_group_id':
        dispatch(getAttendees({ ...params, class_group_id: parseInt(value), paginate: true }))
       dispatch(getAttendances({ ...params, academic_term_id: academic_term.id, class_group_id: parseInt(value), paginate: true }))
        break;
      default:
        break;
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const student_attendance: any = {
      attendance:onRoll.map((student) => {
        return {
          student_id: student.student_id,
          lesson_id: params.lesson_id,
          status: student.status,
          branch_id:branchId,
          attendance_date: new Date(Date.now()).toISOString().split('T')[0],
        };
      }),
    }
    dispatch(addAttendance(student_attendance))
    .then((res: any) => {
      getAttendances({ ...params, attendance_date:new Date(Date.now()).toISOString(), paginate: true })  
      setShowToast(true)
      showToastify(res.payload.message, res.payload.status)
    })
  }

  useEffect(() => {
    setParams({
      ...params,
      branch_id: branchId,
    });
    if (index === 'attendance') {
      dispatch(getStaffs({ ...params, branch_id: branchId, paginate: false }))
    }
    if (attendees && attendees.length > 0) {
      const students: Attendance[] = attendees.map((attendee: any) => {
        return {
          student_id: attendee.student_id,
          lesson_id: params.lesson_id,
          status: attendances.find((attendance: AttendanceViewModel) => attendance.student_id === attendee.student_id)?.status || ''  ,
          attendance_date: new Date(Date.now()).toISOString().split('T')[0],
        };
      });
      setOnRoll(students);
    }
  }, [branchId, index, attendances, attendees, params.lesson_id])

  const handleCheckChange = (e: any) => {
    const {checked, value } = e.target;
    console.log('printing e ===>', value, checked)
  
    // Find the student in onRoll array based on the value (student_id)
    const updatedOnRoll = onRoll.map((student) => {
      if (student.student_id === parseInt(value)) {
        // Update the status based on the checkbox state
        return {
          ...student,
          status: checked ? 'present' : 'absent',
        };
      }
      return student;
    });
  
    // Update the state with the modified onRoll array
    setOnRoll(updatedOnRoll);
  };
  
  return (
    <>
    <Form onSubmit={handleSubmit}>
        <Row className='d-flex flex-column flex-lg-row'>
          <Col>
            <StaffDropDown schoolId={schoolId} branchId={branchId} onChange={handleInputChange} value={undefined} />
          </Col>
          <Col>
            <LessonDropDown schoolId={schoolId} branchId={branchId} onChange={handleInputChange} staffId={0} academicTermId={0} />
          </Col>
          <Col>
            <ClassGroupDropDown lesson={undefined} onChange={handleInputChange} programId={0} stageId={0} departmentId={0} />
          </Col>
        </Row>       
      </Form>
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => k && setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="mark-attendance" title="Mark Class Attendance">
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
              <tr key={student.student_id}>
                <td>{student.admission_id}</td>
                <td>{student.last_name} {student.first_name}</td>
                <td>
                  <Form.Check type='switch' 
                  checked={onRoll.find((roll) => roll.student_id === student.student_id)?.status === 'present' ? true : false}
                  label={
                    onRoll.find((roll) => roll.student_id === student.student_id)?.status === 'present'
                      ? 'Present'
                      : 'Absent'
                  }
                  onChange={(e) => handleCheckChange(e)} 
                  value={student.student_id} />
                </td>
              </tr>
            ))}
          </tbody>  
        </Table>
         <Row>
          <Col>
            <button className='btn btn-primary' onClick={handleSubmit}>Submit Attendance</button>
          </Col>
         </Row>
      </Tab>
      <Tab eventKey="student" title="View Class Attendance">
      <Table striped bordered hover size="sm">
          <thead>
            <tr>
            <th>Student ID</th>
              <th>Student Name</th>
              <th>Attendance</th>
            </tr>
          </thead>
          <tbody>
            {attendances && attendances.map((student: AttendanceViewModel) => (
              <tr key={student.student_id}>
                <td>{student.admission_id}</td>
                <td>{student.last_name} {student.first_name}</td>
                <td>
                {student.status === 'present' ? 'Present' : 'Absent'}
                </td>
              </tr>
            ))}
          </tbody>  
        </Table>
      </Tab>
    </Tabs>
    </>
  )
}

export default AttendanceCard
