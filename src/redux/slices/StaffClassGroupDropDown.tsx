import React, { FC } from 'react'
import { RootState } from '../store';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';



type AnyType = {
    [key: string]: string;
  };
  interface StaffClassGroupDropDownProps {
    onChange: (field: keyof AnyType, value: string) => void;
    schoolId: any;
    branchId: any;
  }
const StaffClassGroupDropDown:FC<StaffClassGroupDropDownProps> = ({onChange, schoolId, branchId}) => {
    const { class_group_list} = useSelector((state: RootState) => state.classGroup)
    const handleInputChange = (e: React.ChangeEvent<any>) => {
        const selectedClassGroupId = e.target.value;
        onChange('class_group_id', selectedClassGroupId);
      };
  return (
    <Form.Group controlId="subjectId">
    <Form.Label>Class Groups</Form.Label>
    <Form.Select as="select" onChange={handleInputChange}>
        <option value="0">-----Select Class----</option>
        {class_group_list.map(([classGroupId, classGroupName]) => (
          <option key={classGroupId} value={classGroupId}>
            {classGroupName}
          </option>
        ))}
    </Form.Select>
</Form.Group>
  )
}

export default StaffClassGroupDropDown