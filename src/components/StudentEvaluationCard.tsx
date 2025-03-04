import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentTerminalReport } from '../redux/slices/scoreSheetSlice';
import { Table } from 'react-bootstrap';
import { getStudentRecentSubscription } from '../redux/slices/subscriptionSlice';

const StudentEvaluationCard = (props: any) => {
  const { tabIndex,class_group, student, params} = props;
  const {valid, subscription} = useSelector((state: RootState) => state.subscription)
  const { student_reports } = useSelector((state: RootState) => state.scoreSheet)
  const dispatch = useDispatch<AppDispatch>();
  

  useEffect(() => {
    dispatch(getStudentRecentSubscription({ student_id: student.id }));
}, [dispatch, student]);


  useEffect(() => {
    if (params.academic_year_id && params.academic_term_id && class_group && tabIndex === 'fourth') {
      dispatch(getStudentTerminalReport({
        academic_term_id: params.academic_term_id,
        class_group_id: class_group.id,
        student_id: student.id,
      }));
    }
  }, [dispatch, student, class_group, tabIndex, params]);

  
  return (
    <>
     {(subscription && subscription.valid_subscription) ? (<>{student_reports && student_reports.map((report: any) => (
        <div key={report.student_id}>
          <span>
            <h4>ID Number: {report.student.student_id}</h4>
            <h4>Name: {report.student.first_name} {report.student.last_name}</h4>
            <h4>Position In Class: {report.over_all_position}</h4>
            <h5>{report.branch.school_name}</h5>
          </span>
          <Table size='sm' striped borderless hover>
            <thead>
              <tr style={{ borderBottom: '3px solid black' }}>
                <th>Subject</th>
                <th>SBA Score</th>
                <th>TA Score</th>
                <th>Total</th>
                <th>Grade</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {report.reports.map((report: any) => (
                <tr key={report.id}>
                  <td>{report.subject_name}</td>
                  <td>{parseFloat(report.ca_score.toString()).toFixed(2)}</td>
                  <td>{parseFloat(report.ta_score.toString()).toFixed(2)}</td>
                  <td>{parseFloat(report.total.toString()).toFixed(2)}</td>
                  <td>{report.grade}</td>
                  <td>{report.remark}</td>
                </tr>
              ))}
              <tr style={{ borderTop: '3px solid black' }}>
                <td colSpan={3}>Total</td>
                <td>{parseFloat(report.over_all_total.toString()).toFixed(2)}</td>
                <td colSpan={2}></td>
              </tr>
            </tbody>
          </Table>
        </div>
      ))}</>) : (<div>Your subscription has expired! < br /> Expiry Date: {new Date(subscription && subscription.exp_date).toDateString()}</div>)}
    </>
  )
}

export default StudentEvaluationCard