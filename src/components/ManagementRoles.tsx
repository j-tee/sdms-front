import React, { useContext, useState } from 'react'
import { ToastContext } from '../utility/ToastContext';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { addUserToRole } from '../redux/slices/roleSlice';
import { showToastify } from '../utility/Toastify';

const ManagementRoles = (props: any) => {
    const { schoolId, branchId, email } = props;
  const { setShowToast } = useContext(ToastContext)
  const dispatch = useDispatch<AppDispatch>()
  const [formData, setFormData] = useState({
    email: '',
    role: '',
    branch_id: 0,
    school_id: 0,
  })

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addUserToRole({...formData, school_id: schoolId, branch_id: branchId, email: email}))
    .then((res: any) => {
      setShowToast(true)
      showToastify(res.payload.message, res.payload.status)
    })
  };
  return (
    <>
       <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Role</Form.Label>
              <Form.Select value={formData.role} onChange={(e)=>setFormData({...formData, role:e.target.value})} aria-label="Default select example">
                <option>---Select Role---</option>
                <option value="admin">Admin</option>
                <option value="employee">Staff</option>
                <option value="student">Student</option>
                <option value="parent">Parent</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
    </>  )
}

export default ManagementRoles
