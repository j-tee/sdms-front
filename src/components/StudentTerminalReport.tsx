import React, { useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getTerminalReport } from '../redux/slices/scoreSheetSlice';
import { Table } from 'react-bootstrap';

const StudentTerminalReport = (props: any) => {
  const { schoolId, branchId, index } = props;
  const { student_reports } = useSelector((state: RootState) => state.scoreSheet)
  const { academic_term } = useSelector((state: RootState) => state.calendar)
  const dispatch = useDispatch<AppDispatch>()
  const [params, setParams] = useState({
    program_id: 0,
    branch_id: branchId,
    school_id: schoolId,
    assessment_type_id: 0,
    class_group_id: 0,
    subject_id: 0,
    academic_term_id: academic_term.id,
    student_id: 0,
    pagination: {
      per_page: 10,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })
  useEffect(() => {
    setParams((prevState) => ({
      ...prevState,
      branch_id: branchId,
      school_id: schoolId,
      academic_term_id: academic_term.id
    }))
  }, [branchId, schoolId, academic_term.id])

  useEffect(() => {
    if (index === 'tr') {
      dispatch(getTerminalReport({ ...params }))
    }

  }, [params, dispatch, index])
  return (
    <div>
      {student_reports.map((report: any) => (
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
                <th>CA Score</th>
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
      ))}
    </div>
  )
}

export default StudentTerminalReport
