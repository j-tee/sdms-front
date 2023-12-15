import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';

const StaffDetails = (props:any) => {
  const {schooId, branchId, staff} = props
  return (
    <Container className='mt-4'>
      <Card.Header className='text-center'>
        <Card.Title className='text-center'>Staff List</Card.Title>
      </Card.Header>
     <Row className='d-flex flex-column p-2 flex-lg-row border mb-2 border-left-0 border-right-0'>
      <Col md={2}> <Card.Img className='mt-2' variant="top" src={staff.image_url} style={{width:"100px", height:"100px"}}/></Col>
      <Col className='d-flex flex-column pt-2 ps-lg-2 border border-top-0 border-bottom-0 border-right-0' md={9}>
        <span>{staff.first_name}</span>
        <span>{staff.last_name}</span>
        <span>{staff.designation}</span>
        <span>{staff.email}</span>
        <span>{staff.phone_number}</span>
        <span>{staff.branch_name}</span>
      </Col>
     </Row>
    </Container>
  )
}

export default StaffDetails
