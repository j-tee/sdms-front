import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Button, Col, Dropdown, DropdownButton, Form, ListGroup, Row, Table } from 'react-bootstrap';
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
import ScoreSheetEditModal from './ScoreSheetEditModal';
import ScoreSheetDetailsModal from './ScoreSheetDetailsModal';
import ScoreSheetDeleteModal from './ScoreSheetDeleteModal';

type AnyType = {
  [key: string]: string;
};

const ScoreSheetCard = ({ schoolId, branchId, index }: any) => {
  const { academic_term } = useSelector((state: RootState) => state.calendar);
  const { assessments } = useSelector((state: RootState) => state.assessment);
  const { students } = useSelector((state: RootState) => state.studentReg);
  const { score_sheets, pagination } = useSelector((state: RootState) => state.scoreSheet);
  // const [searchText, setSearchText] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext)
  const [scores, setScores] = useState<ScoreSheet[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [scoreSheet, setScoreSheet] = useState<ScoreSheet | null>(null);
  const [assessment, setAssessment] = useState<AssessmentViewModel>({
    id: 0,
    academic_term_name: '',
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
    setParams((prevData) => ({ ...prevData, [field]: isNaN(Number(value)) ? value : parseInt(value, 10) }));

    const updatedParams = { ...params, [field]: isNaN(Number(value)) ? value : parseInt(value, 10), paginate: false };

    switch (field) {
      case 'search_text':
        dispatch(getRegisteredStudentsForRecordingScores(updatedParams));
        dispatch(getScoreSheets({ ...updatedParams, paginate: true }));
        break;
      case 'staff_id':
        dispatch(getAssessmentTypes(updatedParams));
        dispatch(getStaffClassGroups({ ...updatedParams, staff_id: parseInt(value), academic_term_id: academic_term.id }));
        dispatch(getStaffSubjectList({ ...updatedParams, staff_id: parseInt(value), academic_term_id: academic_term.id }));
        dispatch(getScoreSheets({ ...updatedParams, paginate: true }));
        break;
      case 'assessment_type_id':
        dispatch(getStaffSubjectList({ ...updatedParams, academic_term_id: academic_term.id }));
        dispatch(getNotConductedAssessments({ ...updatedParams, paginate: false, academic_term_id: academic_term.id }));
        dispatch(getScoreSheets({ ...updatedParams, paginate: true }));
        break;
      case 'subject_id':
        dispatch(getNotConductedAssessments({ ...updatedParams, paginate: false, academic_term_id: academic_term.id }));
        dispatch(getScoreSheets({ ...updatedParams, paginate: true }));
        dispatch(getRegisteredStudentsForRecordingScores({ ...updatedParams }));
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

  const handleRemarksChange = (studentId: number, newRemarks: string) => {
    setScores((prevScores) =>
      prevScores.map((score) =>
        score.student_id === studentId ? { ...score, remarks: newRemarks } : score
      )
    );
  }

  const getScoreForStudent = (studentId: number): number =>
    scores.find((s) => s.student_id === studentId)?.score || 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedData = {
      student_scores: {
        score_sheet: scores.map((score) => ({
          student_id: score.student_id,
          score: score.score,
          assessment_id: score.assessment_id,
          remarks: score.remarks
        }))
      }
    };
    dispatch(addScoreSheet(formattedData)).then((res: any) => {
      dispatch(getScoreSheets({ ...params, paginate: true }));
      dispatch(getNotConductedAssessments({ ...params, paginate: false, academic_term_id: academic_term.id }));
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

  // useEffect(() => {
  //   setParams((prevParams) => ({
  //     ...prevParams,
  //     search_text: searchText,
  //   }));
  // }, [params]);

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

  const handleEditModalOpen = (scoreSheet: ScoreSheet) => {
    setScoreSheet(scoreSheet);
    setEditModalOpen(true);
  }

  const handleDetailsModalOpen = (scoreSheet: ScoreSheet) => {
    setScoreSheet(scoreSheet);
    setDetailsModalOpen(true);
  }

  const handleDeleteModalOpen = (scoreSheet: ScoreSheet) => {
    setScoreSheet(scoreSheet);
    setDeleteModalOpen(true);
  }
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
    <div>
      <Form onSubmit={handleSubmit}>
        {/* First Row */}
        <Row className="g-2"> {/* Adds spacing between columns */}
          <Col xs={12} md={4}>
            <StaffDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} value={undefined} />
          </Col>
          <Col xs={12} md={4}>
            <StaffClassGroupDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} />
          </Col>
          <Col xs={12} md={4}>
            <AssessmentTypeDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} />
          </Col>
        </Row>

        {/* Second Row */}
        <Row className="g-2">
          <Col xs={12} md={6}>
            <StaffSubjectDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} staffId={0} />
          </Col>
          <Col xs={12} md={6}>
            <AssessmentDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} />
          </Col>
        </Row>
      </Form>

      {assessment.assessment_name && (
        <div className="py-4 text-muted">
          <h5>Assessment: {assessment.assessment_name}</h5>
          <h5>Subject: {assessment.subject_name}</h5>
          <h5>Base Mark: {assessment.base_mark}</h5>
        </div>
      )}
      <Form className="search-form mt-4 mb-4">
        <Form.Control
          type="text"
          placeholder="🔍 Search student by Id, first name or last name"
          // value={searchText}
          onKeyUp={(e) => handleInputChange('search_text', (e.target as HTMLInputElement).value)}
          className="search-input"
        />
      </Form>

      <ListGroup variant="flush">
        {students.map((student: any) => (
          <ListGroup.Item
            key={student.id}
            className="border rounded bg-light d-flex flex-wrap align-items-center mb-4 gap-2 pt-2 pb-3"
          >
            {/* Student Name */}
            <div className="flex-grow-1">
              <Button
                variant="link"
                className="text-decoration-none fw-bold text-dark text-start"
                onClick={() => handleLinkClick(student)}
                style={{ padding: "0", margin: "0", whiteSpace: "nowrap" }}
              >
                {student.student_id} {student.last_name} {student.first_name}
              </Button>
            </div>

            <Form.Control
              type="number"
              className="form-control-sm text-center border-primary score-input"
              placeholder="Enter score"
              value={getScoreForStudent(student.id)}
              onChange={(e) => handleScoreChange(student.id, parseFloat(e.target.value))}
            />

            {/* Remarks Input - Takes Remaining Space */}
            <Form.Control
              type="text"
              className="form-control-sm border-secondary flex-grow-1"
              placeholder="Enter remarks"
              value={scores.find((s) => s.student_id === student.id)?.remarks || ""}
              onChange={(e) => handleRemarksChange(student.id, e.target.value)}
            />
          </ListGroup.Item>
        ))}
      </ListGroup>

      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Save
      </button>
      <Table striped bordered hover size="sm" className="mt-4">
        <thead>
          <tr>
            <th>Student Name</th>
            {/* <th>Class</th> */}
            <th>Assessment</th>
            {/* <th>Assessment Type</th> */}
            <th>Subject</th>
            <th>Score</th>
            <th>Remarks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {score_sheets.map((scoreSheet: any) => (
            <tr key={scoreSheet.id}>
              <td>{scoreSheet.student_name}</td>
              {/* <td>{scoreSheet.class_group_name}</td> */}
              <td>{scoreSheet.assessment_id} {scoreSheet.assessment_name}</td>
              {/* <td>{scoreSheet.category}</td> */}
              <td>{scoreSheet.subject_name}</td>
              <td>{scoreSheet.student_score}</td>
              <td>{scoreSheet.remarks}</td>
              <td>
                <Button variant="link" onClick={() => handleEditModalOpen(scoreSheet)} className="text-primary" size="sm">
                  Edit
                </Button>
                <Button variant="link" onClick={() => handleDetailsModalOpen(scoreSheet)} className="text-info" size="sm">
                  Details
                </Button>
                <Button variant="link" onClick={() => handleDeleteModalOpen(scoreSheet)} className="text-danger" size="sm">
                  Delete
                </Button>
              </td>
            </tr>
          ))}
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
          <Dropdown.Item onClick={() => handleItemsPerPageChange(50)}>50</Dropdown.Item>
        </DropdownButton>
      </div>
      <ScoreSheetEditModal
        isOpen={editModalOpen}
        params={params}
        schoolId={schoolId}
        branchId={branchId}
        setEditModalOpen={setEditModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        scoreSheet={scoreSheet}
      />
      <ScoreSheetDetailsModal
        isOpen={detailsModalOpen}
        params={params}
        schoolId={schoolId}
        branchId={branchId}
        setDetailsModalOpen={setDetailsModalOpen}
        onRequestClose={() => setDetailsModalOpen(false)}
        scoreSheet={scoreSheet}
      />
      <ScoreSheetDeleteModal
        isOpen={deleteModalOpen}
        params={params}
        schoolId={schoolId}
        branchId={branchId}
        setDeleteModalOpen={setDeleteModalOpen}
        onRequestClose={() => setDeleteModalOpen(false)}
        scoreSheet={scoreSheet}
      />
    </div>
  );
};

export default ScoreSheetCard;
