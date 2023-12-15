import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

type AnyType = {
    [key: string]: string;
  };
  interface SubjectDropDownProps {
    onChange: (field: keyof AnyType, value: string) => void;
    branchId: number;
    schoolId: number;
  }
const SubjectDropDown:React.FC<SubjectDropDownProps> = ({ onChange, branchId, schoolId}) => {
    const { subjects} = useSelector((state: RootState) => state.subject)  
    const [params, setParams] = useState({
        program_id: 0,
        branch_id: 0,
        school_id: 0,
        subject_id: 0,
        paginate: false,
        pagination: {
          per_page: 10000,
          current_page: 1,
          total_items: 0,
          total_pages: 0
        }
      })
    const handleInputChange = (e: React.ChangeEvent<any>) => {
        const selectedSubjectId = e.target.value;
        setParams({
          ...params,
          subject_id: selectedSubjectId,
          branch_id: 0,
          program_id: 0,
        });
        onChange('subject_id', selectedSubjectId);
      };
  return (
    <Form.Group controlId="department">
    <Form.Label>Departments</Form.Label>
    <Form.Control as="select" onChange={handleInputChange} value={params.subject_id}>
      <option value="">---Select---</option>
      {subjects.map((subject) => (<option key={subject.id} value={subject.id}>
        {subject.subject_name}
      </option>
      ))}
    </Form.Control>
  </Form.Group>
  )
}

export default SubjectDropDown
