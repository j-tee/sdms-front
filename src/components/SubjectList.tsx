import React, { useEffect, useState } from 'react'
import SubjectDetails from './SubjectDetails';
import { Subject, SubjectParams, SubjectViewModel } from '../models/subject';
import PaginationComponent from './PaginationComponent';
import { Button, Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { AppDispatch, RootState } from '../redux/store';
import { getSubjects } from '../redux/slices/subjectSlice';
import { useDispatch, useSelector } from 'react-redux';
import { tab } from '@testing-library/user-event/dist/tab';
import SubjectEditModal from './SubjectEditModal';
import SubjectDeleteModal from './SubjectDeleteModal';

const SubjectList = (props: any) => {
  const { schoolId, branchId, subjects, tabKey } = props;
  const { pagination } = useSelector((state: RootState) => state.subject);
  const [subject, setSubject] = useState<Subject>({} as Subject);
  const [subjectId, setSubjectId] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const [isSubjectEditModalOpen, setSubjectEditModalOpen] = useState(false);
  const [isSubjectDeleteModalOpen, setSubjectDeleteModalOpen] = useState(false);
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

  const handleEdit = (subject: Subject) => {
    setSubject(subject);
    setSubjectEditModalOpen(true);
  }

  const handleDelete = (subjectId: number) => {
    setSubjectId(subjectId);
    setSubjectDeleteModalOpen(true);
  }

  useEffect(() => {
    if (tabKey === 'subject') {
      dispatch(getSubjects({ ...params, school_id: schoolId, branch_id: branchId }))
    }
  }, [params, tabKey, dispatch, schoolId, branchId]);
  return (
    <div>
      <Table size='sm' striped hover responsive>
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Subject Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects && subjects.map((subject: SubjectViewModel, index: number) => (
            <tr key={index}>
              <td>{subject.subject_name}</td>
              <td>{subject.subject_code}</td>
              <td>
  <Button className="me-2" onClick={() => handleEdit(subject)}>
    <i className="fa fa-edit" aria-hidden="true"> Edit</i>
  </Button>
  <Button className="me-2" variant="danger" onClick={() => handleDelete(subject.id)}>
    <i className="fa fa-trash" aria-hidden="true"> Delete</i>
  </Button>
  {/* Uncomment if needed */}
  {/* <Button onClick={() => handleDetails(term)}>
    <i className="fa fa-info-circle" aria-hidden="true"> Details</i>
  </Button> */}
</td>

            </tr>
          ))}
        </tbody>

      </Table>
      {/* {subjects && subjects.map((subject: SubjectViewModel, index: number) => (
        <SubjectDetails key={index} subject={subject} />
      ))} */}
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
      <SubjectEditModal
        schoolId={schoolId} branchId={branchId} subject={subject}
        params={params}
        isOpen={isSubjectEditModalOpen}
        setSubjectEditModalOpen={setSubjectEditModalOpen}
        onRequestClose={() => setSubjectEditModalOpen(false)}
      />
      <SubjectDeleteModal
        schoolId={schoolId} branchId={branchId} subjectId={subjectId}
        params={params}
        isOpen={isSubjectDeleteModalOpen}
        setSubjectDeleteModalOpen={setSubjectDeleteModalOpen}
        onRequestClose={() => setSubjectDeleteModalOpen(false)} 
      />
    </div>
  )
}

export default SubjectList
