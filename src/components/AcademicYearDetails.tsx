import React from 'react'
import { Col, Row } from 'react-bootstrap'

const AcademicYearDetails = (props: any) => {
    const { year } = props;
  return (
    <>
    <Row className='d-flex flex-row'>
      <Col>Start</Col>
      <Col>End</Col>
    </Row>
    <Row className='d-flex flex-row'>
      <Col>{year.start_date}</Col>
      <Col>{year.end_date}</Col>
    </Row>
    </>
  )
}

export default AcademicYearDetails
