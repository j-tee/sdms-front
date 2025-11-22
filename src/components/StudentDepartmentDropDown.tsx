import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Form } from 'react-bootstrap';
import { getPrograms } from '../redux/slices/programSlice';
import FormSelect from './FormSelect';

type AnyType = {
  [key: string]: string;
};
interface DepartmentDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
  params: any
}
const StudentDepartmentDropDown: React.FC<DepartmentDropDownProps> = ({ onChange, params}) => {
  const { departments } = useSelector((state: RootState) => state.department)
  const dispatch = useDispatch<AppDispatch>()
  
  const handleDepartmentChange = (e: React.ChangeEvent<any>) => {
    const selectedDepartmentId = e.target.value;
   dispatch(getPrograms({ ...params, department_id: selectedDepartmentId, paginate: false }))
    onChange('department_id', selectedDepartmentId);
  };
  return (
    <Form.Group controlId="department">
      <Form.Label>Departments</Form.Label>
      <FormSelect onChange={handleDepartmentChange} value={params.department_id}>
        {/* {admission && <option value={admission ? admission.department_id : ''}>{admission ? admission.dept_name : "-----Select Department----"}</option>} */}
        <option value='0'>-----Select Department----</option>
        {departments.map((dept) => (<option key={dept.id} value={dept.id}>
          {dept.dept_name}
        </option>
        ))}
      </FormSelect>
    </Form.Group>
  )
}

export default StudentDepartmentDropDown
