import React from 'react'
import { QueryParams } from '../models/queryParams';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Form } from 'react-bootstrap';
import FormSelect from './FormSelect';


type AnyType = {
    [key: string]: string;
  };
  interface SubjectDropDownProps {
    onChange: (field: keyof AnyType, value: string) => void;
    branchId: number;
    schoolId: number;
    params: QueryParams;
  }
const SubjectsFromTimetale:React.FC<SubjectDropDownProps> = ({ onChange, branchId, schoolId, params})=> {
    const { subjects_from_timetable} = useSelector((state: RootState) => state.subject)  
    const handleInputChange = (e: React.ChangeEvent<any>) => {
        const selectedSubjectId = e.target.value;
        onChange('subject_id', selectedSubjectId);
      };
  return (
    <Form.Group controlId="department">
    <Form.Label>Subjects</Form.Label>
    <FormSelect onChange={handleInputChange} value={params.subject_id || ''}>
      <option value="">---Select---</option>
      {subjects_from_timetable.map((subject) => (<option key={subject.id} value={subject.id}>
        {subject.subject_name}
      </option>
      ))}
    </FormSelect>
  </Form.Group>
  )
}

export default SubjectsFromTimetale
