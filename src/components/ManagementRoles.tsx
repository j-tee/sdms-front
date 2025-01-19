import React, { useContext, useEffect, useState } from 'react'
import { ToastContext } from '../utility/ToastContext';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { addUserToRole } from '../redux/slices/roleSlice';
import { showToastify } from '../utility/Toastify';
import { getAssignedRoles, removeUserFromRole } from '../redux/slices/authSlice';

const ManagementRoles = (props: any) => {
    const { schoolId, branchId, email } = props;
  const { setShowToast } = useContext(ToastContext)
  const {assigned_roles} = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState({
    email: '',
    role: '',
    branch_id: 0,
    school_id: 0,
  })

  const [params, setParams] = useState({
    school_id: 0,
    branch_id: 0,
    email: '',
    resource_id: 0,
    resource_type: '',
    role: '',
  })

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addUserToRole({...formData, school_id: schoolId, branch_id: branchId, email: email}))
    .then((res: any) => {
      setShowToast(true)
      dispatch(getAssignedRoles({school_id: schoolId, branch_id: branchId, email: email}))
      showToastify(res.payload.message, res.payload.status)
    })
  };
  const handleRemove = (role: any) => {
    setParams((prev) => ({...prev, 
      resource_id: role.resource_id,
      resource_type: role.resource_type,
      role: role.name,
    }))
    dispatch(removeUserFromRole(params))
    .then((res: any) => {
      setShowToast(true)
      dispatch(getAssignedRoles({school_id: schoolId, branch_id: branchId, email: email}))
      showToastify(res.payload.message, res.payload.status)
    })
  }
  useEffect(() => {
    setParams({...params, school_id: schoolId, branch_id: branchId, email: email})
  }, [])
  useEffect(() => {
    dispatch(getAssignedRoles({school_id: schoolId, branch_id: branchId, email: email}))
    .then((res: any) => {
      setShowToast(true)
      showToastify(res.payload.message, res.payload.status)
    })
  }, [dispatch])
  return (
    <>
       <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Role</Form.Label>
              <Form.Select value={formData.role} onChange={(e)=>setFormData({...formData, role:e.target.value})} aria-label="Default select example">
                <option>---Select Role---</option>
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="accountant">Accountant</option>
                <option value="secretary">Secretary</option>
                <option value="student">Student</option>
                <option value="parent">Parent</option>
                <option value="data_entry">Data Entry</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Add User to Role
            </Button>
          </Form>
        <h3>Assigned Roles</h3>
        <Table striped bordered hover size='sm'>
          <thead>
            <tr>
            <th>Resurce ID</th>
            <th>Resource</th>
            <th>Resource Name</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assigned_roles.map((role: any, index: number) => (
              <tr key={index}>
                <td>{role.resource_id}</td>
                <td>{role.resource_type}</td>
                <td>{role.resource_name}</td>   
                <td>{role.name}</td>  
                <td>
                  <Button variant="link" onClick={() => handleRemove(role)} size="sm">Remove</Button>  
                </td>           
              </tr>
            ))}
          </tbody>
        </Table>
    </>  
    )
}

export default ManagementRoles
