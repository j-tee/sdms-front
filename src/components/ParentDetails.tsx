import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { addParent, getParentByEmail } from '../redux/slices/parentSlice'
import { ToastContext } from '../utility/ToastContext'
import { showToastify } from '../utility/Toastify'
import { Parent } from '../models/parent'

const ParentDetails = (props: any) => {
  const { index, schoolId, branchId } = props;
  const { parent, message, status } = useSelector((state: RootState) => state.parent)
  const dispatch = useDispatch<AppDispatch>()
  const { setShowToast } = useContext(ToastContext)
  const [formData, setFormData] = useState({
    fathersFullName: '',
    mothersFullName: '',
    fathersOccupation: '',
    mothersOccupation: '',
    emailAddress: '',
    contactNumber: '',
    residentialAddress: '',
    postalAddress: '',
    title: '',
  });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowToast(true)
    const parent: Parent = {
      fathers_full_name: formData.fathersFullName,
      mothers_full_name: formData.mothersFullName,
      fathers_occupation: formData.fathersOccupation,
      mothers_occupation: formData.mothersOccupation,
      email_address: formData.emailAddress,
      contact_number: formData.contactNumber,
      residential_address: formData.residentialAddress,
      postal_address: formData.postalAddress,
      title: formData.title
    }
    // Add your logic for submitting the form data (e.g., API call, state update, etc.)
    dispatch(addParent({ ...parent })).then((res: any) => (showToastify(message, status)))
  };
  const handleEmailBlur = () => {
    setShowToast(true)
    // Example: Basic email format validation

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.emailAddress)) {
      showToastify('Invalid email format. Please enter a valid email address.', 'error')
      // You can add more advanced validation or error handling here
    } else {
      // console.log('formdataemail ',formData.emailAddress)
      dispatch(getParentByEmail(encodeURIComponent(formData.emailAddress)))
        .then((res: any) => {
          setShowToast(true)
          showToastify(message, status)
        })
    }
  };
  useEffect(() => {
    if (formData.emailAddress && index=== 'parent' ) {
      dispatch(getParentByEmail(encodeURIComponent(formData.emailAddress)))
    }
  }, [dispatch, formData.emailAddress, index])
  return (
    <Card>
      <Card.Header>{formData.title || 'Parent Details'}</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className='d-flex flex-lg-row flex-column'>
            <Col>
              <Form.Group controlId="fathersFullName">
                <Form.Label>Father's Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fathersFullName"
                  value={formData.fathersFullName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col> <Form.Group controlId="mothersFullName">
              <Form.Label>Mother's Full Name</Form.Label>
              <Form.Control
                type="text"
                name="mothersFullName"
                value={formData.mothersFullName}
                onChange={handleChange}
                required
              />
            </Form.Group></Col>
          </Row>
          <Row className='d-flex flex-lg-row flex-column'>
            <Col>
              <Form.Group controlId="fathersOccupation">
                <Form.Label>Father's Occupation</Form.Label>
                <Form.Control
                  type="text"
                  name="fathersOccupation"
                  value={formData.fathersOccupation}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="mothersOccupation">
                <Form.Label>Mother's Occupation</Form.Label>
                <Form.Control
                  type="text"
                  name="mothersOccupation"
                  value={formData.mothersOccupation}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className='d-flex flex-lg-row flex-column'>
            <Col>
              <Form.Group controlId="emailAddress">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  onBlur={handleEmailBlur}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="contactNumber">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className='d-flex flex-lg-row flex-column'>
            <Col>
              <Form.Group controlId="residentialAddress">
                <Form.Label>Residential Address</Form.Label>
                <Form.Control
                  type="text"
                  name="residentialAddress"
                  value={formData.residentialAddress}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="postalAddress">
                <Form.Label>Postal Address</Form.Label>
                <Form.Control
                  type="text"
                  name="postalAddress"
                  value={formData.postalAddress}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Button className='mt-2' variant="primary" type="submit">
            {parent.email_address ? 'Update' : 'Submit'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default ParentDetails
