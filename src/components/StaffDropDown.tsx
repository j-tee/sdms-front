import React, { useState } from 'react'
import { StaffParams } from '../models/staff';
import { Form } from 'react-bootstrap';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

type AnyType = {
    [key: string]: string;
  };
  interface StaffDropDownProps {
    onChange: (field: keyof AnyType, value: string) => void;
    branchId: number;
    schoolId: number;
  }
  
const StaffDropDown: React.FC<StaffDropDownProps> = ({onChange, branchId}) => {
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
      <Form.Control as="select" onChange={handleStaffChange} value={params.staff_id}>
        <option value="">---Select---</option>
        {staffs.map((staff) => (<option key={staff.id} value={staff.id}>
          {staff.id} {staff.last_name} {staff.first_name}
        </option>
        ))}
      </Form.Control>
    </Form.Group>
  )
}

export default StaffDropDown
