import React from 'react'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { getStudentDepartments } from '../redux/slices/departmentSlice';
import { getStudentStages } from '../redux/slices/stageSlice';
import { getStudentAcademicYears } from '../redux/slices/calendarSlice';
import FormSelect from './FormSelect';

type AnyType = {
  [key: string]: string;
};
interface BranchDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
  params?: any;
  schoolId?: any
}
const StudentBranchDropDown: React.FC<BranchDropDownProps> = ({ onChange, params }) => {
  const { branches } = useSelector((state: RootState) => state.school)
  const dispatch = useDispatch<AppDispatch>()
 
  const handleBranchChange = (e: React.ChangeEvent<any>) => {
    const selectedBranchId = e.target.value;
    dispatch(getStudentDepartments({ ...params, branch_id: selectedBranchId, paginate: false }));
    dispatch(getStudentStages({ ...params, branch_id: selectedBranchId, paginate: false }));
    dispatch(getStudentAcademicYears({ ...params, branch_id: selectedBranchId, paginate: false }));
    onChange('branch_id', selectedBranchId);
  };  

  return (
    <Form.Group controlId="branch">
      <Form.Label>Branches</Form.Label>
      <FormSelect onChange={handleBranchChange} value={params.branch_id || ''}>
        <option value="">---Select---</option>
        {branches.map((branch) => (<option key={branch.id} value={branch.id}>
          {branch.branch_name}
        </option>
        ))}
      </FormSelect>
    </Form.Group>
  )
}

export default StudentBranchDropDown
