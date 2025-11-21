import React, { useState } from 'react'
import { Card, Form } from 'react-bootstrap';
import { Department } from '../models/department';
import DepartmentEdit from './DepartmentEdit';
import DepartmentDelete from './DepartmentDelete';

const DepartmentList = (props: any) => {
  const { department, params, branchId, schoolId } = props;
  const [isDepartmentEditModalOpen, setDepartmentEditModalOpen] = useState(false)
  const [isDepartmentDeleteModalOpen, setDepartmentDeleteModalOpne] = useState(false)
  const handleEdit = () => {
    setDepartmentEditModalOpen(true)
  }
  const handleDelete = () => {
    setDepartmentDeleteModalOpne(true)
  }
  return (
    <>
      <div className="org-item-card">
        <div className="org-item-content">
          <div className="org-item-icon">
            <i className="fas fa-layer-group"></i>
          </div>
          <span className="org-item-name">{department.dept_name}</span>
        </div>
        <div className="org-item-actions">
          <button className="org-action-btn edit-btn-org" onClick={handleEdit}>
            <i className="fas fa-edit"></i>
            <span>Edit</span>
          </button>
          <button className="org-action-btn delete-btn-org" onClick={handleDelete}>
            <i className="fas fa-trash-alt"></i>
            <span>Delete</span>
          </button>
        </div>
      </div>
      <DepartmentEdit isOpen={isDepartmentEditModalOpen}
        params={params}
        branchId={branchId}
        schoolId={schoolId}
        onRequestClose={() => { setDepartmentEditModalOpen(false) }}
        setDepartmentEditModalOpen={setDepartmentEditModalOpen}
        department={department} />
      <DepartmentDelete isOpen={isDepartmentDeleteModalOpen}
        params={params}
        branchId={branchId}
        schoolId={schoolId}
        onRequestClose={() => { setDepartmentDeleteModalOpne(false) }}
        setDepartmentDeleteModalOpne={setDepartmentDeleteModalOpne}
        department={department} />
    </>
  )
}

export default DepartmentList
