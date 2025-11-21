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
      <div className="staff-member-card-modern">
        <div className="staff-photo-section">
          <img src={staff.image_url} alt={`${staff.first_name} ${staff.last_name}`} className="staff-photo" />
        </div>
        <div className="staff-info-section">
          <div className="staff-header">
            <h4 className="staff-name">{staff.first_name} {staff.last_name}</h4>
            <span className="staff-designation-badge">{staff.designation}</span>
          </div>
          
          <div className="staff-contact-grid">
            <div className="staff-contact-item">
              <i className="fas fa-envelope"></i>
              <span>{staff.email}</span>
            </div>
            <div className="staff-contact-item">
              <i className="fas fa-phone"></i>
              <span>{staff.phone_number}</span>
            </div>
            <div className="staff-contact-item">
              <i className="fas fa-building"></i>
              <span>{staff.branch_name}</span>
            </div>
          </div>

          <button className="manage-account-btn" onClick={() => setManageUserModalOpen(true)}>
            <i className="fas fa-user-cog me-2"></i>
            Manage User Account
          </button>

          <div className="staff-actions">
            <button className="staff-action-btn edit-btn-staff" onClick={() => handleEdit(staff)}>
              <i className="fas fa-edit"></i>
              <span>Edit</span>
            </button>
            <button className="staff-action-btn details-btn-staff" onClick={handleDetails}>
              <i className="fas fa-info-circle"></i>
              <span>Details</span>
            </button>
            <button className="staff-action-btn delete-btn-staff" onClick={handleDelete}>
              <i className="fas fa-trash-alt"></i>
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
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
