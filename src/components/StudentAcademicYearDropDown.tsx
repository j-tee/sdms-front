import React, { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Form } from 'react-bootstrap'
import { getAcademicTerms } from '../redux/slices/calendarSlice';

type AnyType = {
  [key: string]: string;
};
interface StudentAcademicYearDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
  studentId: any;
}


const StudentAcademicYearDropDown: FC<StudentAcademicYearDropDownProps> = ({onChange, studentId}) => {
  const { academic_years } = useSelector((state: RootState) => state.calendar)
  const dispatch = useDispatch<AppDispatch>()
  const [params, setParams] = useState({
    student_id: studentId,
    academic_year_id: 0,
    paginate: false,
    pagination: {
        per_page: 10000,
        current_page: 1,
        total_items: 0,
        total_pages: 0
    }
  });
  const handleAcademicYearChange = (e: React.ChangeEvent<any>) => {
    const selectedYearId = e.target.value;
    setParams({
        ...params,
        academic_year_id: selectedYearId,
        student_id: studentId
    });
    onChange('academic_year_id', selectedYearId);
    dispatch(getAcademicTerms({ ...params, academic_year_id: selectedYearId }));
};
  return (
    <Form.Group controlId="yearId">
    <Form.Label>Academic Years</Form.Label>
    <Form.Select as="select" onChange={handleAcademicYearChange}>
        <option value="">-----Select Year----</option>
        {academic_years && academic_years.map((year) =>
        (<option key={year.id} value={year.id}>
            {year.academic_year}
        </option>
        ))}
    </Form.Select>
</Form.Group>
  )
}

export default StudentAcademicYearDropDown