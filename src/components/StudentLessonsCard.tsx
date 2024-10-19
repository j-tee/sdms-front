import React, { useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getStudentLessons } from '../redux/slices/lessonSlice';
import { Form, Table } from 'react-bootstrap';
import { getStudentRecentSubscription } from '../redux/slices/subscriptionSlice';

const StudentLessonsCard = (props: any) => {
  const { index, class_group, student, params } = props;
  const {valid, subscription} = useSelector((state: RootState) => state.subscription)
  const dispatch = useDispatch<AppDispatch>();
  const { lessons } = useSelector((state: RootState) => state.lesson)

  const uniqueDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    dispatch(getStudentRecentSubscription({ student_id: student.id }));
}, [dispatch, student]);

  useEffect(() => {
    if (params.academic_year_id && params.academic_term_id && class_group && index === 'second') {
      dispatch(getStudentLessons({
        academic_term_id: params.academic_term_id,
        class_group_id: class_group.id,
        program_id: 0, // Default value
        day_of_week: 'Monday'
      }));
    }
  }, [params.academic_year_id, params.academic_term_id, class_group, index, dispatch, class_group]);
  const handleDayOfWeekChange = (e: React.ChangeEvent<any>) => {
    const dayOfWeek = e.target.value;
    dispatch(getStudentLessons({
      academic_term_id: params.academic_term_id,
      class_group_id: class_group.id,
      program_id: 0, // Default value
      day_of_week: dayOfWeek
    }));
  };
  return (
    <>
      {subscription.valid_subscription ? (
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
              <th>Day of Week</th>
            </tr>
          </thead>
          <tbody>
            {lessons && lessons.map((lesson) => (
              <tr key={lesson.id}>
                <td>{lesson.subject_name}</td>
                <td>{new Date(lesson.start_time).toLocaleTimeString()}</td>
                <td>{new Date(lesson.end_time).toLocaleTimeString()}</td>
                <td>{lesson.day_of_week}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      </>) : (<>You have no active subscription! <br />
      Expiry Date: {new Date(subscription.exp_date).toDateString()}
      </>)}
    </>
  )
}

export default StudentLessonsCard