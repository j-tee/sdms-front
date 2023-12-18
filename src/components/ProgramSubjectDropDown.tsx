import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Form } from 'react-bootstrap';

type AnyType = {
  [key: string]: string;
};
interface ProgramSubjectDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
}
const ProgramSubjectDropDown: React.FC<ProgramSubjectDropDownProps> = ({ onChange }) => {
  const { course_options } = useSelector((state: RootState) => state.programSubject)
  const [params, setParams] = useState<any>({})
  const handleStaffChange = (e: React.ChangeEvent<any>) => {
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
      <Form.Control as="select" onChange={handleStaffChange} value={params.staff_id}>
        <option value="">---Select---</option>
        {course_options.map((subject) => (<option key={subject.id} value={subject.id}>
          {subject.id} {subject.subject_name} 
        </option>
        ))}
      </Form.Control>
    </Form.Group>
  )
}

export default ProgramSubjectDropDown
