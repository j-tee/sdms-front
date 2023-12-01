import React, { useContext, useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { getBranches } from '../redux/slices/schoolSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';

type AnyType = {
  [key: string]: string;
};
interface BranchDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
  schoolId: any
}
const BranchDropDown: React.FC<BranchDropDownProps> = ({ onChange, schoolId }) => {
  const { branches, message, status } = useSelector((state: RootState) => state.school)
  const dispatch = useDispatch<AppDispatch>()
  const { showToast, setShowToast } = useContext(ToastContext)
  const [params, setParams] = useState({
    program_id: 0,
    branch_id: 0,
    school_id: 0,
    department_id: 0,
    paginate: false,
    pagination: {
      per_page: 10000,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })
  const handleBranchChange = (e: React.ChangeEvent<any>) => {
    const selectedBranchId = e.target.value;
    setParams({
      ...params,
      program_id: 0,
      branch_id: selectedBranchId,
      department_id: 0,
    });
    onChange('branch_id', selectedBranchId);
  };
  useEffect(() => {
    dispatch(getBranches({ ...params, school_id: schoolId }))
  }, [dispatch, params, schoolId])

  useEffect(() => {
    setShowToast(true)
    showToastify(message, status)
  }, [message, setShowToast, showToast, status])
  return (
    <Form.Group controlId="branch">
      <Form.Label>Region</Form.Label>
      <Form.Control as="select" onChange={handleBranchChange} value={params.branch_id}>
        <option value="">---Select---</option>
        {branches.map((branch) => (<option key={branch.id} value={branch.id}>
          {branch.branch_name}
        </option>
        ))}
      </Form.Control>
    </Form.Group>
  )
}

export default BranchDropDown
