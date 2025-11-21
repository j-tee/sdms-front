import React, { useContext, useEffect, useState } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getCountries, getStudents } from "../redux/slices/studentSlice";
import { StudentParams, StudentViewModel } from "../models/student";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Table,
} from "react-bootstrap";
import PaginationComponent from "./PaginationComponent";
import { showToastify } from "../utility/Toastify";
import { ToastContext } from "../utility/ToastContext";
import StudentEditModal from "./StudentEditModal";
import '../css/StudentList.css';

const StudentListCard = (props: any) => {
  const { tabIndex, schoolId, branchId } = props;
  const { setShowToast } = useContext(ToastContext);
	const [isEditModalOpen, setEditModalOpen] = useState(false);
	const [student, setStudent] = useState<StudentViewModel | null>(null);
  const { students, pagination } = useSelector(
    (state: RootState) => state.student
  );
  const dispatch = useDispatch<AppDispatch>();
  const [params, setParams] = useState<StudentParams>({
    school_id: schoolId,
    branch_id: branchId,
    parent_id: 0,
    stage_id: 0,
    classgroup_id: 0,
    subject_id: 0,
    admission_id: 0,
    academic_year_id: 0,
    academic_term_id: 0,
    pagination: {
      current_page: 1,
      per_page: 10,
      total_items: 0,
      total_pages: 0,
    },
    paginate: true,
  });

  useEffect(() => {
    if (tabIndex === "fourth") {
			dispatch(getCountries());
      dispatch(getStudents({ ...params, paginate: true })).then(
        (result: any) => {
          setShowToast(true);
          showToastify(result.payload.message, result.payload.status);
        }
      );
    }
  }, [tabIndex, schoolId, branchId, params, dispatch]);
  function handlePageChange(page: number): void {
    setParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        current_page: page,
      },
    }));
  }

  function handleItemsPerPageChange(itemsPerPage: number): void {
    setParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        per_page: itemsPerPage,
        current_page: 1,
      },
    }));
  }

  function handleEdit(student: StudentViewModel): void {
		setStudent(student);
		setEditModalOpen(true);
  }

  function handleDelete(student: StudentViewModel): void {
    throw new Error("Function not implemented.");
  }

  function handleView(student: StudentViewModel): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div className="student-list-header">
        <h1 className="student-list-title">
          <i className="fas fa-user-graduate"></i>
          Student List
        </h1>
        {pagination && pagination.total_items && pagination.total_items > 0 && (
          <div className="student-count-badge">
            <i className="fas fa-users"></i>
            Total Students: {pagination.total_items}
          </div>
        )}
      </div>

      <div className="student-list-table-container">
        {students && students.length > 0 ? (
          <table className="student-list-table">
            <thead>
              <tr>
                <th><i className="fas fa-hashtag"></i> ID</th>
                <th><i className="fas fa-user"></i> First Name</th>
                <th><i className="fas fa-user"></i> Last Name</th>
                <th><i className="fas fa-cog"></i> Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student, index) => (
                <tr key={student.id}>
                  <td className="student-id-cell">{student.student_id}</td>
                  <td>{student.first_name}</td>
                  <td>{student.last_name}</td>
                  <td>
                    <div className="student-action-buttons">
                      <button 
                        className="student-action-btn student-action-btn-edit" 
                        onClick={() => handleEdit(student)}
                      >
                        <i className="fas fa-edit"></i>
                        Edit
                      </button>
                      <button
                        className="student-action-btn student-action-btn-delete"
                        onClick={() => handleDelete(student)}
                      >
                        <i className="fas fa-trash-alt"></i>
                        Delete
                      </button>
                      <button 
                        className="student-action-btn student-action-btn-view" 
                        onClick={() => handleView(student)}
                      >
                        <i className="fas fa-eye"></i>
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="student-list-empty">
            <div className="student-list-empty-icon">
              <i className="fas fa-user-graduate"></i>
            </div>
            <div className="student-list-empty-title">No Students Found</div>
            <div className="student-list-empty-text">
              No student records available at the moment
            </div>
          </div>
        )}
      </div>
      {students && students.length > 0 && (
        <div className="student-list-pagination">
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
            id="dropdown-items-per-page"
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
      )}
			<StudentEditModal
      params={params}
      schoolId={schoolId}
      branchId={branchId}
				isOpen={isEditModalOpen}
				onRequestClose={() => setEditModalOpen(false)}
				student={student}
				setEditModalOpen={setEditModalOpen}
			/>
    </>
  );
};

export default StudentListCard;
