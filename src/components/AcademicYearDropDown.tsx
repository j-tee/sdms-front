import React, { FC, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { ToastContext } from '../utility/ToastContext';
import { Form } from 'react-bootstrap';
import { getAcademicTerms, getAcademicYears } from '../redux/slices/calendarSlice';
type AnyType = {
    [key: string]: string;
};
interface AcademicYearDropDownProps {
    onChange: (field: keyof AnyType, value: string) => void;
    schoolId: any;
    branchId: any;
}
const AcademicYearDropDown: FC<AcademicYearDropDownProps> = ({ onChange, schoolId, branchId }) => {
    const { academic_years } = useSelector((state: RootState) => state.calendar)
    const dispatch = useDispatch<AppDispatch>();
    const [params, setParams] = useState({
        branch_id: branchId,
        school_id: schoolId,
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
        });
        onChange('academic_year_id', selectedYearId);
        dispatch(getAcademicTerms({ ...params, academic_year_id: selectedYearId }));
    };
    useEffect(() => {
        if(branchId && schoolId){
            dispatch(getAcademicYears({ ...params, branch_id: branchId, school_id: schoolId }));
        } 
    }
    , [branchId, dispatch, params, schoolId])
    return (
        <Form.Group controlId="yearId">
        <Form.Label>Academic Years</Form.Label>
        <Form.Select as="select" onChange={handleAcademicYearChange}>
            <option value="">-----Select Year----</option>
            {academic_years.map((year) =>
            (<option key={year.id} value={year.id}>
                {year.academic_year}
            </option>
            ))}
        </Form.Select>
    </Form.Group>
    )
}

export default AcademicYearDropDown