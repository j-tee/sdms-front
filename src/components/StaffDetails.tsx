import React, { useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import ManageUserAccount from './ManageUserAccount';
import StaffEdit from './StaffEdit';
import StaffDelete from '../services/StaffDelete';
import StaffInformation from './StaffInformation';

const StaffDetails = (props: any) => {
  const { schoolId, branchId, staff, params } = props
  const [isManageUserModalOpen, setManageUserModalOpen] = useState(false)
  const [isStaffEditModalOpen, setStaffEditModalOpen] = useState(false)
  const [isStaffDeleteModalOpen, setStaffDeleteModalOpen] = useState(false)
  const [isStaffDetailsModalOpen, setStaffDetailsModalOpen] = useState(false)
  const handleEdit = (staff: any) => {
    setStaffEditModalOpen(true)
  }
  const handleDelete = () => {
    setStaffDeleteModalOpen(true)
  }
  const handleDetails = () => {
    setStaffDetailsModalOpen(true)
  }
  return (
    <>
      <Row className='d-flex flex-column p-2 flex-lg-row border mb-2 border-left-0 border-right-0'>
        <Col md={2}> <Card.Img className='mt-2' variant="top" src={staff.image_url} style={{ width: "100%", height: "100%" }} /></Col>
        <Col className='d-flex flex-column pt-2 ps-lg-2 border border-top-0 border-bottom-0 border-right-0' md={9}>
          <span>{staff.first_name}</span>
          <span>{staff.last_name}</span>
          <span>{staff.designation}</span>
          <span>{staff.email}</span>
          <span>{staff.phone_number}</span>
          <span>{staff.branch_name}</span>
          <span><Button className='border border-0 p-1' variant='link' onClick={() => setManageUserModalOpen(true)}>Manage User Account</Button></span>
          <span>
            <Card.Footer className='d-flex flex-row gap-0'>
              <Card.Link onClick={() => handleEdit(staff)}>Edit</Card.Link>
              <Card.Link onClick={handleDelete}>Delete</Card.Link>
              <Card.Link onClick={handleDetails}>Details</Card.Link>
            </Card.Footer>
          </span>
        </Col>

      </Row>
      <StaffEdit isOpen={isStaffEditModalOpen}
        params={params}
        schoolId={schoolId}
        branchId={branchId}
        email={staff.email}
        setStaffEditModalOpen={setStaffEditModalOpen}
        onRequestClose={() => setStaffEditModalOpen(false)}
        staff={staff} />
      <ManageUserAccount isOpen={isManageUserModalOpen}
        schoolId={schoolId}
        branchId={branchId}
        email={staff.email}
        setManageUserModalOpen={setManageUserModalOpen}
        onRequestClose={() => setManageUserModalOpen(false)}
        staff={staff} />
      <StaffDelete isOpen={isStaffDeleteModalOpen}
        params={params}
        schoolId={schoolId}
        branchId={branchId}
        setStaffDeleteModalOpen={setStaffDeleteModalOpen}
        onRequestClose={() => setStaffDeleteModalOpen(false)}
        staff={staff} />
      <StaffInformation isOpen={isStaffDetailsModalOpen}
        params={params}
        schoolId={schoolId}
        branchId={branchId}
        setStaffDetailsModalOpen={setStaffDetailsModalOpen}
        onRequestClose={() => setStaffDetailsModalOpen(false)}
        staff={staff} />
    </>
  )
}

export default StaffDetails
