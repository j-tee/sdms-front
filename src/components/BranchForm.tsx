import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

const BranchForm = (props: any) => {
    const { formData, handleInputChange } = props;
  return (
    <>
      <Row>
        <Col md={3}>
          <Form.Group controlId='branchName'>
            <Form.Label>Branch Name</Form.Label>
            <Form.Control
              type='text'
              value={formData.branch_name}
              onChange={(e) => handleInputChange('branch_name', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId='website'>
            <Form.Label>Website</Form.Label>
            <Form.Control
              type='text'
              value={formData.website}
              onChange={(e) => handleInputChange('website', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId='emailAddress'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='text'
              value={formData.email_address}
              onChange={(e) => handleInputChange('email_address', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId='phone1'>
            <Form.Label>Phone 1</Form.Label>
            <Form.Control
              type='text'
              value={formData.phone1}
              onChange={(e) => handleInputChange('phone1', e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <Form.Group controlId='phone2'>
            <Form.Label>Phone 2</Form.Label>
            <Form.Control
              type='text'
              value={formData.phone2}
              onChange={(e) => handleInputChange('phone2', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId='postalAddress'>
            <Form.Label>Postal Address</Form.Label>
            <Form.Control
              type='text'
              value={formData.postal_address}
              onChange={(e) => handleInputChange('postal_address', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={4}>
          <Form.Group controlId='residentialAddress'>
            <Form.Label>Residential Address</Form.Label>
            <Form.Control
              type='text'
              value={formData.residential_address}
              onChange={(e) => handleInputChange('residential_address', e.target.value)}
            />
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default BranchForm;
