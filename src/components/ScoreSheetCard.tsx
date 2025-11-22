import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Col, Dropdown, DropdownButton, Form, ListGroup, Row, Table } from 'react-bootstrap';
import StaffDropDown from './StaffDropDown';
import AssessmentTypeDropDown from './AssessmentTypeDropDown';
import AssessmentDropDown from './AssessmentDropDown';
import StaffSubjectDropDown from './StaffSubjectDropDown';
import { showToastify } from '../utility/Toastify';
import { ScoreSheet } from '../models/scoreSheet';
import { AssessmentViewModel } from '../models/assessment';
import { getAssessmentTypes } from '../redux/slices/assesmentTypeSlice';
import { getStaffSubjectList } from '../redux/slices/subjectSlice';
import { getNotConductedAssessments } from '../redux/slices/assessmentSlice';
import { getRegisteredStudentsForRecordingScores } from '../redux/slices/studentRegSlice';
import { addScoreSheet, getScoreSheets } from '../redux/slices/scoreSheetSlice';
import { getCurrentTerm } from '../redux/slices/calendarSlice';
import { getStaffs } from '../redux/slices/staffSlice';
import { getStaffClassGroups } from '../redux/slices/classGroupSlice';
import PaginationComponent from './PaginationComponent';
import StaffClassGroupDropDown from './StaffClassGroupDropDown';
import { ToastContext } from '../utility/ToastContext';

type AnyType = {
  [key: string]: string;
};

