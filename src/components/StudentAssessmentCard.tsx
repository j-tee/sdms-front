import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { ClassGroup } from '../models/classGroup';
import { getStudentScoreSheets } from '../redux/slices/scoreSheetSlice';
import { Form, Table } from 'react-bootstrap';

const StudentAssessmentCard = (props: any) => {
  const { tabIndex,class_group, student, params} = props;
  const dispatch = useDispatch<AppDispatch>();
  const { score_sheets } = useSelector((state: RootState) => state.scoreSheet)  
  const {subject_list} = useSelector((state: RootState) => state.subject)
  useEffect(() => {
    if (params.academic_year_id && params.academic_term_id && class_group && tabIndex === 'third') {
      dispatch(getStudentScoreSheets({
        academic_term_id: params.academic_term_id,
        class_group_id: class_group.id,
        student_id: student.id,
        subject_id: 0, // Default value
      }));
    }
  }, [dispatch, student, class_group, tabIndex, params]);
  
  const handleSubjectChange = (e: React.ChangeEvent<any>) => {
    // const subjectId = e.target.value;
    dispatch(getStudentScoreSheets({
      academic_term_id: params.academic_term_id,
      class_group_id: class_group.id,
      student_id: student.id,
      subject_id: 0,
      subject_name: e.target.value
    }));    
  }
  return (
    <>
    <Form.Group controlId="subjectId">
    <Form.Label>Subjects</Form.Label>
    <Form.Select as="select" onChange={handleSubjectChange}>
        <option value="">-----Select Subject----</option>
        {subject_list && subject_list.map((subject) =>
        (<option key={subject} value={subject}>
            {subject}
        </option>
        ))}
    </Form.Select>
</Form.Group>
    <Table size='sm' borderless striped hover>
      <thead>
        <tr>
          <th>Subject</th>
          <th>Assessment</th>
          <th>Score</th>
          <th>Percentage Score</th>
        </tr>
      </thead>
      <tbody>
        {score_sheets && score_sheets.map((scoreSheet) => (
          <tr key={scoreSheet.id}>
            <td>{scoreSheet.subject_name}</td>
            <td>{scoreSheet.assessment_name}</td>
            <td>{scoreSheet.student_score}</td>
            <td>{scoreSheet.percentage_score}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    </>
  )
}

export default StudentAssessmentCard