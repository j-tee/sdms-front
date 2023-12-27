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
      <div className='fs-6 text-muted mb-2 p-1 border-bottom d-flex flex-row justify-content-between'>
        <span>{department.dept_name}</span>
        <span>
          <Card.Footer className='p-0 m-0 fs-6 d-flex flex-row'>
            <Card.Link onClick={handleEdit}>Edit</Card.Link><Card.Link onClick={handleDelete}>Delete</Card.Link>
          </Card.Footer>
        </span>
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
