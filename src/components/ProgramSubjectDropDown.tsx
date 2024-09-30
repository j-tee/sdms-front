import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Form } from 'react-bootstrap';

type AnyType = {
  [key: string]: string;
};
interface ProgramSubjectDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
  lesson: any;
}
const ProgramSubjectDropDown: React.FC<ProgramSubjectDropDownProps> = ({ onChange, lesson }) => {
  console.log('ProgramSubjectDropDown lesson ============>', lesson)
  const { course_options } = useSelector((state: RootState) => state.programSubject)
  const [params, setParams] = useState<any>({})

  const handleSubjectChange = (e: React.ChangeEvent<any>) => {
    const selectedprogramSubjectId = e.target.value;
    setParams({
      ...params,
      program_subject_id: selectedprogramSubjectId,
    });
    onChange('program_subject_id', selectedprogramSubjectId);
  };
  return (
    <Form.Group controlId="branch">
      <Form.Label>Subjects</Form.Label>
      {/* {lesson.subject_name} */}
      <Form.Select as="select" onChange={handleSubjectChange} value={params.program_subject_id}>
      <option value={lesson ? lesson.program_subject_id : ''}>{lesson ? lesson.subject_name : "-----Select Subject----"}</option>
        {course_options.map((subject) => (<option key={subject.id} value={subject.id}>
          {subject.id} {subject.subject_name} 
        </option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

export default ProgramSubjectDropDown
