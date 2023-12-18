import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Form, Row } from 'react-bootstrap'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getStaffs } from '../redux/slices/staffSlice';
import StaffDropDown from './StaffDropDown';
import { Lesson } from '../models/Lesson';
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

const TimeTable = (props: any) => {
  const { schoolId, branchId, tabKey } = props;
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
  const {lessons}=useSelector((state:RootState)=>state.lesson)

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
    console.log('tabKey', tabKey);
    if (tabKey === 'time-table') {
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
          console.log('res', res);
          setShowToast(true);
          showToastify(res.payload.message, res.payload.status);
        })
      dispatch(getPrograms({ school_id: schoolId, branch_id: branchId, pagination: { current_page: 1, per_page: 10000 }, paginate: false }))
      dispatch(getCourseOptions({ school_id: schoolId, branch_id: branchId, program_id: programId, stage_id: stageId, pagination: { current_page: 1, per_page: 10000 }, paginate: false }))
      dispatch(getStaffs({ school_id: schoolId, branch_id: branchId, pagination: { current_page: 1, per_page: 10000 }, paginate: false }))
    }
  }, [branchId, programId, dayOfWeek, stageId, classGroupId, programSubjectId, dispatch, schoolId, tabKey]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addLesson({ ...formData, start_time: startTime, end_time: endTime }))
      .then((res) => {
        console.log('res', res);
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
            console.log('res', res);
            setShowToast(true);
            showToastify(res.payload.message, res.payload.status);
          })
      }
      )
  }
  return (
    <div>
      <Card.Header>
        <span className="text-muted fs-4">Time Table</span>
      </Card.Header>
      <Form onSubmit={handleSubmit}>
        <Row className='d-flex flex-column flex-lg-row'>
          <Col>
            <StaffDropDown onChange={handleInputChange} />
          </Col>
          <Col>
            <ProgramDropDown onChange={handleInputChange} departmentId={undefined} branchId={0} />
          </Col>
          <Col>
            <StageDropDown onChange={handleInputChange} branchId={0} />
          </Col>
        </Row>
        <Row className='d-flex flex-column flex-lg-row'>
          <Col>
            <ClassGroupDropDown onChange={handleInputChange} programId={programId} stageId={stageId} departmentId={departmentId} />
          </Col>
          <Col>
            <ProgramSubjectDropDown onChange={handleInputChange} />
          </Col>
          <Col>
            <DayOfWeekDropDown onChange={handleInputChange} />
          </Col>
        </Row>
        <Row className='d-flex flex-column flex-lg-row justify-content-between mt-2'>
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
        </Row>
        <Row>
          <Col>
            <button type="submit" className="btn btn-primary mt-2">Save</button>
          </Col>
        </Row>
      </Form>
      <Row>
        <Col>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Day</th>
                <th scope="col">Start Time</th>
                <th scope="col">End Time</th>
                <th scope="col">Subject</th>
                <th scope="col">Class</th>
                <th scope="col">Staff</th>
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
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  )
}

export default TimeTable
