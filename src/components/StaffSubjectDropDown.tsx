import React, { FC } from 'react'
import { Form } from 'react-bootstrap';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';


type AnyType = {
    [key: string]: string;
  };
  interface StaffSubjectDropDownProps {
    onChange: (field: keyof AnyType, value: string) => void;
    schoolId: any;
    branchId: any;
  }
const StaffSubjectDropDown:FC<StaffSubjectDropDownProps> = ({onChange, schoolId, branchId}) => {
    const { staff_subject_list} = useSelector((state: RootState) => state.subject)
    const handleInputChange = (e: React.ChangeEvent<any>) => {
        const selectedSubjectId = e.target.value;
        onChange('subject_id', selectedSubjectId);
      };
  return (
    <Form.Group controlId="subjectId">
    <Form.Label>Subjects</Form.Label>
    <Form.Select as="select" onChange={handleInputChange}>
        <option value="0">-----Select Subject----</option>
        {staff_subject_list.map(([subjectId, subjectName]) => (
          <option key={subjectId} value={subjectId}>
            {subjectName}
          </option>
        ))}
    </Form.Select>
</Form.Group>
  )
}

export default StaffSubjectDropDown