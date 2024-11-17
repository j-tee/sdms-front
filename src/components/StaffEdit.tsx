import React, { useContext, useEffect, useState } from 'react'
import { ToastContext } from '../utility/ToastContext';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { Staff } from '../models/staff';
import { getStaffs, updateStaff } from '../redux/slices/staffSlice';
import { showToastify } from '../utility/Toastify';
import { Col, Container, Form, Modal, Image, Row, Button } from 'react-bootstrap';

const StaffEdit = (props: any) => {
  const { staff, isOpen, params, setStaffEditModalOpen, onRequestClose, branchId, schoolId } = props;
  const { setShowToast } = useContext(ToastContext)
  const dispatch = useDispatch<AppDispatch>()
  
  const [staffImagePreview, setStaffImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<Staff>({
    id: staff.id,
    email: staff.email,
    first_name: staff.first_name,
    last_name: staff.last_name,
    dob: staff.dob,
    gender: staff.gender,
    phone_number: staff.phone_number,
    designation: staff.designation,
    branch_id: staff.branch_id,
    avatar: staff.avatar, 
  } as Staff);

  const handleFileChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files.length > 0 ? (e.target.files[0] as File) : null;

    setFormData((prevData) => ({
      ...prevData,
      [field]: file // Assuming you want to store the filename
    }));

    // Optionally, preview the selected image
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setStaffImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const staff = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key !== 'avatar') {
          staff.append(`staff[${key}]`, (formData as any)[key]);
        }
      }
    }
    staff.append('staff[branch_id]', branchId ? branchId.toString() : '0');

    if (formData.avatar instanceof File) {
      staff.append('staff[avatar]', formData.avatar);
    }
    dispatch(updateStaff(staff)).then((res: any) => {
      setShowToast(true)
      showToastify(res.payload.message, res.payload.status)
      dispatch(getStaffs({...params, branch_id: branchId ? parseInt(branchId) : 0,paginate: true, school_id: schoolId ? parseInt(schoolId) : 0})) 
    })
  }
  useEffect(() => {
    setStaffImagePreview((prevData) => (staff.image_url ? staff.image_url : null))
  }, [staff])
  return (
    <Modal show={isOpen} onHide={onRequestClose} centered animation size='lg'>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Row>
          <Col>
            <Form.Group controlId="picture" className='d-flex flex-column gap-1'>
              <Form.Label>Passport Picture</Form.Label>
              <span>
                {staffImagePreview && <Image src={staffImagePreview} alt="Staff Preview" thumbnail
                  style={{ maxWidth: '100px', maxHeight: '100px' }} />}
              </span>
              <Form.Control style={{ maxWidth: '100px' }}
                type="file"
                accept="image/*"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleFileChange('avatar', e)
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className='d-flex flex-column flex-lg-row mb-1'>
          <Col>
            <Form.Group controlId="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                type="text" placeholder="First Name" />
            </Form.Group>
          </Col>
          <Col><Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              type="text" placeholder="Last Name" />
          </Form.Group></Col>
        </Row>
        <Row className='d-flex flex-column flex-lg-row mb-1'>
          <Col>
            <Form.Group controlId="designation">
              <Form.Label>Designation / Role / Responsibility</Form.Label>
              <Form.Control value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                type="text" placeholder="Designation" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                type="text" placeholder="Email Address" />
            </Form.Group>
          </Col>
        </Row>
        <Row className='d-flex flex-column flex-lg-row mb-2'>
          <Col>
            <Form.Group controlId="dob">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                type="date" placeholder="Date Of Birth" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='phoneNumber'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                type="text" placeholder="Phone Number" />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId='gender'>
              <Form.Label>Gender</Form.Label>
              <Form.Select as='select' value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                <option value={''}>---Select gender---</option>
                <option value={'Male'}>Male</option>
                <option value={'Female'}>Female</option>
                <option value={'Other'}>Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onRequestClose}>
            Close
          </Button>
          <Button variant="primary" type='submit'>
            Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default StaffEdit
