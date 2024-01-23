import React from 'react'
import { Col } from 'react-bootstrap';

const StaffAssessmentDetails = (props: any) => {
    const { schoolId, branchId, index, summary } = props;
  return (
    <Col>
      <h6>{summary.subject_name}</h6>
      <h6>Assessments: {summary.total}</h6>
    </Col>
  )
}

export default StaffAssessmentDetails
