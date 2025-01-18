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
if (file && file.size > 102400) {
      showToastify('Image size should not exceed 100KB', 'error');
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
      <Container style={{ marginTop: '3.5rem' }}>
        &nbsp;
      </Container>
      <Card>
        <Card.Header>
          <Card.Title className='fs-3 text-muted'>Staffs </Card.Title>
        </Card.Header>
        <Card.Body>
          <Container fluid>
            <Form onSubmit={handleSubmit}>
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
                    <Form.Control as='select' value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                      <option value={''}>---Select gender---</option>
                      <option value={'Male'}>Male</option>
                      <option value={'Female'}>Female</option>
                      <option value={'Other'}>Other</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
          <Card.Header className='text-center'>
        <Card.Title className='text-center'>Staff List</Card.Title>
      </Card.Header>
          {staffs.map((staff: StaffViewModel) => (
            <StaffDetails schoolId={schoolId}
            params={params}
            branchId={branchId}
             key={staff.id} staff={staff} />
          ))}
        </Card.Body>
        <div className="d-flex flex-column flex-md-row px-2 justify-content-between align-items-center">
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
              className="mt-2 mt-md-0 mb-2"
              id="dropdown-items-per-page"
              title={`Items per page: ${params.pagination?.per_page}`}
            >
              <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
              <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
            </DropdownButton>
          </div>
        <Navigation schoolId={schoolId} branchId={branchId} />
      </Card>
    </>

  )
}

export default StaffCard
