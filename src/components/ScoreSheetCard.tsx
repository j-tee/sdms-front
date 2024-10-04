import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Col, Form, ListGroup, Row, Table } from 'react-bootstrap';
import { getAssessmentTypes } from '../redux/slices/assesmentTypeSlice';
import { getLessons } from '../redux/slices/lessonSlice';
import StaffDropDown from './StaffDropDown';
import AssessmentTypeDropDown from './AssessmentTypeDropDown';
import LessonDropDown from './LessonDropDown';
import { getAssessments } from '../redux/slices/assessmentSlice';
import { getCurrentTerm } from '../redux/slices/calendarSlice';
import { getStaffs } from '../redux/slices/staffSlice';
import AssessmentDropDown from './AssessmentDropDown';
import { getRegisteredStudentsForRecordingScores } from '../redux/slices/studentRegSlice';
import { ScoreSheet } from '../models/scoreSheet';
import { addScoreSheet, getScoreSheets } from '../redux/slices/scoreSheetSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { AssessmentViewModel } from '../models/assessment';
type AnyType = {
  [key: string]: string;
};
const ScoreSheetCard = (props: any) => {
  const { schoolId, branchId, index } = props;
  const { academic_term } = useSelector((state: RootState) => state.calendar)
  const { assessments } = useSelector((state: RootState) => state.assessment)
  const { registrations } = useSelector((state: RootState) => state.studentReg)
  const { score_sheets } = useSelector((state: RootState) => state.scoreSheet)
  const dispatch = useDispatch<AppDispatch>()
  const [scores, setScores] = useState<ScoreSheet[]>([]);
  const { showToast, setShowToast } = useContext(ToastContext)
  const [assessment, setAssessment] = useState<AssessmentViewModel>({
    id: 0,
    assessment_name: '',
    base_mark: 0,
    pass_mark: 0,
    category: '',
    class_group_name: '',
    program_name: '',
    subject_name: '',
    assessment_category: '',
    class_group_id: 0,
    program_subject_id: 0,
    assessment_type_id: 0,
  })


  const [formData, setFormData] = useState({
    staff_id: '',
    assessment_type_id: '',
    class_group_id: '',
    lesson_id: '',
  });
  const [params, setParams] = useState({
    program_id: 0,
    branch_id: branchId,
    school_id: schoolId,
    assessment_type_id: 0,
    subject_id: 0,
    academic_term_id: academic_term.id,
    class_group_id: 0,
    department_id: 0,
    stage_id: 0,
    assessment_id: 0,
    paginate: false,
    pagination: {
      per_page: 10,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Assuming server expects data in the format: { score_sheet: [{student_id, score, assessment_id}, ...] }
    const formattedData = {
      scores: scores.map(score => ({
        student_id: score.student_id,
        score: score.score,
        assessment_id: score.assessment_id
      }))
    };
    dispatch(addScoreSheet(formattedData))
      .then((res: any) => {
        dispatch(getScoreSheets({ ...params, paginate: true }));
        setShowToast(true);
        showToastify(res.payload.message, res.payload.status);
      });
  };

  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    setParams((prevData) => ({
      ...prevData,
      [field]: parseInt(value),
    }));
    switch (field) {
      case 'staff_id':
        dispatch(getScoreSheets({ ...params, staff_id: parseInt(value), paginate: false }))
        dispatch(getAssessmentTypes({ ...params, branch_id: branchId, paginate: false }))
        dispatch(getLessons({ ...params, staff_id: parseInt(value), academic_term_id: academic_term.id, branch_id: branchId, paginate: false }))
        break;
      case 'assessment_type_id':
        dispatch(getScoreSheets({ ...params, assessment_type_id: parseInt(value), paginate: false }))
        dispatch(getLessons({ ...params, academic_term_id: academic_term.id, assessment_type_id: parseInt(value), paginate: false }))
        break;
      case 'class_group_id':
        dispatch(getScoreSheets({ ...params, class_group_id: parseInt(value), paginate: false }))
        dispatch(getLessons({ ...params, academic_term_id: academic_term.id, class_group_id: parseInt(value), paginate: false }))
        break;
      case 'lesson_id':
        dispatch(getScoreSheets({ ...params, lesson_id: parseInt(value), paginate: false }))
        dispatch(getAssessments({ ...params, academic_term_id: academic_term.id, lesson_id: parseInt(value), paginate: false }))
        break;
      case 'assessment_id':
        const assessment = assessments.find((assmnt) => assmnt.id === parseInt(value));
        setAssessment((prevData) => ({
          ...prevData,
          ...assessment
        }))
        dispatch(getScoreSheets({ ...params, assessment_id: parseInt(value), paginate: false }))
        dispatch(getRegisteredStudentsForRecordingScores({ ...params, assessment_id: parseInt(value), paginate: true }))

        setScores([]);
        break;
      default:
        break;
    }
  }
  useEffect(() => {
    setParams({
      ...params,
      branch_id: branchId,
      academic_term_id: academic_term.id
    });

    if (index === 'sc') {
      dispatch(getCurrentTerm(branchId))
      dispatch(getStaffs({ ...params, branch_id: branchId, paginate: false }))
      dispatch(getRegisteredStudentsForRecordingScores({ ...params, branch_id: branchId, paginate: true }))
      dispatch(getScoreSheets({ ...params, paginate: true }));
    }
  }, [branchId, index, dispatch, academic_term.id, assessment])

  useEffect(() => {
    const initialScores = registrations.map((registration: any) => ({
      student_id: registration.student_id,
      score: 0,
      assessment_id: params.assessment_id
    }));
    setScores(initialScores);
  }, [registrations, params.assessment_id]);


  // const handleScoreChange = (studentId: number, newScore: number) => {
  //   const updatedScores = scores.map((score) =>
  //     score.student_id === studentId ? { ...score, score: newScore } : score
  //   );

  //   if (!arraysAreEqual(scores, updatedScores)) {
  //     // No changes were made, do not update state
  //     return;
  //   }

  //   setScores([...updatedScores]); // Create a new array
  // };
  const handleScoreChange = (studentId: number, newScore: number) => {
    if (newScore > assessment.base_mark) {
      setShowToast(true);
      showToastify('Score cannot be greater than base mark', 'error');
      return;
    }
    const updatedScores = scores.map((score) =>
      score.student_id === studentId ? { ...score, score: newScore } : score
    );

    if (scores === updatedScores) {
      setShowToast(true);
      showToastify('No changes were made', 'error');
      return;
    }

    setScores(updatedScores);
  };


  const getScoreForStudent = (studentId: number): number => {
    const score = scores.find((s) => s.student_id === studentId);
    return score?.score ?? 0;
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <StaffDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} value={undefined} />
          </Col>
          <Col>
            <AssessmentTypeDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} />
          </Col>
        </Row>
        <Row>
          <Col>
            <LessonDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} staffId={0} academicTermId={0} />
          </Col>
          <Col>
            <AssessmentDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} />
          </Col>
        </Row>
      </Form>
      {assessment.assessment_name && <span className='py-4 text-muted'>
        <h5>Assessment: {assessment.assessment_name}</h5>
        <h5>Subject: {assessment.subject_name}</h5>
        <h5>Base Mark: {assessment.base_mark}</h5>
      </span>}
      <ListGroup as="ol" variant="dark">
        {registrations.map((registration: any) => (
          <ListGroup.Item as="li" key={registration.id} className='d-flex flex-row justify-content-between'>
            <span>{registration.full_name}</span>
            <span>
              <Form.Control
                type="number"
                value={getScoreForStudent(registration.student_id)}
                onChange={(e) => handleScoreChange(registration.student_id, parseFloat(e.target.value))}
              />
            </span>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Row>
        <Col>
          <button className='btn btn-primary' onClick={handleSubmit}>Save</button>
        </Col>
      </Row>
      <Table striped bordered hover size='sm'>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Class</th>
            <th>Assessment</th>
            <th>Assessment Type</th>
            <th>Subject</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {score_sheets.map((scoreSheet: any) => (
            <tr key={scoreSheet.id}>
              <td>{scoreSheet.student_name}</td>
              <td>{scoreSheet.class_group_name}</td>
              <td>{scoreSheet.assessment_name}</td>
              <td>{scoreSheet.category}</td>
              <td>{scoreSheet.subject_name}</td>
              <td>{scoreSheet.student_score}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default ScoreSheetCard
