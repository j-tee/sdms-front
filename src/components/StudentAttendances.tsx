import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { getAttendances } from '../redux/slices/attendanceSlice'
import { Dropdown, DropdownButton, Table } from 'react-bootstrap'
import { formatDate } from '../models/utilities'
import PaginationComponent from './PaginationComponent'

const StudentAttendances = (props: any) => {
  const { params, index } = props
  const { attendances, pagination } = useSelector((state: RootState) => state.attendance)
  const dispatch = useDispatch<AppDispatch>()
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(5);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
   
  };

  const handleItemsPerPageChange = (perPage: number) => {
    setItemsPerPage(perPage);   
  };
  useEffect(() => {
    if (index === 'second' && (params && params.student_id)) {
      dispatch(getAttendances({ ...params, pagination:{page: currentPage,
        per_page: itemsPerPage}, paginate: true }))
    }
  }, [currentPage, dispatch, index, itemsPerPage, params])
  return (
    <>
      <Table striped size='sm' responsive>
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
          {attendances && attendances.map((attd) => (
            <tr key={attd.id}>
              <td>{attd.day_of_week}</td>
              <td>{attd.lesson_name}</td>
              <td>{new Date(attd.start_time).toLocaleTimeString()}</td>
              <td>{new Date(attd.end_time).toLocaleTimeString()}</td>
              <td>{attd.status === 'present'?'Present':'Absent'}</td>
              <td>{formatDate(attd.attendance_date)}</td>
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
    </>
  )
}

export default StudentAttendances