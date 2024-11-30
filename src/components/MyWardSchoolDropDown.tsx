import React, { FC } from 'react'
import { Form } from 'react-bootstrap';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getBranches, getStudentBranches } from '../redux/slices/schoolSlice';


type AnyType = {
    [key: string]: string;
  };

  interface MywardsSchoolDropDownProps {
    onChange: (field: keyof AnyType, value: string) => void;
    params: any;
    studentId: any;
  }
const MyWardSchoolDropDown:  FC<MywardsSchoolDropDownProps> = ({ onChange, studentId, params }) => {
    const {schools} = useSelector((state: RootState) => state.school)
    const dispatch = useDispatch<AppDispatch>()

    const handleSchoolChange = (e: React.ChangeEvent<any>) => {
    const selectedSchoolId = e.target.value;
    dispatch(getStudentBranches({...params, school_id: selectedSchoolId}))
    onChange('school_id', selectedSchoolId);
    }
  return (
    <Form.Group controlId="my_wards">
    <Form.Label>Schools Attended</Form.Label>
    <Form.Select as="select" onChange={handleSchoolChange}>
      <option value="0">---Select---</option>
      {schools.map((school: any) => (<option key={school.id} value={school.id}>
        {school.school_name}
      </option>
      ))}
    </Form.Select>
  </Form.Group>
  )
}

export default MyWardSchoolDropDown