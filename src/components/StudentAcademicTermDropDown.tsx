import React, { FC, useContext, useState } from 'react'
import { Form } from 'react-bootstrap';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { getClassGroupList, getStudentClassGroups } from '../redux/slices/classGroupSlice';


type AnyType = {
  [key: string]: string;
};
interface StudentAcademicTermDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
 params: any
}
const StudentAcademicTermDropDown: FC<StudentAcademicTermDropDownProps> = ({onChange, params}) => {
  const { academic_terms, message, status } = useSelector((state: RootState) => state.calendar)
  const dispatch = useDispatch<AppDispatch>()
    const { showToast, setShowToast } = useContext(ToastContext)

    const handleAcademicTermChange = (e: React.ChangeEvent<any>) => {
        const selectedTermId = e.target.value;
       
        onChange('academic_term_id', selectedTermId);

        dispatch(getStudentClassGroups({
            ...params, paginate: false,
            academic_term_id: selectedTermId,
        }));
    };
  return (
    <Form.Group controlId="termId">
            <Form.Label>Academic Terms</Form.Label>
            <Form.Select as="select" onChange={handleAcademicTermChange} value={params.academic_term_id}>
                <option value="">-----Select Term----</option>
                {academic_terms.map((term) =>
                (<option key={term.id} value={term.id}>
                    {term.term_name}
                </option>
                ))}
            </Form.Select>
        </Form.Group>
  )
}

export default StudentAcademicTermDropDown