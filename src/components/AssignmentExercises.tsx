import React, { useContext, useEffect, useState } from 'react'
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
import StudentScoreSheet from './StudentScoreSheet';
import { current } from '@reduxjs/toolkit';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';

type AnyType = {
  [key: string]: string;
};

const AssignmentExercises = (props: any) => {
  const { params, index } = props
  const [updatedParams, setUpdatedParams] = useState(params);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const {setShowToast} = useContext(ToastContext);
  const { score_sheets, pagination } = useSelector((state: RootState) => state.scoreSheet)
  const dispatch = useDispatch<AppDispatch>();
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
    setCurrentPage(page);
    // setUpdatedParams((prevParams: { pagination: any; }) => ({
    //   ...prevParams,
    //   ...params,
    //   pagination: {
    //     ...params.pagination,
    //     current_page: page,
    //   },
    // }));
  };

  const handleItemsPerPageChange = (perPage: number) => {
    setItemsPerPage(perPage);
    setCurrentPage(1);
    // setUpdatedParams((prevParams: { pagination: any; }) => ({
    //   ...prevParams,
    //   ...params,
    //   pagination: {
    //     ...params.pagination,
    //     // current_page: 1,
    //     per_page: perPage,
    //   },
    // }));
  };
  useEffect(() => {
    setShowToast(true);
    if (index === 'second') {
      dispatch(getSubjects({ ...params, paginate: false  })); // get subjects
      if (params.student_id) {
        dispatch(getScoreSheets({ ...params, pagination: { current_page:currentPage, per_page:itemsPerPage}, paginate: true })).then((res: any) => {
          showToastify(res.payload.message, res.payload.status);
        });
      }
      dispatch(getAssessmentTypes({ branch_id: params.branch_id, school_id: params.school_id }));
    }

  }, [dispatch, index, params, itemsPerPage, currentPage]);
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

      {score_sheets && score_sheets.map((score: any) => (
        <StudentScoreSheet score={score} />
      ))}

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
          title={`Items per page: ${pagination?.per_page}`}
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