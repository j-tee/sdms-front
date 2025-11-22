import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Form } from 'react-bootstrap'
import { getAcademicTerms } from '../redux/slices/calendarSlice';
import FormSelect from './FormSelect';

type AnyType = {
  [key: string]: string;
};
interface StudentAcademicYearDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
  params: any
}


const StudentAcademicYearDropDown: FC<StudentAcademicYearDropDownProps> = ({onChange, params}) => {
  const { academic_years } = useSelector((state: RootState) => state.calendar)
  const dispatch = useDispatch<AppDispatch>()
  
  const handleAcademicYearChange = (e: React.ChangeEvent<any>) => {
    const selectedYearId = e.target.value;
  
    onChange('academic_year_id', selectedYearId);
    dispatch(getAcademicTerms({ ...params, academic_year_id: selectedYearId }));
};
  return (
    <Form.Group controlId="yearId">
    <Form.Label>Academic Years</Form.Label>
    <FormSelect onChange={handleAcademicYearChange} value={''}>
        <option value="">-----Select Year----</option>
        {academic_years && academic_years.map((year) =>
        (<option key={year.id} value={year.id}>
            {year.academic_year}
        </option>
        ))}
    </FormSelect>
</Form.Group>
  )
}

export default StudentAcademicYearDropDown