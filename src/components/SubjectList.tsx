import React, { useEffect, useState } from 'react'
import SubjectDetails from './SubjectDetails';
import { SubjectParams, SubjectViewModel } from '../models/subject';
import PaginationComponent from './PaginationComponent';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { AppDispatch, RootState } from '../redux/store';
import { getSubjects } from '../redux/slices/subjectSlice';
import { useDispatch, useSelector } from 'react-redux';

const SubjectList = (props: any) => {
  const { schoolId, branchId, subjects } = props;
  const {pagination} = useSelector((state: RootState) => state.subject);
  const dispatch = useDispatch<AppDispatch>();
  const [params, setParams] = useState<SubjectParams>({
    school_id: schoolId, branch_id: branchId, pagination: { current_page: 1, per_page: 10 }, paginate: true
  } as SubjectParams);
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

  const handleItemsPerPageChange = (perPage: number) => {
    // setItemsPerPage(perPage);
    setParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        current_page: 1,
        per_page: perPage,
      },
    }));
  };

  useEffect(() => {
    dispatch(getSubjects({...params, branch_id: branchId, school_id: schoolId}))
  }, [params]);
  return (
    <div>
      {subjects && subjects.map((subject: SubjectViewModel, index: number) => (
        <SubjectDetails key={index} subject={subject} />
      ))}
      <div className="d-flex px-2 flex-column flex-lg-row justify-content-between align-items-center">
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
        <DropdownButton className="mb-2" id="dropdown-items-per-page" title={`Items per page: ${params.pagination?.per_page}`}>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  )
}

export default SubjectList
