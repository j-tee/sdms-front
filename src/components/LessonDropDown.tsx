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
      <Form.Label>Subject</Form.Label>
      <Form.Select as="select" onChange={handleLessonChange}>
        <option value="">---Select---</option>
        {lessons.map((lesson)=>(
          <option key={lesson.id} value={lesson.id}>{lesson.program_name} {lesson.subject_name} - {lesson.class_group_name}</option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

export default LessonDropDown
