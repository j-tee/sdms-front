import React from 'react'
import { Card, Modal } from 'react-bootstrap'

const StaffInformation = (props: any) => {
    const {staff, schoolId, branchId, onRequestClose, isOpen} = props
    
  return (
    <Modal show={isOpen} onHide={onRequestClose} centered animation size='lg'>
      <Modal.Header closeButton>
        <Modal.Title>Staff Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Card className='d-flex flex-column flex-lg-row p-2'>
                <Card.Img className='mt-2' variant="top" src={staff.image_url} style={{ width: "100px", height: "100px" }} />
                <Card.Body className='d-flex flex-column ps-5 pt-1'>
                    <span>{staff.first_name}</span>
                    <span>{staff.last_name}</span>
                    <span>{staff.designation}</span>
                    <span>{staff.email}</span>
                    <span>{staff.phone_number}</span>
                    <span>{staff.branch_name}</span>
                </Card.Body>
            </Card>
            </Modal.Body>
            <Modal.Footer>
                <button className='btn btn-primary' onClick={onRequestClose}>Close</button>
            </Modal.Footer>
    </Modal>
  )
}

export default StaffInformation
