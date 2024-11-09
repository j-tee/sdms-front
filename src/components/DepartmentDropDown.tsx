import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { Form } from 'react-bootstrap';
import { ProgramParams } from '../models/program';
import { getPrograms } from '../redux/slices/programSlice';

type AnyType = {
  [key: string]: string;
};
interface DepartmentDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
  branchId: number;
  schoolId: number;
  admission?: any;
}
const DepartmentDropDown: React.FC<DepartmentDropDownProps> = ({ onChange, branchId, schoolId, admission}) => {
  const { departments, message, status } = useSelector((state: RootState) => state.department)
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
  const handleDepartmentChange = (e: React.ChangeEvent<any>) => {
    const selectedDepartmentId = e.target.value;
    setParams({
      ...params,
      department_id: selectedDepartmentId,
      branch_id: 0,
      program_id: 0,
    });
    onChange('department_id', selectedDepartmentId);
  };
  const prog: ProgramParams = {
    branch_id:0
    // You can omit other properties if you don't need them
  };
  // useEffect(() => {
  //     dispatch(getDepartments({ ...params, branch_id: branchId, school_id:schoolId, paginate: false }))
  // }, [branchId, dispatch, params, schoolId])

  useEffect(() => {
    setParams((prevData) => ({
      ...params, department_id: admission ? admission.department_id : 0
    }))
    if(params.department_id){
      dispatch(getPrograms({ ...params, department_id: params.department_id, paginate: false }))
    }
    setShowToast(true)
    showToastify(message, status)
  }, [message, setShowToast, showToast, status])
  return (
    <Form.Group controlId="department">
      <Form.Label>Departments</Form.Label>
      <Form.Control as="select" onChange={handleDepartmentChange} value={params.department_id}>
        {admission && <option value={admission ? admission.department_id : ''}>{admission ? admission.dept_name : "-----Select Department----"}</option>}
        {departments.map((dept) => (<option key={dept.id} value={dept.id}>
          {dept.dept_name}
        </option>
        ))}
      </Form.Control>
    </Form.Group>
  )
}

export default DepartmentDropDown
