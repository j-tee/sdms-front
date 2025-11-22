import React, { useContext, useEffect, useState } from 'react'
import { Card, Col, Container, Image, Form, Row, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Header from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import StaffDetails from './StaffDetails';
import { Staff, StaffParams, StaffViewModel } from '../models/staff';
import { addStaff, getStaffs } from '../redux/slices/staffSlice';
import { useToast } from 'react-toastify';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import Navigation from './Navigation';
import PaginationComponent from './PaginationComponent';
import CustomDatePicker from './CustomDatePicker';
import FormSelect from './FormSelect';
import './StaffCard.css';

const StaffCard = (props: any) => {
  const { branchId, schoolId } = useParams()
  const { staffs, pagination } = useSelector((state: RootState) => state.staff)
  const [staffImagePreview, setStaffImagePreview] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>()
  const { showToast, setShowToast } = useContext(ToastContext)
  const [params, setParams] = useState<StaffParams>({
    branch_id: branchId ? parseInt(branchId) : 0,
    department_id: 0,
    program_id: 0,
    paginate: true,
    pagination: {
      current_page: 1,
      per_page: 10,
    }
  })
  const [formData, setFormData] = useState<Staff>({
    email: '',
    first_name: '',
    last_name: '',
    dob: '',
    designation: '',
    gender: '',
    phone_number: '',
    branch_id: 0,
    avatar: null,
  })
  const handleFileChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files.length > 0 ? (e.target.files[0] as File) : null;
if (file && file.size > 5120) {
      showToastify("Image size should not exceed 5KB. Visit 'https://image.pi7.org/compress-image-to-20kb' to resize your image", 'error');
      return;
    }
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
  useEffect(() => {
    dispatch(getStaffs({...params, branch_id: branchId ? parseInt(branchId) : 0 }))
  }, [branchId, dispatch, params])

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    dispatch(addStaff(staff)).then((res: any) => {
      setShowToast(true)
      showToastify(res.payload.message, res.payload.status)
      if(res.payload.status === 'success'){
        setTimeout(() => {
          window.location.reload();
        }, 6000);
      }
      dispatch(getStaffs({...params, branch_id: branchId ? parseInt(branchId) : 0,paginate: true, school_id: schoolId ? parseInt(schoolId) : 0})) 
    })
  };
  const handlePageChange = (page: number) => {
    // setCurrentPage(page);
    setParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        current_page: page,
      },
    }));
  };

  const handleItemsPerPageChange = (perPage: number) => {
    // setItemsPerPage(perPage);
    setParams((prevParams) => ({
      ...prevParams,
      pagination: {
        ...prevParams.pagination,
        per_page: perPage,
        current_page: 1,
      },
    }));
  };
  return (
    <>
      <Header />
      <div className="staff-page-modern">
        <img src="/images/cap.jpg" alt="" className="floating-cap-decoration floating-cap-top-right" />
        <img src="/images/cap.jpg" alt="" className="floating-cap-decoration floating-cap-bottom-left" />
        <Container fluid>
          <div className="page-hero-section">
            <div className="hero-content-wrapper">
              <div className="hero-icon">
                <i className="fas fa-users"></i>
              </div>
              <h1 className="page-title-modern">Staff Management</h1>
              <p className="page-subtitle-modern">Manage your school staff members</p>
            </div>
          </div>

          <Card className="staff-card-container-modern">
            <Card.Body>
              <div className="staff-add-section">
                <div className="section-header-modern">
                  <div className="section-icon">
                    <i className="fas fa-user-plus"></i>
                  </div>
                  <h3 className="section-title">Add New Staff Member</h3>
                </div>

                <Form onSubmit={handleSubmit} className="modern-form">
                  <div className="staff-photo-upload-section">
                    <Form.Group controlId="picture" className="photo-upload-group">
                      <Form.Label className="modern-form-label">
                        <i className="fas fa-camera me-2"></i>
                        Passport Picture
                      </Form.Label>
                      <div className="photo-preview-container">
                        {staffImagePreview ? (
                          <img src={staffImagePreview} alt="Staff Preview" className="staff-photo-preview" />
                        ) : (
                          <div className="photo-placeholder">
                            <i className="fas fa-user"></i>
                          </div>
                        )}
                      </div>
                      <label htmlFor="fileInput" className="file-upload-btn">
                        <i className="fas fa-upload me-2"></i>
                        Choose Photo
                      </label>
                      <Form.Control
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleFileChange('avatar', e)
                        }
                        className="d-none"
                      />
                      <small className="file-info-text">Max 100KB</small>
                    </Form.Group>
                  </div>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="firstName" className="modern-form-group">
                        <Form.Label className="modern-form-label">
                          <i className="fas fa-user me-2"></i>
                          First Name
                        </Form.Label>
                        <Form.Control 
                          value={formData.first_name}
                          onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                          type="text" 
                          placeholder="Enter first name"
                          className="modern-form-control" 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="lastName" className="modern-form-group">
                        <Form.Label className="modern-form-label">
                          <i className="fas fa-user me-2"></i>
                          Last Name
                        </Form.Label>
                        <Form.Control 
                          value={formData.last_name}
                          onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                          type="text" 
                          placeholder="Enter last name"
                          className="modern-form-control" 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <Form.Group controlId="designation" className="modern-form-group">
                        <Form.Label className="modern-form-label">
                          <i className="fas fa-briefcase me-2"></i>
                          Designation / Role
                        </Form.Label>
                        <Form.Control 
                          value={formData.designation}
                          onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                          type="text" 
                          placeholder="e.g., Teacher, Principal"
                          className="modern-form-control" 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="email" className="modern-form-group">
                        <Form.Label className="modern-form-label">
                          <i className="fas fa-envelope me-2"></i>
                          Email Address
                        </Form.Label>
                        <Form.Control 
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          type="email" 
                          placeholder="email@example.com"
                          className="modern-form-control" 
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={4}>
                      <Form.Group controlId="dob" className="modern-form-group">
                        <Form.Label className="modern-form-label">
                          <i className="fas fa-calendar me-2"></i>
                          Date of Birth
                        </Form.Label>
                        <CustomDatePicker
                          value={formData.dob}
                          onChange={(date) => setFormData({ ...formData, dob: date })}
                          className="modern-form-control"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId='phoneNumber' className="modern-form-group">
                        <Form.Label className="modern-form-label">
                          <i className="fas fa-phone me-2"></i>
                          Phone Number
                        </Form.Label>
                        <Form.Control 
                          value={formData.phone_number}
                          onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                          type="text" 
                          placeholder="Enter phone number"
                          className="modern-form-control" 
                        />
                      </Form.Group>
                    </Col>
                    <Col md={4}>
                      <Form.Group controlId='gender' className="modern-form-group">
                        <Form.Label className="modern-form-label">
                          <i className="fas fa-venus-mars me-2"></i>
                          Gender
                        </Form.Label>
                        <FormSelect
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="modern-form-control"
                        >
                          <option value={''}>Select gender</option>
                          <option value={'Male'}>Male</option>
                          <option value={'Female'}>Female</option>
                          <option value={'Other'}>Other</option>
                        </FormSelect>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='mt-3'>
                      <Button type="submit" className="btn-add-staff">
                        <i className="fas fa-user-plus me-2"></i>
                        Add Staff Member
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>

              <div className="section-header-modern mt-5">
                <div className="section-icon">
                  <i className="fas fa-list"></i>
                </div>
                <h3 className="section-title">Staff Members</h3>
              </div>

              <div className="staff-list-container">
                {staffs.map((staff: StaffViewModel) => (
                  <StaffDetails 
                    schoolId={schoolId}
                    params={params}
                    branchId={branchId}
                    key={staff.id} 
                    staff={staff} 
                  />
                ))}
              </div>
            </Card.Body>

            <div className="pagination-controls-modern">
              <PaginationComponent
                params={params}
                activePage={pagination?.current_page}
                itemsCountPerPage={pagination?.per_page}
                totalItemsCount={pagination?.total_items || 0}
                pageRangeDisplayed={5}
                totalPages={pagination?.total_pages}
                hideDisabled={pagination?.total_pages === 0}
                hideNavigation={pagination?.total_pages === 1}
                onChange={handlePageChange}
              />
              <DropdownButton
                className="items-per-page-dropdown"
                id="dropdown-items-per-page-staff"
                title={`Items per page: ${params.pagination?.per_page}`}
              >
                <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
                <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
                <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
              </DropdownButton>
            </div>
          </Card>
          <Navigation schoolId={schoolId} branchId={branchId} />
        </Container>
      </div>
    </>
  )
}

export default StaffCard
