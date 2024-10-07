import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Form } from 'react-bootstrap';

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
  
  const handleLessonChange = (e: React.ChangeEvent<any>) => {
    const selectedLessonId = e.target.value;
    onChange('lesson_id', selectedLessonId);
  };
  return (
    <Form.Group controlId="lesson">
      <Form.Label>Lessons</Form.Label>
      <Form.Select as="select" onChange={handleLessonChange}>
        <option value="">---Select---</option>
        {lessons.map((lesson)=>(
          <option key={lesson.id} value={lesson.id}>{lesson.day_of_week} | {lesson.subject_name} | {new Date(lesson.start_time).toLocaleTimeString()} - {new Date(lesson.end_time).toLocaleTimeString()} |</option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

export default LessonDropDown
