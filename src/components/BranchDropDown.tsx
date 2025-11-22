import React, { useContext, useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { getAcademicYears } from '../redux/slices/calendarSlice';
import FormSelect from './FormSelect';

type AnyType = {
  [key: string]: string;
};
interface BranchDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
  params?: any;
  schoolId: any
}
const BranchDropDown: React.FC<BranchDropDownProps> = ({ onChange, schoolId, params }) => {
  const { branches, message, status } = useSelector((state: RootState) => state.school)
  const { showToast, setShowToast } = useContext(ToastContext)
  const dispatch = useDispatch<AppDispatch>()
 
  const handleBranchChange = (e: React.ChangeEvent<any>) => {
    const selectedBranchId = e.target.value;
    dispatch(getAcademicYears({ ...params, branch_id: selectedBranchId, paginate: false }));
    onChange('branch_id', selectedBranchId);
  };  

  useEffect(() => {
    setShowToast(true)
    showToastify(message, status)
  }, [message, setShowToast, showToast, status])
  return (
    <Form.Group controlId="branch">
      <Form.Label>Branches</Form.Label>
      <FormSelect onChange={handleBranchChange} value={params?.branch_id || ''}>
        <option value="">---Select---</option>
        {branches.map((branch) => (<option key={branch.id} value={branch.id}>
          {branch.branch_name}
        </option>
        ))}
      </FormSelect>
    </Form.Group>
  )
}

export default BranchDropDown
