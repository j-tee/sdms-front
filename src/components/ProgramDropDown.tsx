import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getPrograms } from '../redux/slices/programSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { Form } from 'react-bootstrap';

type AnyType = {
  [key: string]: string;
};
interface ProgramDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
  departmentId:number | undefined;
  branchId:number;
}
const ProgramDropDown: React.FC<ProgramDropDownProps> = ({ onChange, branchId, departmentId }) => {
  const { programs, message, status } = useSelector((state: RootState) => state.program)
  const { showToast, setShowToast } = useContext(ToastContext)
  const dispatch = useDispatch<AppDispatch>()
  const [params, setParams] = useState({
    program_id: 0,
    branch_id: 0,
    department_id: 0,
    paginate: false,
    pagination: {
      per_page: 10000,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })
  const handleProgramChange = (e: React.ChangeEvent<any>) => {
    const selectedProgramId = e.target.value;
    setParams({
      ...params,
      program_id: selectedProgramId,
      branch_id: branchId,
      department_id: 0,
    });
    onChange('program_id', selectedProgramId);
  };
  
  useEffect(() => {
    setShowToast(true)
    showToastify(message, status)
  }, [message, setShowToast, showToast, status])
  return (
    <Form.Group controlId="department">
      <Form.Label>Programs</Form.Label>
      <Form.Control as="select" onChange={handleProgramChange} value={params.program_id}>
        <option value="">---Select---</option>
        {programs.map((prog) => (<option key={prog.id} value={prog.id}>
          {prog.prog_name}
        </option>
        ))}
      </Form.Control>
    </Form.Group>
  )
}

export default ProgramDropDown
