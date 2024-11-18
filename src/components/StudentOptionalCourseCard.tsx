import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import DepartmentDropDown from './DepartmentDropDown'
import ProgramDropDown from './ProgramDropDown';
import StageDropDown from './StageDropDown';
import SubjectDropDown from './SubjectDropDown';
import ClassGroupDropDown from './ClassGroupDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { StudentOptionalCourse } from '../models/optionalCourseRegistration';
import { getStages } from '../redux/slices/stageSlice';
import { getDepartments } from '../redux/slices/departmentSlice';
import { getPrograms } from '../redux/slices/programSlice';
import { getSubjectList } from '../redux/slices/subjectSlice';
import { getCurrentAcademicYear, getCurrentTerm } from '../redux/slices/calendarSlice';
import { getClassGroupList } from '../redux/slices/classGroupSlice';
import { getRegisteredStudents } from '../redux/slices/studentRegSlice';
import { getCourseOption } from '../redux/slices/programSubjectSlice';
import { registerOptionalCourses } from '../redux/slices/studentCourseRegSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import UserSession from '../utility/userSession';
const StudentOptionalCourseCard = (props: any) => {
  const { schoolId, branchId, tabKey } = props;
  const { course_option } = useSelector((state: RootState) => state.programSubject)
  const { academic_term, academic_year } = useSelector((state: RootState) => state.calendar);
  const dispatch = useDispatch<AppDispatch>();
  const [optinalCourses, setOptionalCourses] = useState<StudentOptionalCourse[]>([])
  const { setShowToast } = useContext(ToastContext)
  const privileged_school_roles = ['owner', 'admin', 'secretary', 'principal', 'vice_principal']
  const [roles, setRoles] = useState<string[]>([]);
  const { registrations } = useSelector((state: RootState) => state.studentReg)
  const [params, setParams] = useState({
    academic_year_id: academic_year.id,
    program_id: 0,
    branch_id: branchId,
    school_id: schoolId,
    subject_id: 0,
    class_group_id: 0,
    department_id: 0,
    stage_id: 0,
    paginate: false,
    pagination: {
      per_page: 10000,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })
  const [formData, setFormData] = useState<StudentOptionalCourse>({
    student_id: 0,
    program_subject_id: 0,
    reg_date: ''
  });
  type AnyType = {
    [key: string]: string;
  };
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    switch (field) {
      case 'department_id':
        dispatch(getPrograms({ ...params, school_id: schoolId, branch_id: branchId, department_id: parseInt(value), paginate: false }))
        break;
      case 'stage_id':
        dispatch(getSubjectList({
          ...params,
          school_id: schoolId, branch_id: branchId,
          academic_year_id: academic_year.id,
          department_id: params.department_id,
          stage_id: params.stage_id,
          program_id: params.program_id, paginate: false,
          pagination: {}, optional: true
        }))
        break;
      case 'program_id':
        dispatch(getSubjectList({
          ...params,
          school_id: schoolId,
          branch_id: branchId,
          academic_year_id: academic_year.id,
          department_id: params.department_id,
          stage_id: params.stage_id, program_id: parseInt(value), paginate: false,
          pagination: {}, optional: true
        }))
        break;
      // case 'subject_id':
        // dispatch(getCourseOption({
        //   ...params,
        //   academic_term_id: academic_term.id,
        //   stage_id: params.stage_id,
        //   program_id: params.program_id,
        //   subject_id: parseInt(value),
        //   paginate: false,
        //   pagination: {}, optional: true
        // })).then((resp: any) => {
        //   setFormData({ ...formData, program_subject_id: resp.payload?.course_option?.id })
        // })
        // dispatch(getClassGroupList({
        //   ...params,
        //   school_id: schoolId,
        //   branch_id: branchId,
        //   academic_term_id: academic_term.id,
        //   department_id: params.department_id,
        //   stage_id: params.stage_id, program_id: params.program_id, paginate: false,
        //   pagination: {}, optional: true
        // }))
        // break;
      // case 'class_group_id':
      //   dispatch(getRegisteredStudents({
      //     ...params,
      //     school_id: schoolId,
      //     branch_id: branchId,
      //     academic_term_id: academic_term.id,
      //     department_id: params.department_id,
      //     stage_id: params.stage_id,
      //     program_id: params.program_id,
      //     class_group_id: parseInt(value),
      //   }))
      //   break
      default:
        break;
    }
  };
  const handleCheckboxChange = (studentId: number, isChecked: boolean) => {
    if (isChecked) {
      // Create a new formData object with the selected registration ID
      const course_registration: StudentOptionalCourse = {
        student_id: studentId,
        program_subject_id: course_option.id,
        reg_date: new Date().toISOString().split('T')[0]
      };

      // Update optionalCourses array by appending the newFormData object
      setOptionalCourses(prevCourses => [...prevCourses, course_registration]);
    } else {
      // If the checkbox is unchecked, remove the corresponding formData from optionalCourses
      setOptionalCourses(prevCourses =>
        prevCourses.filter(course => course.student_id !== studentId)
      );
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Dispatch an action to register the student for the optional courses
    dispatch(registerOptionalCourses(optinalCourses))
      .then((resp: any) => {
        setShowToast(true)
        showToastify(resp.payload.message, resp.payload.status);
      })
  }

  useEffect(() => {
    if (tabKey === 'registration') {
      const user_roles = UserSession.getroles()
      setRoles(user_roles)
      dispatch(getCurrentTerm(branchId))
      dispatch(getCurrentAcademicYear(branchId))
      if (branchId) {
        dispatch(getSubjectList({ ...params, academic_year_id:academic_year.id, paginate:false, school_id: schoolId, branch_id: branchId }))
        dispatch(getDepartments({ school_id: schoolId, branch_id: branchId, paginate: false }))
        dispatch(getStages({ school_id: schoolId, branch_id: branchId, paginate: false }))
      }
    }
    // dispatch(getDepartments({ school_id: schoolId, branch_id: branchId, paginate: false }))
    // dispatch(getStages({ school_id: schoolId, branch_id: branchId, paginate: false }))
  }, [dispatch, schoolId, branchId, tabKey, params])
  return (
    <div>
      <Card.Header>
        <span className="text-muted fs-3">Optional Courses Registrations</span>
      </Card.Header>
      <Card.Body>
        <Card.Text>
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
          <Row className='d-flex flex-column flex-lg-row'>
            <Col>
              <SubjectDropDown params={params} branchId={branchId} onChange={handleInputChange} schoolId={0} />
            </Col>
            <Col>
              <ClassGroupDropDown lesson={undefined} onChange={handleInputChange} programId={0} stageId={0} departmentId={0} />
            </Col>
          </Row>
          <Card className='my-3'>
            <Card.Header>
              <span className='text-muted'>List of students</span>
            </Card.Header>
            <Form>
              <Card.Body>
                {registrations.map((reg) => (
                  <Form.Check type='checkbox'
                    key={reg.student_id}
                    label={reg.full_name}
                    onChange={(e) => handleCheckboxChange(reg.student_id, e.target.checked)} />
                ))}
              </Card.Body>
              <Card.Footer>
                {roles && privileged_school_roles.some(role=>roles.includes(role)) && <Button onClick={handleSubmit}>Submit</Button>}
              </Card.Footer>
            </Form>
          </Card>
        </Card.Text>
      </Card.Body>
    </div>
  )
}

export default StudentOptionalCourseCard
