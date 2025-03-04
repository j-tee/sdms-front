import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import ManageUserAccount from './ManageUserAccount';
import StaffEdit from './StaffEdit';
import StaffDelete from '../services/StaffDelete';
import StaffInformation from './StaffInformation';
import UserSession from '../utility/userSession';

const StaffDetails = (props: any) => {
  const { schoolId, branchId, staff, params } = props
  const [isManageUserModalOpen, setManageUserModalOpen] = useState(false)
  const [isStaffEditModalOpen, setStaffEditModalOpen] = useState(false)
  const [isStaffDeleteModalOpen, setStaffDeleteModalOpen] = useState(false)
  const [isStaffDetailsModalOpen, setStaffDetailsModalOpen] = useState(false)
  const allowed_roles = ["admin", "data_entry", "secretary", "accountant"];
  const [roles, setRoles] = useState<string[]>([]);
  const handleEdit = (staff: any) => {
    setStaffEditModalOpen(true)
  }
  const handleDelete = () => {
    setStaffDeleteModalOpen(true)
  }
  const handleDetails = () => {
    setStaffDetailsModalOpen(true)
  }

  useEffect(() => {
    const user_roles = UserSession.getroles();
    setRoles(user_roles);
  }, [roles])
  return (
    <>
      <Row className='d-flex flex-column p-3 flex-lg-row border mb-3 rounded shadow-sm'>
        {/* Image Column */}
        <Col md={2} className='d-flex align-items-center justify-content-center p-2'>
          <Card.Img
            variant="top"
            src={staff.image_url}
            className='rounded-circle'
            style={{ width: "100px", height: "100px", objectFit: "cover" }}
          />
        </Col>

        {/* Details Column */}
        <Col md={9} className='d-flex flex-column p-3'>
          {/* Staff Details */}
          <div className='mb-3'>
            <h5 className='mb-1'>{staff.first_name} {staff.last_name}</h5>
            <p className='mb-1 text-muted'>{staff.designation}</p>
            <p className='mb-1'><strong>Email:</strong> {staff.email}</p>
            <p className='mb-1'><strong>Phone:</strong> {staff.phone_number}</p>
            <p className='mb-0'><strong>Branch:</strong> {staff.branch_name}</p>
          </div>

          {/* Action Buttons */}
          {roles.some(role => allowed_roles.includes(role)) && (
            <div className='mt-auto'>
              <Button
                variant='link'
                className='text-primary p-0 mb-2'
                onClick={() => setManageUserModalOpen(true)}
              >
                Manage User Account
              </Button>

              <Card.Footer className='d-flex flex-row gap-2 p-0 bg-transparent border-0'>
                <Button size='sm' variant='outline-primary' onClick={() => handleEdit(staff)}>
                  Edit
                </Button>
                <Button size='sm' variant='outline-danger' onClick={handleDelete}>
                  Delete
                </Button>
                <Button size='sm' variant='outline-info' onClick={handleDetails}>
                  Details
                </Button>
              </Card.Footer>
            </div>
          )}
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
