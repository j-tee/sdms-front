import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { Form } from 'react-bootstrap';
import { ClassGroupParams } from '../models/classGroup';
import { getClassGroups } from '../redux/slices/classGroupSlice';

type AnyType = {
  [key: string]: string;
};
interface ClassGroupDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
  programId: number;
  stageId: number;
  departmentId:number;
}
const ClassGroupDropDown: React.FC<ClassGroupDropDownProps> = ({ onChange, programId, stageId, departmentId }) => {
  const { class_groups, message, status } = useSelector((state: RootState) => state.classGroup)
  const dispatch = useDispatch<AppDispatch>()
  const { showToast, setShowToast } = useContext(ToastContext)
  const [params, setParams] = useState<ClassGroupParams>({
    class_group_id: 0,
    department_id: 0,
    stage_id:0,
    program_id: 0,
    branch_id: 0,
    school_id: 0,
    paginate: false,
    pagination: {
      per_page: 10000,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })
  const handleClassGroupChange = (e: React.ChangeEvent<any>) => {
    const selectedClassGroupId = e.target.value;
    setParams({
      ...params,
      class_group_id: selectedClassGroupId,
      branch_id: 0,
      program_id: 0,
    });
    onChange('class_group_id', selectedClassGroupId);
  };
  useEffect(() => {
    dispatch(getClassGroups({ ...params, program_id: programId, stage_id: stageId, department_id:departmentId }))
  }, [departmentId, dispatch, params, programId, stageId])

  useEffect(() => {
    setShowToast(true)
    showToastify(message, status)
  }, [message, setShowToast, showToast, status])
  return (
    <Form.Group controlId="department">
      <Form.Label>Class Groups</Form.Label>
      <Form.Control as="select" onChange={handleClassGroupChange} value={params.class_group_id}>
        <option value="">---Select---</option>
        {class_groups.map((clsgrp) => (<option key={clsgrp.id} value={clsgrp.id}>
          {clsgrp.class_grp_name}
        </option>
        ))}
      </Form.Control>
    </Form.Group>
  )
}

export default ClassGroupDropDown
