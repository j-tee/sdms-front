import React, { useContext, useState } from 'react'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { Form } from 'react-bootstrap';
import { getClassGroups } from '../redux/slices/classGroupSlice';

type AnyType = {
    [key: string]: string;
};
interface AcademicTermDropDownProps {
    onChange: (field: keyof AnyType, value: string) => void;
    schoolId: any;
    branchId: any;
    yearId: any;
}

const AcademicTermDropDown: React.FC<AcademicTermDropDownProps> = ({ onChange, schoolId, yearId, branchId }) => {
    const { academic_terms, message, status } = useSelector((state: RootState) => state.calendar)
    const dispatch = useDispatch<AppDispatch>()
    const { showToast, setShowToast } = useContext(ToastContext)

    const [params, setParams] = useState({
        academic_year_id: yearId,
        school_id: schoolId,
        branch_id: branchId,
        academic_term_id: 0
    });
    const handleAcademicTermChange = (e: React.ChangeEvent<any>) => {
        const selectedTermId = e.target.value;
        setParams((prevParams) => ({
            ...prevParams,
            academic_term_id: selectedTermId,
        }));
        onChange('academic_term_id', selectedTermId);

        dispatch(getClassGroups({
            ...params, paginate: false,
            stage_id: 0,
            class_group_id: 0,
            department_id: 0,
            program_id: 0,
            pagination: { per_page: 10000, current_page: 1, total_items: 0, total_pages: 0 }
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
        // <div>
        //   <select
        //     onChange={(e) => onChange('academic_term', e.target.value)}
        //     value={params.academic_year_id}
        //   >
        //     {academic_terms.map((term) => (
        //       <option key={term.id} value={term.id}>
        //         {term.term_name}
        //       </option>
        //     ))}
        //   </select>
        // </div>
    )
}

export default AcademicTermDropDown