import React, { useContext, useState } from 'react'
import LocationDropDown from './LocationDropDown';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { getBranches, updateBranch } from '../redux/slices/schoolSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { Branch } from '../models/branch';

const BranchEdit = (props: any) => {
  const { branch, params, isOpen, onRequestClose, setBranchEditModalOpen } = props;
  const {setShowToast} = useContext(ToastContext)
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<Branch>({
    id: branch.id,
    branch_name: branch.branch_name,
    website: branch.website,
    email_address: branch.email_address,
    phone1: branch.phone1,
    phone2: branch.phone2,
    postal_address: branch.postal_address,
    residential_address: branch.residential_address,
    school_id: branch.school_id,
    circuit_id: branch.circuit_id, // Add the missing circuit_id property
  });
  type AnyType = {
    [key: string]: string;
  };

  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateBranch(formData)).then((res: any) => {
      setShowToast(true);
      showToastify(res.payload.message, res.payload.status);
      if (res.payload.status === 'success') {
        dispatch(getBranches({ ...params, pagination: params.pagination })).then((resp: any) => {
          setBranchEditModalOpen(false);
        });
      }
    }
    );
  }
  return (
    <Modal show={isOpen} onHide={onRequestClose} centered animation size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit: {formData.branch_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LocationDropDown onLocationChange={handleInputChange} />
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
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" type="submit">
            Save
          </button>
          <button className="btn btn-secondary" onClick={() => setBranchEditModalOpen(false)}>
            Close
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default BranchEdit
