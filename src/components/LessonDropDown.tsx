import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Form } from 'react-bootstrap';
import { QueryParams } from '../models/queryParams';
import { getLessons } from '../redux/slices/lessonSlice';
import { LessonParams } from '../models/Lesson';

type AnyType = {
  [key: string]: string;
};
interface LessonDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
  schoolId: number;
  staffId: number;
  branchId: number;
  academicTermId: number;
}

const LessonDropDown: React.FC<LessonDropDownProps> = ({ onChange, staffId, academicTermId, branchId }) => {
  const {lessons}=useSelector((state:RootState)=>state.lesson)
  // const dispatch = useDispatch<AppDispatch>()
  // const [params, setParams] = useState<QueryParams>({
  //   staff_id: 0,
  //   paginate: false,
  //   pagination: {
  //     per_page: 10000,
  //     current_page: 1,
  //     total_items: 0,
  //     total_pages: 0
  //   }
  // })

  // useEffect(() => {
  //   setParams({
  //     ...params,
  //     staff_id: staffId,
  //     academic_term_id: academicTermId,
  //   });
  //   // dispatch(getLessons({ ...params, staff_id: staffId, academic_term_id:academicTermId, paginate: false } as LessonParams))
  // }, [])

  const handleLessonChange = (e: React.ChangeEvent<any>) => {
    const selectedLessonId = e.target.value;
    onChange('lesson_id', selectedLessonId);
  };
  return (
    <Form.Group controlId="lesson">
      <Form.Label>Class and Subject</Form.Label>
      <Form.Select as="select" onChange={handleLessonChange}>
        <option value="">---Select---</option>
        {lessons.map((lesson)=>(
          <option key={lesson.id} value={lesson.id}>{lesson.class_group_name} {lesson.program_name} {lesson.subject_name}</option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

export default LessonDropDown
