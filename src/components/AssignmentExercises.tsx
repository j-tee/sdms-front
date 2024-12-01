import React, { useEffect, useState } from 'react'
import { Col, Dropdown, DropdownButton, Row, Tab, Table } from 'react-bootstrap'
import { Student } from '../models/student';
import StudentSubjectDropDown from './StudentSubjectDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getScoreSheets } from '../redux/slices/scoreSheetSlice';
import { getSubjects } from '../redux/slices/subjectSlice';
import AssessmentTypeDropDown from './AssessmentTypeDropDown';
import { getAssessmentTypes } from '../redux/slices/assesmentTypeSlice';
import PaginationComponent from './PaginationComponent';

type AnyType = {
  [key: string]: string;
};

const AssignmentExercises = (props: any) => {
  const { params, index } = props
  const [updatedParams, setUpdatedParams] = useState(params);
  const {score_sheets, pagination} = useSelector((state: RootState) => state.scoreSheet)
  const dispatch  = useDispatch<AppDispatch>();
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setUpdatedParams((prevData: any) => ({
      ...prevData,
      [field]: parseInt(value),
      ...params,
      paginate: true,
      pagination: {
        ...params.pagination,
        current_page: 1,
      }
    }));
  }
  const handlePageChange = (page: number) => {
    // setCurrentPage(page);
    setUpdatedParams((prevParams: { pagination: any; }) => ({
      ...prevParams,
      ...params,
      pagination: {
        ...params.pagination,
        current_page: page,
      },
    }));
  };

  const handleItemsPerPageChange = (perPage: number) => {
    // setItemsPerPage(perPage);
    setUpdatedParams((prevParams: { pagination: any; }) => ({
      ...prevParams,
      ...params,
      pagination: {
        ...params.pagination,
        per_page: perPage,
      },
    }));
  };
  useEffect(() => {
    if(index === 'second') {
      dispatch(getSubjects({ ...params }));
      if(params.student_id){
        dispatch(getScoreSheets({ ...params, paginate: true}));
      }
      dispatch(getAssessmentTypes({ branch_id: params.branch_id, school_id: params.school_id }));
    }
    
  }, [dispatch, index, params]);
  return (
    <>
      <Row>
        <Col>
          <StudentSubjectDropDown index={index} params={updatedParams} onChange={handleInputChange} />
        </Col>
        <Col>
          <AssessmentTypeDropDown schoolId={params.school_id} branchId={params.branch_id} onChange={handleInputChange} />
        </Col>
      </Row>
      <Table striped size='sm' hover>
        <thead>
          <tr>
            <th>Exercise</th>
            <th>Score</th>
            <th>Percentage</th>
            <th>Tutor/Teacher</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {score_sheets && score_sheets.map((score: any) => (
            <tr key={score.id}>
              <td>{score.assessment_name}</td>
              <td>{score.student_score}</td>
              <td>{parseFloat(score.percentage_score).toFixed(2)}%</td>
              <td>{score.staff_name}</td>
              <td>{score.staff_phone}</td>
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
            </DropdownButton>
          </div>
    </>
  )
}

export default AssignmentExercises