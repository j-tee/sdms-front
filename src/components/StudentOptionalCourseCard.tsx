import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import DepartmentDropDown from './DepartmentDropDown';
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
import { getSubjectListFromTimeTable } from '../redux/slices/subjectSlice';
import { getCurrentAcademicYear, getCurrentTerm } from '../redux/slices/calendarSlice';
import { getClassGroupList } from '../redux/slices/classGroupSlice';
import { getRegisteredStudents, getOptionalCourseRegistrations } from '../redux/slices/studentRegSlice';
import { getCourseOption } from '../redux/slices/programSubjectSlice';
import { registerOptionalCourses, unregisterOptionalCourses } from '../redux/slices/studentCourseRegSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import UserSession from '../utility/userSession';
import SubjectsFromTimetale from './SubjectsFromTimetale';

const privilegedSchoolRoles = ['owner', 'admin', 'secretary', 'principal', 'vice_principal'];
type AnyType = {
  [key: string]: string;
};

const StudentOptionalCourseCard = ({ schoolId, branchId, tabKey }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { course_option } = useSelector((state: RootState) => state.programSubject);
  const { academic_year, academic_term } = useSelector((state: RootState) => state.calendar);
  const { registrations, unregistered_students, registered_students } = useSelector((state: RootState) => state.studentReg);
  const { setShowToast } = useContext(ToastContext);

  const [roles, setRoles] = useState<string[]>([]);
  const [optionalCourses, setOptionalCourses] = useState<StudentOptionalCourse[]>([]);
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
    pagination: { per_page: 10000, current_page: 1, total_items: 0, total_pages: 0 },
  });

  const handleInputChange = <T extends AnyType>(field: keyof T, value: string)  => {
    setParams(prev => ({ ...prev, [field]: value }));
    const updatedParams = { ...params, [field]: value, school_id: schoolId, branch_id: branchId, academic_year_id: academic_year.id };

    switch (field) {
      case 'department_id':
        dispatch(getPrograms({ ...updatedParams, paginate: false }));
        dispatch(getOptionalCourseRegistrations({ ...updatedParams, department_id: parseInt(value) }));
        break;
      case 'stage_id':
        dispatch(getOptionalCourseRegistrations({ ...updatedParams, stage_id: parseInt(value) }));
      break;
      case 'program_id':
        dispatch(getSubjectListFromTimeTable({ ...updatedParams, optional: true, paginate: false }));
        dispatch(getOptionalCourseRegistrations({ ...updatedParams, program_id: parseInt(value) }));
        break;
      case 'subject_id':
        dispatch(getCourseOption({ ...updatedParams, academic_term_id: academic_term.id, subject_id: parseInt(value) }))
          .then(resp => {
            setParams(prev => ({ ...prev, program_subject_id: resp.payload?.course_option?.id }));
          });
        dispatch(getClassGroupList({ ...updatedParams, academic_term_id: academic_term.id, paginate: false }));
        dispatch(getOptionalCourseRegistrations({ ...updatedParams, subject_id: parseInt(value) }));
        break;
      case 'class_group_id':
        dispatch(getOptionalCourseRegistrations({ ...updatedParams, class_group_id: parseInt(value) }));
        break;
      default:
        dispatch(getOptionalCourseRegistrations({ ...updatedParams }));
        break;
    }
  };

  const handleCheckboxChange = (studentId: number, isChecked: boolean) => {
    setOptionalCourses(prev => 
      isChecked
        ? [...prev, { student_id: studentId, program_subject_id: course_option.id, reg_date: new Date().toISOString().split('T')[0] }]
        : prev.filter(course => course.student_id !== studentId)
    );
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    // Get the form name to determine the action
    const formName = e.currentTarget.name;
  
    // Prepare payload based on selected checkboxes
    const payload = {
      course_registration: {
        student_optional_courses: optionalCourses.map((course) => ({
          student_id: course.student_id,
          program_subject_id: course.program_subject_id,
          reg_date: course.reg_date,
        })),
      },
    };
    // Determine the action based on the form name
    switch (formName) {
      case 'register':
        dispatch(registerOptionalCourses(payload)).then((resp) => {
          setShowToast(true);
          setOptionalCourses([]);
          dispatch(getOptionalCourseRegistrations({ ...params}));
          showToastify(resp.payload.message, resp.payload.status);
        });
        break;
  
      case 'unregister':
        dispatch(unregisterOptionalCourses(payload)).then((resp) => {
          setShowToast(true);
          showToastify(resp.payload.message, resp.payload.status);
          setOptionalCourses([]);
          dispatch(getOptionalCourseRegistrations({ ...params}));
          
        });
        break;
  
      default:
        console.warn('Unknown form action');
        break;
    }
    
  };
  

  useEffect(() => {
    if (tabKey === 'registration') {
      const userRoles = UserSession.getroles();
      setRoles(userRoles);
      dispatch(getCurrentTerm(branchId));
      dispatch(getCurrentAcademicYear(branchId));
      if (branchId) {
        dispatch(getDepartments({ school_id: schoolId, branch_id: branchId, paginate: false }));
        dispatch(getStages({ school_id: schoolId, branch_id: branchId, paginate: false }));
      }
    }
  }, [dispatch, schoolId, branchId, tabKey]);

  return (
    <div className="academic-section-content">
      {/* Filter Section */}
      <div className="academic-add-section mb-4">
        <div className="academic-section-header">
          <div className="academic-section-icon">
            <i className="fas fa-filter"></i>
          </div>
          <h5>Filter Student Registrations</h5>
        </div>
        <Row className='d-flex flex-column flex-lg-row mb-3'>
          <Col><DepartmentDropDown schoolId={schoolId} branchId={branchId} onChange={handleInputChange} /></Col>
          <Col><ProgramDropDown branchId={branchId} onChange={handleInputChange} admission={undefined} departmentId={undefined} /></Col>
          <Col><StageDropDown branchId={branchId} onChange={handleInputChange} /></Col>
        </Row>
        <Row className='d-flex flex-column flex-lg-row'>
          <Col><SubjectsFromTimetale params={params} onChange={handleInputChange} branchId={0} schoolId={0} /></Col>
          <Col><ClassGroupDropDown onChange={handleInputChange} programId={0} stageId={0} lesson={undefined} departmentId={0} /></Col>
        </Row>
      </div>

      {/* Unregistered Students Section */}
      <div className="registration-card mb-4">
        <div className="academic-section-header">
          <div className="academic-section-icon">
            <i className="fas fa-user-plus"></i>
          </div>
          <h5>List of Unregistered Students for Selected Optional Subject</h5>
        </div>
        <Form name='register' onSubmit={handleSubmit}>
          <div className="students-list">
            {unregistered_students.length > 0 ? (
              unregistered_students.map((reg) => (
                <div key={reg.student_id} className="student-checkbox-item">
                  <Form.Check
                    type="switch"
                    id={`unreg-${reg.student_id}`}
                    label={
                      <span className="student-name-label">
                        <i className="fas fa-user me-2"></i>
                        {reg.full_name}
                      </span>
                    }
                    onChange={(e) => handleCheckboxChange(reg.student_id, e.target.checked)}
                  />
                </div>
              ))
            ) : (
              <div className="empty-state">
                <i className="fas fa-inbox fa-3x mb-3"></i>
                <p>No unregistered students found</p>
              </div>
            )}
          </div>
          {roles.some(role => privilegedSchoolRoles.includes(role)) && unregistered_students.length > 0 && (
            <div className="registration-footer">
              <Button className="btn-add-academic-item" type="submit">
                <i className="fas fa-user-check me-2"></i>
                Register Students
              </Button>
            </div>
          )}
        </Form>
      </div>

      {/* Registered Students Section */}
      <div className="registration-card">
        <div className="academic-section-header">
          <div className="academic-section-icon">
            <i className="fas fa-user-check"></i>
          </div>
          <h5>List of Registered Students for Selected Optional Subject</h5>
        </div>
        <Form name='unregister' onSubmit={handleSubmit}>
          <div className="students-list">
            {registered_students.length > 0 ? (
              registered_students.map((reg) => (
                <div key={reg.student_id} className="student-checkbox-item">
                  <Form.Check
                    type="switch"
                    id={`reg-${reg.student_id}`}
                    label={
                      <span className="student-name-label">
                        <i className="fas fa-user-graduate me-2"></i>
                        {reg.full_name}
                      </span>
                    }
                    onChange={(e) => handleCheckboxChange(reg.student_id, e.target.checked)}
                  />
                </div>
              ))
            ) : (
              <div className="empty-state">
                <i className="fas fa-inbox fa-3x mb-3"></i>
                <p>No registered students found</p>
              </div>
            )}
          </div>
          {roles.some(role => privilegedSchoolRoles.includes(role)) && registered_students.length > 0 && (
            <div className="registration-footer">
              <Button className="btn-unregister-academic" type="submit">
                <i className="fas fa-user-minus me-2"></i>
                Unregister Students
              </Button>
            </div>
          )}
        </Form>
      </div>
    </div>
  );
};

export default StudentOptionalCourseCard;
