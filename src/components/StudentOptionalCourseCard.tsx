import React, { useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import DepartmentDropDown from './DepartmentDropDown'
import ProgramDropDown from './ProgramDropDown';
import StageDropDown from './StageDropDown';
import SubjectDropDown from './SubjectDropDown';
import ClassGroupDropDown from './ClassGroupDropDown';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { StudentOptionalCourse } from '../models/optionalCourseRegistration';
// to do: get the list of optional courses for the student
// to do: only the staff teaching the course can register the student
// to do: get the list of students registered for the program and the stage at which the subject is being offered  
const StudentOptionalCourseCard = (props: any) => {
  const { schoolId, branchId, tabKey } = props;
  const dispatch = useDispatch<AppDispatch>();
  const [optinalCourses, setOptionalCourses] = useState<StudentOptionalCourse[]>([])
  const [params, setParams] = useState({
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

  };
  return (
    <div>
      <Card.Header>
        <span className="text-muted fs-3">Optional Courses Registrations</span>
      </Card.Header>
      <Card.Body>
        <Card.Text>
          <Row>
            <Col>
              <DepartmentDropDown schoolId={schoolId} branchId={branchId} onChange={handleInputChange} />
            </Col>
            <Col>
              <ProgramDropDown branchId={branchId} onChange={handleInputChange} departmentId={undefined} />
            </Col>
            <Col>
              <StageDropDown branchId={branchId} onChange={handleInputChange} />
            </Col>
          </Row>
          <Row>
            <Col>
              <SubjectDropDown branchId={branchId} onChange={handleInputChange } schoolId={0} />
            </Col>
          <Col>
          <ClassGroupDropDown onChange={handleInputChange} programId={0} stageId={0} departmentId={0} />
          </Col>
          </Row>
        </Card.Text>
      </Card.Body>
    </div>
  )
}

export default StudentOptionalCourseCard
