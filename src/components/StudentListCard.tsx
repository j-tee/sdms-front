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
      <span className="fs-4 fw-bold">Student List</span>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student, index) => (
            <tr key={student.id}>
              <td>{student.student_id}</td>
              <td>{student.first_name}</td>
              <td>{student.last_name}</td>
              <td>
                <ButtonGroup className="d-flex gap-2">
                  <Button size="sm" variant="primary" onClick={() => handleEdit(student)}>
                    Edit
                  </Button>
                  <Button
                    variant="link"
										size="sm"
                    onClick={() => handleDelete(student)}
                  >
                    Delete
                  </Button>
                  <Button size="sm" variant="link" onClick={() => handleView(student)}>
                    View
                  </Button>
                </ButtonGroup>
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
