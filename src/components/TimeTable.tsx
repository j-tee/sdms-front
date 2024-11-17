import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Form, Row, Table } from 'react-bootstrap'
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
import { getClassGroups } from '../redux/slices/classGroupSlice';
import { ClassGroupParams } from '../models/classGroup';
import TimePicker from 'react-time-picker';
import { addLesson, getLessons } from '../redux/slices/lessonSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import TimeTableEditModal from './TimeTableEditModal';
import { QueryParams } from '../models/queryParams';
import UserSession from '../utility/userSession';

const TimeTable = (props: any) => {
  const { schoolId, branchId, tabKey,lessonTabIndex } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [programId, setProgramId] = useState<number>(0);
  const [stageId, setStageId] = useState<number>(0);
  const [departmentId, setDepartmentId] = useState<number>(0);
  const [classGroupId, setClassGroupId] = useState<number>(0);
  const [staffId, setStaffId] = useState<number>(0);
  const [programSubjectId, setProgramSubjectId] = useState<number>(0);
  const [dayOfWeek, setDayOfWeek] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('7:45');
  const [endTime, setEndTime] = useState<string>('9:15');
  const { setShowToast } = useContext(ToastContext);
  const [isTimeTableEditModalOpen,setTimeTableEditModalOpen] = useState(false);
  const [params, setParams] = useState<QueryParams>({ })
  const privileged_school_roles = ['owner', 'admin', 'secretary', 'principal', 'vice_principal']
  const [roles, setRoles] = useState<string[]>([]);
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
  const { lessons } = useSelector((state: RootState) => state.lesson)

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
    // Update the formData state with the new value
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    switch (field) {
      case 'stage_id':
        setStageId(parseInt(value));
        dispatch(getClassGroups({ school_id: schoolId, branch_id: branchId, program_id: programId, stage_id: parseInt(value), department_id: departmentId, pagination: { current_page: 1, per_page: 10000 }, paginate: false } as ClassGroupParams))
        break;
      case 'day_of_week':
        setDayOfWeek(value);
        break;
      case 'program_id':
        setProgramId(parseInt(value));
        if (branchId)
          dispatch(getStages({ school_id: schoolId, branch_id: branchId, program_id: parseInt(value), pagination: { current_page: 1, per_page: 10000 }, paginate: false }))
        break;
      case 'staff_id':
        setStaffId(parseInt(value));
        break;
      case 'program_subject_id':
        setProgramSubjectId(parseInt(value));
        break;
      case 'class_group_id':
        setClassGroupId(parseInt(value));
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    
    if (tabKey === 'time-table') {
      const user_roles = UserSession.getroles()
      setRoles(user_roles)
      setParams({ school_id: schoolId, branch_id: branchId, program_id: programId, stage_id: stageId, department_id: departmentId, class_group_id: classGroupId, staff_id: staffId, program_subject_id: programSubjectId, day_of_week: dayOfWeek, pagination: { current_page: 1, per_page: 10 }, paginate: true })
      if(lessonTabIndex === 'second'){
        dispatch(getLessons({
          school_id: schoolId,
          branch_id: branchId,
          program_id: programId,
          stage_id: stageId,
          department_id: departmentId,
          class_group_id: classGroupId,
          staff_id: staffId,
          program_subject_id: programSubjectId,
          day_of_week: dayOfWeek,
          pagination: { ...params.pagination}, paginate: true
        }))
          .then((res) => {
            setShowToast(true);
            showToastify(res.payload.message, res.payload.status);
          })
      }
      
      dispatch(getPrograms({ school_id: schoolId, branch_id: branchId, pagination: { current_page: 1, per_page: 10000 }, paginate: false }))
      dispatch(getCourseOptions({ school_id: schoolId, branch_id: branchId, program_id: programId, stage_id: stageId, pagination: { current_page: 1, per_page: 10000 }, paginate: false }))
      dispatch(getStaffs({ school_id: schoolId, branch_id: branchId, pagination: { current_page: 1, per_page: 10000 }, paginate: false }))
    }
  }, [branchId, programId,lessonTabIndex, dayOfWeek, stageId, classGroupId, programSubjectId, dispatch, schoolId, tabKey]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addLesson({ ...formData, start_time: startTime, end_time: endTime }))
      .then((res) => {
        setShowToast(true);
        showToastify(res.payload.message, res.payload.status);
        dispatch(getLessons({
          school_id: schoolId,
          branch_id: branchId,
          program_id: programId,
          stage_id: stageId,
          department_id: departmentId,
          class_group_id: classGroupId,
          staff_id: staffId,
          program_subject_id: programSubjectId,
          day_of_week: dayOfWeek,
          pagination: { current_page: 1, per_page: 10 }, paginate: true
        }))
          .then((res) => {
            setShowToast(true);
            showToastify(res.payload.message, res.payload.status);
          })
      }
      )
  }
  const handleEdit = (lesson:any) => {
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
  return (
    <div>
      <Card.Header>
        <span className="text-muted fs-4"></span>
      </Card.Header>
      <Form onSubmit={handleSubmit}>
        <Row className='d-flex flex-column flex-lg-row'>
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
        <Row className='d-flex flex-column flex-lg-row'>
          <Col>
            <ClassGroupDropDown lesson={undefined} onChange={handleInputChange} programId={programId} stageId={stageId} departmentId={departmentId} />
          </Col>
          <Col>
            <ProgramSubjectDropDown onChange={handleInputChange} lesson={undefined} />
          </Col>
          <Col>
            <DayOfWeekDropDown onChange={handleInputChange} lesson={undefined} />
          </Col>
        </Row>
        {roles && privileged_school_roles.some(role=>roles.includes(role)) && <Row className='d-flex flex-column flex-lg-row justify-content-between mt-2'>
          <Col md={4} className='d-flex flex-row gap-5'>
            <span className='pt-2'>Start Time</span>
            <span> <TimePicker
              onChange={(e) => setStartTime(e as string)}
              value={startTime}
            /></span>
          </Col>
          <Col md={4} className='d-flex flex-row gap-5'>
            &nbsp;
          </Col>
          <Col md={4} className='d-flex flex-row gap-5'>
            <span className='pt-2'>End Time</span>
            <span><TimePicker
              onChange={(e) => setEndTime(e as string)}
              value={endTime}
            /></span>
          </Col>
        </Row>}
       {roles && privileged_school_roles.some(role=>roles.includes(role)) && <Row>
          <Col>
            <button type="submit" className="btn btn-primary mt-2">Save</button>
          </Col>
        </Row>}
      </Form>
      <Row>
        <Col>
          <Table striped hover responsive bordered size='sm'>
            <thead>
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Start Time</th>
                <th scope="col">End Time</th>
                <th scope="col">Subject</th>
                <th scope="col">Class</th>
                <th scope="col">Staff</th>
                <th scope='col'>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson, index) => (
                <tr key={index}>
                  <td>{lesson.day_of_week}</td>
                  <td>{new Date(lesson.start_time).toLocaleTimeString()}</td>
                  <td>{new Date(lesson.end_time).toLocaleTimeString()}</td>
                  <td>{lesson.subject_name}</td>
                  <td>{lesson.class_group_name}</td>
                  <td>{lesson.staff_name}</td>
                  <td>
                    <span>
                      <Card.Link fw-light onClick={() => handleEdit(lesson)}><em>Edit</em></Card.Link>
                      {/* <Card.Link link-info text-decoration-underline onClick={handleDelete}><em>Delete</em></Card.Link>
                      <Card.Link link-info text-decoration-underline onClick={handleDetails}><em>Details</em></Card.Link> */}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
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
