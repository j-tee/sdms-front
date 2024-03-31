import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTerm } from '../redux/slices/calendarSlice';
import { QueryParams } from '../models/queryParams';
import { getStaffs } from '../redux/slices/staffSlice';
import StaffAssessmentDetails from './StaffAssessmentDetails';
import { Col, Row } from 'react-bootstrap';
import StaffDropDown from './StaffDropDown';
import LessonDropDown from './LessonDropDown';
import { getLessons } from '../redux/slices/lessonSlice';
import { getClassGroups } from '../redux/slices/classGroupSlice';
import { LessonParams } from '../models/Lesson';
import { ClassGroupParams } from '../models/classGroup';
import { getStaffAssessmentSummary } from '../redux/slices/assessmentSlice';

const AssessmentReport = (props: any) => {
  const { schoolId, branchId, index } = props;
  const { academic_term } = useSelector((state: RootState) => state.calendar)
  const { staff_assessment_summary } = useSelector((state: RootState) => state.assessment)
  const dispatch = useDispatch<AppDispatch>()
  const [params, setParams] = useState<QueryParams>({
    pagination: {
      per_page: 10,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    },
  })
  type AnyType = {
    [key: string]: string;
  };

  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setParams((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    switch (field) {
      case 'staff_id':
        dispatch(getLessons({ ...params, staff_id: parseInt(value), academic_term_id: academic_term.id, branch_id: branchId, paginate: false } as LessonParams))
        dispatch(getStaffAssessmentSummary({ ...params, staff_id: parseInt(value), paginate: false }))
        break;
      case 'lesson_id':
        dispatch(getStaffAssessmentSummary({ ...params, lesson_id: parseInt(value), paginate: false }))
        dispatch(getClassGroups({ ...params, lesson_id: parseInt(value), paginate: false } as ClassGroupParams))
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    
    setParams((prevState) => ({
      ...prevState,
      branch_id: branchId,
      school_id: schoolId,
      academic_term_id: academic_term.id
    }))
    
  }, [academic_term.id, branchId, schoolId])

  useEffect(() => {
    dispatch(getCurrentTerm(branchId))
    dispatch(getStaffs({ ...params, school_id: schoolId, branch_id: branchId }))
  } , [branchId, dispatch, params, schoolId, staff_assessment_summary])
  return (
    <div>
      <Row className='d-flex flex-column flex-lg-row'>
        <Col>
          <StaffDropDown onChange={handleInputChange} branchId={branchId} schoolId={schoolId} value={undefined} />
        </Col>
        <Col>
        <LessonDropDown onChange={handleInputChange} branchId={branchId} schoolId={schoolId} staffId={0} academicTermId={academic_term.id|| 0} />
        </Col>
      </Row>
      <Row className='d-flex flex-wrap flex-lg-row mt-3 p-4'>
      {staff_assessment_summary.map((s) =>(        
          <StaffAssessmentDetails summary={s} index={index} schoolId={schoolId} branchId={branchId} lessonId={0} />         
      ))}
      </Row>   
    </div>
  )
}

export default AssessmentReport
