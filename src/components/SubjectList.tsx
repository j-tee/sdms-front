import React, { useEffect, useState } from "react";
import SubjectDetails from "./SubjectDetails";
import { Subject, SubjectParams, SubjectViewModel } from "../models/subject";
import PaginationComponent from "./PaginationComponent";
import { Button, Dropdown, DropdownButton, Table } from "react-bootstrap";
import { AppDispatch, RootState } from "../redux/store";
import { getSubjects } from "../redux/slices/subjectSlice";
import { useDispatch, useSelector } from "react-redux";
import { tab } from "@testing-library/user-event/dist/tab";
import SubjectEditModal from "./SubjectEditModal";
import SubjectDeleteModal from "./SubjectDeleteModal";

const SubjectList = (props: any) => {
  const { schoolId, branchId, subjects, tabKey } = props;
  const { pagination } = useSelector((state: RootState) => state.subject);
  const [subject, setSubject] = useState<Subject>({} as Subject);
  const [subjectId, setSubjectId] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const [isSubjectEditModalOpen, setSubjectEditModalOpen] = useState(false);
  const [isSubjectDeleteModalOpen, setSubjectDeleteModalOpen] = useState(false);
  const [params, setParams] = useState<SubjectParams>({
    school_id: schoolId,
    branch_id: branchId,
    pagination: { current_page: 1, per_page: 10 },
    paginate: true,
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
  };

  const handleDelete = (subjectId: number) => {
    setSubjectId(subjectId);
    setSubjectDeleteModalOpen(true);
  };

  useEffect(() => {
    if (tabKey === "subject") {
      dispatch(
        getSubjects({ ...params, school_id: schoolId, branch_id: branchId })
      );
    }
  }, [params, tabKey, dispatch, schoolId, branchId]);
  return (
    <div>
      <div className="academic-table-wrapper">
        <Table responsive className="academic-table-modern">
          <thead>
            <tr>
              <th>
                <i className="fas fa-book me-2"></i>
                Subject Name
              </th>
              <th>
                <i className="fas fa-code me-2"></i>
                Subject Code
              </th>
              <th className="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects &&
              subjects.map((subject: SubjectViewModel, index: number) => (
                <tr key={index}>
                  <td className="subject-name-cell">
                    <div className="subject-badge">{subject.subject_name}</div>
                  </td>
                  <td>
                    <span className="subject-code-badge">{subject.subject_code}</span>
                  </td>
                  <td className="actions-cell">
                    <div className="table-action-buttons">
                      <button className="table-action-btn edit-btn-table" onClick={() => handleEdit(subject)}>
                        <i className="fa fa-edit"></i>
                        <span>Edit</span>
                      </button>
                      <button
                        className="table-action-btn delete-btn-table"
                        onClick={() => handleDelete(subject.id)}
                      >
                        <i className="fa fa-trash"></i>
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <div className="pagination-controls-modern">
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
          className="items-per-page-dropdown"
          id="dropdown-items-per-page-subjects"
          title={`Items per page: ${params.pagination?.per_page}`}
        >
          <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>
            5
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>
            10
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>
            20
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <SubjectEditModal
        schoolId={schoolId}
        branchId={branchId}
        subject={subject}
        params={params}
        isOpen={isSubjectEditModalOpen}
        setSubjectEditModalOpen={setSubjectEditModalOpen}
        onRequestClose={() => setSubjectEditModalOpen(false)}
      />
      <SubjectDeleteModal
        schoolId={schoolId}
        branchId={branchId}
        subjectId={subjectId}
        params={params}
        isOpen={isSubjectDeleteModalOpen}
        setSubjectDeleteModalOpen={setSubjectDeleteModalOpen}
        onRequestClose={() => setSubjectDeleteModalOpen(false)}
      />
    </div>
  );
};

export default SubjectList;
