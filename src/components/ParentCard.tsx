import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { addParent, getParentByEmail } from '../redux/slices/parentSlice'
import { ToastContext } from '../utility/ToastContext'
import { showToastify } from '../utility/Toastify'
import { Parent } from '../models/parent'

const ParentCard = (props: any) => {
  const { index, schoolId, branchId } = props;
  const { parent, message, status } = useSelector((state: RootState) => state.parent)
  const dispatch = useDispatch<AppDispatch>()
  const { setShowToast } = useContext(ToastContext)
  const [formData, setFormData] = useState({
    fathersFullName: '',
    mothersFullName: '',
    fathersOccupation: '',
    mothersOccupation: '',
    fathersGhanaCardNumber: '',
    mothersGhanaCardNumber: '',
    fathersEmailAddress: '',
    mothersEmailAddress: '',
    fathersContactNumber: '',
    mothersContactNumber: '',
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
      fathers_email_address: formData.fathersEmailAddress,
      mothers_email_address: formData.mothersEmailAddress,
      fathers_contact_number: formData.fathersContactNumber,
      mothers_contact_number: formData.mothersContactNumber,
      residential_address: formData.residentialAddress,
      postal_address: formData.postalAddress,
      fathers_ghana_card_number: formData.fathersGhanaCardNumber,
      mothers_ghana_card_number: formData.mothersGhanaCardNumber,
      title: formData.title
    }
    // Add your logic for submitting the form data (e.g., API call, state update, etc.)
    dispatch(addParent({ ...parent })).then((res: any) => {
      setShowToast(true)
      showToastify(res.payload.message, res.payload.status)
    }
    )
  };
  const handleEmailBlur = () => {
    setShowToast(true)
    // Example: Basic email format validation

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.fathersEmailAddress)) {
      showToastify('Invalid email format. Please enter a valid email address.', 'error')
      // You can add more advanced validation or error handling here
    } else {
      dispatch(getParentByEmail(encodeURIComponent(formData.fathersEmailAddress)))
        .then((res: any) => {
          setShowToast(true)
          showToastify(res.payload.message, res.payload.status)
        })
    }
  };
  useEffect(() => {
    if (formData.fathersEmailAddress && index=== 'parent' ) {
      dispatch(getParentByEmail(encodeURIComponent(formData.fathersEmailAddress)))
    }
  }, [dispatch, formData.fathersEmailAddress, index])
  return (
    <Card>
     
      <Card.Header>{formData.title || 'Parent Details'}</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className='d-flex flex-lg-row flex-column mb-2'>
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
          <Row className='d-flex flex-lg-row flex-column mb-2'>
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
          <Row className='d-flex flex-lg-row flex-column mb-2'>
            <Col>
              <Form.Group controlId="fathersEmailAddress">
                <Form.Label>Fathers Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="fathersEmailAddress"
                  value={formData.fathersEmailAddress}
                  onChange={handleChange}
                  onBlur={handleEmailBlur}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="fathersContactNumber">
                <Form.Label>Father's Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="fathersContactNumber"
                  value={formData.fathersContactNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className='d-flex flex-lg-row flex-column mb-2'>
            <Col>
              <Form.Group controlId="mothersEmailAddress">
                <Form.Label>Mother's Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="mothersEmailAddress"
                  value={formData.mothersEmailAddress}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="mothersContactNumber">
                <Form.Label>Mother's Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  name="mothersContactNumber"
                  value={formData.mothersContactNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className='d-flex flex-lg-row flex-column mb-2'>
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
          <Row className='d-flex flex-lg-row flex-column mb-2'>
            <Col>
              <Form.Group controlId="residentialAddress">
                <Form.Label>Father's Ghana Card Number</Form.Label>
                <Form.Control
                  type="text"
                  name="residentialAddress"
                  value={formData.fathersGhanaCardNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="postalAddress">
                <Form.Label>Mother's Ghana Card Number</Form.Label>
                <Form.Control
                  type="text"
                  name="postalAddress"
                  value={formData.mothersGhanaCardNumber}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Button className='mt-2' variant="primary" type="submit">
            {parent?.fathers_email_address ? 'Update' : 'Submit'}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default ParentCard
