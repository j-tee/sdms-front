import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { getAttendances } from "../redux/slices/attendanceSlice";
import {
  Col,
  Collapse,
  Dropdown,
  DropdownButton,
  Form,
  Row,
  Table,
} from "react-bootstrap";
import { formatDate } from "../models/utilities";
import PaginationComponent from "./PaginationComponent";
import AcademicYearDropDown from "./AcademicYearDropDown";
import AcademicTermDropDown from "./AcademicTermDropDown";
import { Class } from "@mui/icons-material";
import ClassGroupDropDown from "./ClassGroupDropDown";
import StudentClassGroupDropDown from "./StudentClassGroupDropDown";
import StudentAcademicTermDropDown from "./StudentAcademicTermDropDown";
import StudentAcademicYearDropDown from "./StudentAcademicYearDropDown";
import { set } from "lodash";
import StudentSubjectDropDown from "./StudentSubjectDropDown";

const StudentAttendances = (props: any) => {
  const { params, index } = props;
  const {
    attendances,
    attendances_pagination,
    attendees_pagination: pagination,
  } = useSelector((state: RootState) => state.attendance);
  const dispatch = useDispatch<AppDispatch>();
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);
  const [label, setLabel] = React.useState("Check Attendance");
  const [updatedParams, setUpdatedDateParams] = React.useState({
    from_date: "",
    to_date: "",
  });

  const handlePageChange = (page: number) => {
    console.log("page===>", page, currentPage);
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (perPage: number) => {
    setItemsPerPage(perPage);
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    if (name !== "status") {
      setUpdatedDateParams((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      e.target.checked ? setLabel("Present") : setLabel("Absent");
      setUpdatedDateParams((prevData) => ({
        ...prevData,
        [name]: e.target.checked ? "present" : "absent",
      }));
    }
  };
  useEffect(() => {
    setLabel("Check Attendance");
  }, []);
  // useEffect(() => {
  //   if (index === "second" && params && params.student_id) {
  //     dispatch(
  //       getAttendances({
  //         ...params,
  //         ...updatedParams,
  //         pagination: { page: currentPage, per_page: itemsPerPage },
  //         paginate: true,
  //       })
  //     );
  //   }
  // }, [updatedParams]);

  useEffect(() => {
    if (index === "second" && params && params.student_id) {
      console.log("handlePageChange===>", params);
      dispatch(
        getAttendances({
          ...params,
          ...updatedParams,
          pagination: { current_page: currentPage, per_page: itemsPerPage },
          paginate: true,
        })
      );
    }
  }, [currentPage, updatedParams, dispatch, index, itemsPerPage, params]);

  return (
    <>
      <Row>
        <Col md={3}>
          <StudentSubjectDropDown
            onChange={(field: string | number, value: string) =>
              handleInputChange({
                target: { name: field.toString(), value },
              } as React.ChangeEvent<any>)
            }
            params={params}
            index={index}
          />
        </Col>
        <Col md={3}>
          <label htmlFor="dateFrom">From</label>
          <input
            type="date"
            className="form-control"
            placeholder="Date From"
            name="from_date"
            onChange={handleInputChange}
          />
        </Col>
        <Col md={3}>
          <label htmlFor="dateFrom">To</label>
          <input
            type="date"
            className="form-control"
            placeholder="Date To"
            name="to_date"
            onChange={handleInputChange}
          />
        </Col>
        <Col md={3} className="pt-4">
          <Form.Check
            className="mt-3"
            type="switch"
            label={label}
            id="custom-switch"
            name="status"
            onChange={handleInputChange}
          />
        </Col>
      </Row>
      <Table striped size="sm" responsive>
        <thead>
          <tr>
            <th>Day Of Week</th>
            <th>Subject</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Attendance</th>
            <th>Attendance Date</th>
          </tr>
        </thead>
        <tbody>
          {attendances &&
            attendances.map((attd) => (
              <tr key={attd.id}>
                <td>{attd.day_of_week}</td>
                <td>{attd.lesson_name}</td>
                <td>{new Date(attd.start_time).toLocaleTimeString()}</td>
                <td>{new Date(attd.end_time).toLocaleTimeString()}</td>
                <td>{attd.status === "present" ? "Present" : "Absent"}</td>
                <td>{formatDate(attd.attendance_date)}</td>
              </tr>
            ))}
        </tbody>
      </Table>
      <div className="d-flex flex-column flex-md-row px-2 justify-content-between align-items-center">
        <PaginationComponent
          params={params}
          activePage={attendances_pagination?.current_page}
          itemsCountPerPage={attendances_pagination?.per_page}
          totalItemsCount={attendances_pagination?.total_items || 0}
          pageRangeDisplayed={5}
          totalPages={attendances_pagination?.total_pages}
          hideDisabled={attendances_pagination?.total_pages === 0}
          hideNavigation={attendances_pagination?.total_pages === 1}
          onChange={handlePageChange}
        />
        <DropdownButton
          className="mt-2 mt-md-0 mb-2"
          id="dropdown-items-per-page"
          title={`Items per page: ${attendances_pagination?.per_page}`}
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
          <Dropdown.Item onClick={() => handleItemsPerPageChange(50)}>
            50
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(100)}>
            100
          </Dropdown.Item>
        </DropdownButton>
      </div>
    </>
  );
};

export default StudentAttendances;
