import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Form } from 'react-bootstrap';
import { getStudentClassGroups } from '../redux/slices/classGroupSlice';
import FormSelect from './FormSelect';

type AnyType = {
  [key: string]: string;
};
interface ProgramDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
  params: any
}
const StudentProgramDropDown: React.FC<ProgramDropDownProps> = ({ onChange, params }) => {
  const { programs} = useSelector((state: RootState) => state.program)
  const dispatch = useDispatch<AppDispatch>()
  
  const handleProgramChange = (e: React.ChangeEvent<any>) => {
    const selectedProgramId = e.target.value;
   dispatch(getStudentClassGroups({ ...params, program_id: selectedProgramId }))
    onChange('program_id', selectedProgramId);
  };
  
  return (
    <Form.Group controlId="department">
      <Form.Label>Programs</Form.Label>
      <FormSelect onChange={handleProgramChange} value={params.program_id || '0'}>
        <option value="0">---Select---</option>
        {/* <option value={admission !== undefined ? admission.program_id : ''}>{admission !== undefined ? admission.admission_program : "-----Select Program----"}</option> */}
        {programs.map((prog) => (<option key={prog.id} value={prog.id}>
          {prog.prog_name}
        </option>
        ))}
      </FormSelect>
    </Form.Group>
  )
}

export default StudentProgramDropDown
