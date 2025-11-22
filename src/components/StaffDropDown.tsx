import React, { useState } from 'react'
import { StaffParams } from '../models/staff';
import { Form } from 'react-bootstrap';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import FormSelect from './FormSelect';

type AnyType = {
    [key: string]: string;
  };
  interface StaffDropDownProps {
    onChange: (field: keyof AnyType, value: string) => void;
    value: any;
    branchId: number;
    schoolId: number;
  }
  
const StaffDropDown: React.FC<StaffDropDownProps> = ({onChange, branchId, value, schoolId}) => {
  const { staffs } = useSelector((state: RootState) => state.staff)
  const [params, setParams] = useState<StaffParams>({})
  
  const handleStaffChange = (e: React.ChangeEvent<any>) => {
    const selectedStaffId = e.target.value;
    setParams({
      ...params,
      staff_id: selectedStaffId,
    });
    onChange('staff_id', selectedStaffId);
  };
  return (
    <Form.Group controlId="branch">
      <Form.Label>Staffs</Form.Label>
      <FormSelect onChange={handleStaffChange} value={params.staff_id || ''}>
        <option value={value ? value.staff_id : ''}>{value ? value.staff_name : "-----Select Staff----"}</option>
        {staffs.map((staff) => (<option key={staff.id} value={staff.id}>
          {staff.id} {staff.last_name} {staff.first_name}
        </option>
        ))}
      </FormSelect>
    </Form.Group>
  )
}

export default StaffDropDown
