import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { ClassGroupParams } from '../models/classGroup';
import { RootState } from '../redux/store';

type AnyType = {
  [key: string]: string;
};
interface ClassGroupDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
  params: any
}
const StudentClassGroupDropDown: React.FC<ClassGroupDropDownProps> = ({ onChange, params }) => {
  const { class_groups } = useSelector((state: RootState) => state.classGroup)
 
  const handleClassGroupChange = (e: React.ChangeEvent<any>) => {
    const selectedClassGroupId = e.target.value;
   
    onChange('class_group_id', selectedClassGroupId);
  };
  return (
    <Form.Group controlId="department">
      <Form.Label>Class Groups</Form.Label>
      <Form.Select as="select" onChange={handleClassGroupChange} value={params.class_group_id}>
      {/* <option value={lesson ? lesson.class_group_id : ''}>{lesson ? lesson.class_group_name : "-----Select Class----"}</option> */}
      <option value="0">-----Select Class Group----</option>
        {class_groups.map((clsgrp) => (<option key={clsgrp.id} value={clsgrp.id}>
          {clsgrp.class_grp_name}
        </option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

export default StudentClassGroupDropDown
