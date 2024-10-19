import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getClassSubjectList } from '../redux/slices/subjectSlice';
import { getStudentRecentSubscription } from '../redux/slices/subscriptionSlice';

const StudentSubjectCard = (props: any) => {
  const { subject_list } = useSelector((state: RootState) => state.subject)
  const { class_group,student, params, index } = props;
  const {valid, subscription} = useSelector((state: RootState) => state.subscription)
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getStudentRecentSubscription({ student_id: student.id }));
}, [dispatch, student]);

  useEffect(() => {
    if (params.academic_year_id && params.academic_term_id && class_group && index === 'first') {
      dispatch(getClassSubjectList({ ...params, class_group_id: class_group.id }));
    }
  }, [class_group, dispatch, params, index])

  return (
    <>
      {subscription && subscription.valid_subscription ? (
        <>
          <Row>
            <Col>
              <h3>{class_group && class_group.class_grp_name} - Subjects</h3>
            </Col>
          </Row>
          <Row>
            {subject_list && subject_list.map((subject) => (
              <Col key={subject} md={3}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{subject}</h5>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <div>Your subscription has expired! < br /> Expiry Date: {new Date(subscription && subscription.exp_date).toDateString()}</div>
      )}
    </>
  );

}

export default StudentSubjectCard