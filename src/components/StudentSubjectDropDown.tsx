import React, { FC, useEffect } from 'react'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import { getSubjects } from '../redux/slices/subjectSlice';
import { getScoreSheets } from '../redux/slices/scoreSheetSlice';

type AnyType = {
    [key: string]: string;
  };
  interface StudentSubjectDropDownProps {
    onChange: (field: keyof AnyType, value: string) => void;
    params: any;
    index: any;
  }
const StudentSubjectDropDown:FC<StudentSubjectDropDownProps> = ({params, index, onChange}) => {
    const { subjects} = useSelector((state: RootState) => state.subject)
    const dispatch = useDispatch<AppDispatch>();
    const handleInputChange = (e: React.ChangeEvent<any>) => {
        const selectedSubjectId = e.target.value;
        onChange('subject_id', selectedSubjectId);
      };

      useEffect(() => {
        
        if(params.student_id && params.student_id > 0 && index === 'second'){
          dispatch(getScoreSheets({ ...params, paginate: true}));
        }
        
      }, [dispatch, index, params]);
  return (
    <Form.Group controlId="subjectId">
    <Form.Label>Subjects</Form.Label>
    <Form.Select as="select" onChange={handleInputChange}>
        <option value="0">-----Select Subject----</option>
        {subjects && subjects.map((subject) => (
          <option key={subject.id} value={subject.id}>
            {subject.subject_name}
          </option>
        ))}
    </Form.Select>
</Form.Group>
  )
}

export default StudentSubjectDropDown