const ScoreSheetCard = ({ schoolId, branchId, index }: any) => {
  const { academic_term } = useSelector((state: RootState) => state.calendar);
  const { assessments } = useSelector((state: RootState) => state.assessment);
  const { students } = useSelector((state: RootState) => state.studentReg);
  const { score_sheets, pagination } = useSelector((state: RootState) => state.scoreSheet);

  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext)
  const [scores, setScores] = useState<ScoreSheet[]>([]);
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
  });

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
    pagination: { per_page: 10, current_page: 1, total_items: 0, total_pages: 0 },
  });

  const handleInputChange = (field: keyof AnyType, value: string) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    setParams((prevData) => ({ ...prevData, [field]: parseInt(value) }));

    const updatedParams = { ...params, [field]: parseInt(value), paginate: false };

    switch (field) {
      case 'staff_id':
        dispatch(getAssessmentTypes(updatedParams));
        dispatch(getStaffClassGroups({ ...updatedParams, staff_id: parseInt(value), academic_term_id: academic_term.id }));
        dispatch(getStaffSubjectList({ ...updatedParams, staff_id: parseInt(value), academic_term_id: academic_term.id }));
        dispatch(getScoreSheets({ ...updatedParams, paginate: true }));
        break;
      case 'assessment_type_id':
        dispatch(getStaffSubjectList({ ...updatedParams, academic_term_id: academic_term.id }));
        dispatch(getNotConductedAssessments({ ...updatedParams, paginate:false, academic_term_id: academic_term.id }));
        dispatch(getScoreSheets({ ...updatedParams, paginate: true }));
        break;
      case 'subject_id':
        dispatch(getNotConductedAssessments({ ...updatedParams, paginate:false, academic_term_id: academic_term.id }));
        dispatch(getScoreSheets({ ...updatedParams, paginate: true }));
        dispatch(getRegisteredStudentsForRecordingScores({...updatedParams}));
        break;
      case 'class_group_id':
        dispatch(getStaffSubjectList({ ...updatedParams, academic_term_id: academic_term.id }));
        dispatch(getScoreSheets({ ...updatedParams, paginate: true }));
        
        break;
      case 'assessment_id':
        const selectedAssessment = assessments.find((assmnt) => assmnt.id === parseInt(value));
        if (selectedAssessment) setAssessment({ ...assessment, ...selectedAssessment });
        dispatch(getRegisteredStudentsForRecordingScores(updatedParams));
        setScores([]);
        break;
      default:
        break;
    }
  };

  const handleScoreChange = (studentId: number, newScore: number) => {
    if (newScore > assessment.base_mark) {
      showToastify('Score cannot be greater than base mark', 'error');
      return;
    }

    setScores((prevScores) =>
      prevScores.map((score) =>
        score.student_id === studentId ? { ...score, score: newScore } : score
      )
    );
  };

  const getScoreForStudent = (studentId: number): number =>
    scores.find((s) => s.student_id === studentId)?.score || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
      student_scores: {
        score_sheet: scores.map((score) => ({
          student_id: score.student_id,
          score: score.score,
          assessment_id: score.assessment_id
        }))
      }
    };
    dispatch(addScoreSheet(formattedData)).then((res: any) => {
      dispatch(getScoreSheets({ ...params, paginate: true }));
      dispatch(getNotConductedAssessments({ ...params, paginate:false, academic_term_id: academic_term.id }));
      setShowToast(true)
      showToastify(res.payload.message, res.payload.status);
    });
  };

  useEffect(() => {
    // setParams((prev) => ({ ...prev, branch_id: branchId, academic_term_id: academic_term.id }));
    if (index === 'sc') {
      dispatch(getCurrentTerm(branchId));
      dispatch(getStaffs(params));
      dispatch(getScoreSheets({ ...params, paginate: true }));
    }
  }, [branchId, index, dispatch, academic_term.id, params]);

  useEffect(() => {
    setScores(
      students.map((student: any) => ({
        student_id: student.id,
        score: 0,
        assessment_id: params.assessment_id,
      }))
    );
  }, [students, params.assessment_id]);
  const handlePageChange = (page: number) => {
    // setCurrentPage(page);
    setParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        current_page: page,
      },
    }));
  };
  const handleLinkClick = (student: any) => {

  };

  const handleItemsPerPageChange = (perPage: number) => {
    // setItemsPerPage(perPage);
    setParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        per_page: perPage,
      },
    }));
  };
  return (
    <div className="academic-section-content">
      {/* Filter Section */}
      <div className="filter-card-modern mb-4">
        <div className="filter-header">
          <div className="filter-icon-wrapper">
            <i className="fas fa-filter"></i>
          </div>
          <h5>Filter Score Sheet</h5>
        </div>
        <div className="card-body">
        <Form onSubmit={handleSubmit}>
          <Row className='mb-3'>
            <Col>
              <StaffDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} value={undefined} />
            </Col>
            <Col>
              <StaffClassGroupDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} />
            </Col>
            <Col>
              <AssessmentTypeDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} />
            </Col>
          </Row>
          <Row>
            <Col>
              <StaffSubjectDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} staffId={0} />
            </Col>
            <Col>
              <AssessmentDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} />
            </Col>
          </Row>
        </Form>
        </div>
      </div>

      {/* Assessment Info Card */}
      {assessment.assessment_name && (
        <div className="assessment-info-card mb-4">
          <div className="assessment-info-header">
            <i className="fas fa-info-circle me-2"></i>
            Assessment Information
          </div>
          <div className="assessment-info-body">
            <div className="info-item">
              <i className="fas fa-clipboard-check me-2"></i>
              <strong>Assessment:</strong> {assessment.assessment_name}
            </div>
            <div className="info-item">
              <i className="fas fa-book me-2"></i>
              <strong>Subject:</strong> {assessment.subject_name}
            </div>
            <div className="info-item">
              <i className="fas fa-calculator me-2"></i>
              <strong>Base Mark:</strong> {assessment.base_mark}
            </div>
          </div>
        </div>
      )}

      {/* Student Score Input */}
      {students && students.length > 0 && (
        <div className="score-input-section mb-4">
          <div className="academic-section-header">
            <div className="academic-section-icon">
              <i className="fas fa-edit"></i>
            </div>
            <h5>Enter Student Scores</h5>
          </div>
          <ListGroup className="student-score-list">
            {students.map((student: any) => (
              <ListGroup.Item key={student.id} className="student-score-item">
                <span className="student-name-label">
                  <i className="fas fa-user-graduate me-2"></i>
                  {student.last_name} {student.first_name}
                </span>
                <Form.Control
                  type="number"
                  className="score-input-control"
                  value={getScoreForStudent(student.id)}
                  onChange={(e) => handleScoreChange(student.id, parseFloat(e.target.value))}
                  placeholder="Enter score"
                />
              </ListGroup.Item>
            ))}
          </ListGroup>
          <button className="btn btn-add-academic-item mt-3" onClick={handleSubmit}>
            <i className="fas fa-save me-2"></i>
            Save Scores
          </button>
        </div>
      )}

      {/* Score Sheet Table */}
      <div className="academic-table-wrapper">
        <div className="academic-section-header">
          <div className="academic-section-icon">
            <i className="fas fa-file-alt"></i>
          </div>
          <h5>Score Sheet Records</h5>
        </div>
        <Table className="academic-table-modern" size="sm">
          <thead>
            <tr>
              <th><i className="fas fa-user me-2"></i>Student Name</th>
              <th><i className="fas fa-users me-2"></i>Class</th>
              <th><i className="fas fa-tasks me-2"></i>Assessment</th>
              <th><i className="fas fa-clipboard-list me-2"></i>Type</th>
              <th><i className="fas fa-book me-2"></i>Subject</th>
              <th><i className="fas fa-chart-bar me-2"></i>Score</th>
            </tr>
          </thead>
          <tbody>
            {score_sheets && score_sheets.length > 0 ? (
              score_sheets.map((scoreSheet: any) => (
                <tr key={scoreSheet.id}>
                  <td>
                    <span className="student-name-label">
                      <i className="fas fa-user-graduate me-2"></i>
                      {scoreSheet.student_name}
                    </span>
                  </td>
                  <td>
                    <span className="class-badge">
                      <i className="fas fa-users me-1"></i>
                      {scoreSheet.class_group_name}
                    </span>
                  </td>
                  <td>
                    <span className="assessment-name-badge">
                      <i className="fas fa-file-alt me-2"></i>
                      {scoreSheet.assessment_name}
                    </span>
                  </td>
                  <td>
                    <span className={`assessment-category-badge ${scoreSheet.category === 'CA' ? 'ca-badge' : 'ta-badge'}`}>
                      {scoreSheet.category}
                    </span>
                  </td>
                  <td>
                    <div className="subject-badge">
                      <i className="fas fa-book me-2"></i>
                      {scoreSheet.subject_name}
                    </div>
                  </td>
                  <td>
                    <span className="score-badge">
                      <i className="fas fa-star me-1"></i>
                      {scoreSheet.student_score}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6}>
                  <div className="empty-state">
                    <i className="fas fa-file-alt fa-3x mb-3"></i>
                    <p>No score sheet records found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      <div className="d-flex flex-column flex-md-row px-2 justify-content-between align-items-center">
        <PaginationComponent
          params={params}
          activePage={pagination?.current_page}
          itemsCountPerPage={pagination?.per_page}
          totalItemsCount={pagination?.total_items || 0}
          pageRangeDisplayed={5}
          totalPages={pagination?.total_pages}
          hideDisabled={pagination?.total_pages === 0}
          hideNavigation={pagination?.total_pages === 1}
          onChange={handlePageChange}
        />
        <DropdownButton
          className="mt-2 mt-md-0 mb-2"
          id="dropdown-items-per-page"
          title={`Items per page: ${params.pagination?.per_page}`}
        >
          <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
        </DropdownButton>
      </div>
      </div>
    </div>
  );
};

export default ScoreSheetCard;
