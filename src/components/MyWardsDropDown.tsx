import React, { FC } from 'react'
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getStudentSchools } from '../redux/slices/schoolSlice';
import FormSelect from './FormSelect';


type AnyType = {
    [key: string]: string;
  };

  interface MywardsDropDownProps {
    onChange: (field: keyof AnyType, value: string) => void;
    params?: any;
    myWards: any;
  }
  
const MyWardsDropDown: FC<MywardsDropDownProps> = ({ onChange, myWards, params }) => {
    const { schools} = useSelector((state: RootState) => state.school)
    const dispatch = useDispatch<AppDispatch>()

    const handleMyWarsChange = (e: React.ChangeEvent<any>) => {
    const selectedWardId = e.target.value;
      dispatch(getStudentSchools({...params, student_id: selectedWardId}))
    onChange('student_id', selectedWardId);
    }
  return (
    <Form.Group controlId="my_wards">
    <Form.Label>My Wards</Form.Label>
    <FormSelect onChange={handleMyWarsChange} value={'0'}>
      <option value="0">---Select---</option>
      {/* <option value={admission !== undefined ? admission.program_id : ''}>{admission !== undefined ? admission.admission_program : "-----Select Program----"}</option> */}
      {myWards.map((ward: any) => (<option key={ward.id} value={ward.id}>
        {ward.student_id} {ward.first_name} {ward.last_name}
      </option>
      ))}
    </FormSelect>
  </Form.Group>
  )
}

export default MyWardsDropDown