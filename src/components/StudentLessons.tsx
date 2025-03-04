import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getStudentRecentSubscription } from '../redux/slices/subscriptionSlice';
import { getStudentLessons } from '../redux/slices/lessonSlice';
import { Dropdown, DropdownButton, Form, Table } from 'react-bootstrap';
import PaginationComponent from './PaginationComponent';

const StudentLessons = (props: any) => {
  const { index, class_group, student, params } = props;
  const [itemsPerPage, setItemsPerPage] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const {valid, subscription} = useSelector((state: RootState) => state.subscription)
  const dispatch = useDispatch<AppDispatch>();
  const { lessons, pagination } = useSelector((state: RootState) => state.lesson)

  const uniqueDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    dispatch(getStudentRecentSubscription({ student_id: params.student_id }));
}, [dispatch, params]);

  useEffect(() => {
    if (params.academic_year_id && params.academic_term_id && class_group && index === 'first') {
      dispatch(getStudentLessons({...params,pagination: {
        ...params.pagination,
        per_page: itemsPerPage,
        current_page: currentPage,
      }, day_of_week: 'Monday', paginate: true }));
    }
  }, [params.academic_year_id, params.academic_term_id, class_group, index, dispatch, class_group]);
  const handleDayOfWeekChange = (e: React.ChangeEvent<any>) => {
    const dayOfWeek = e.target.value;
    dispatch(getStudentLessons({...params,pagination: {
      ...params.pagination,
      per_page: itemsPerPage,
      current_page: currentPage,
    },  day_of_week: dayOfWeek , paginate: true}));
  };
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
   
  };

  const handleItemsPerPageChange = (perPage: number) => {
    setItemsPerPage(perPage);
   
  };
  return (
    <>
      {subscription && subscription.valid_subscription ? (
        <>
        <Form.Group controlId="yearId">
        <Form.Label>Academic Years</Form.Label>
        <Form.Select as="select" onChange={handleDayOfWeekChange}>
          <option value="">-----Select Day of The Week----</option>
          {uniqueDays && uniqueDays.map((day) =>
          (<option key={day} value={day}>
            {day}
          </option>
          ))}
        </Form.Select>
      </Form.Group>
      <div>
        <Table size='sm' borderless striped hover>
          <thead>
            <tr>
              <th>Subject</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Tutor/Teacher</th>
            </tr>
          </thead>
          <tbody>
            {lessons && lessons.map((lesson) => (
              <tr key={lesson.id}>
                <td>{lesson.subject_name}</td>
                <td>{new Date(lesson.start_time).toLocaleTimeString()}</td>
                <td>{new Date(lesson.end_time).toLocaleTimeString()}</td>
                <td>{lesson.staff_name}</td>
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
      </div>
      </>) : (<>You have no active subscription! <br />
      Expiry Date: {new Date(subscription && subscription.exp_date).toDateString()}
      </>)}
    </>
  )
}

export default StudentLessons