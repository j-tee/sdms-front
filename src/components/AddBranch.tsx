// AddBranch.tsx
import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import LocationDropDown from './LocationDropDown';
import { Branch } from '../models/branch';
import BranchForm from './BranchForm';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { addBranch } from '../redux/slices/schoolSlice';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';

const AddBranch = (props: any) => {
  const { setAddBranchModalOpen, schoolId, onRequestClose, isOpen } = props;
  const dispatch = useDispatch<AppDispatch>()
  const { setShowToast } = useContext(ToastContext);

  const handleSubmit = () => {
    setShowToast(true);
    dispatch(addBranch(formData)).then((res: any) => {
      if (res.meta.requestStatus === 'fulfilled') {
        showToastify('Branch sucessfully Added', 'success')
        setAddBranchModalOpen(false)
        // Update the formData state with the new value
        setFormData((prevData) => ({
          ...prevData,
          branch_name: '',
          postal_address: '',
          website: '',
          email_address: '',
          residential_address: '',
          phone1: '',
          phone2: '',
          school_id: schoolId,
          circuit_id: 0,
        }));
      }
      if (res.meta.requestStatus === 'rejected') {
        showToastify(`Failed to add new branch ${res.payload.error}`, 'error')
      }
    })
  };

  const [formData, setFormData] = useState<Branch>({
    // Initialize your formData properties
    branch_name: '',
    postal_address: '',
    website: '',
    email_address: '',
    residential_address: '',
    phone1: '',
    phone2: '',
    school_id: schoolId,
    circuit_id: 0,
  });

  type AnyType = {
    [key: string]: string;
  };
  // const handleInputChange = (field: keyof Branch, value: string) => {
  //   // Update the formData state with the new value
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [field]: value,
  //   }));

  // };

  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    // Update the formData state with the new value
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));

  };
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      school_id: schoolId,
    }));
  }, [schoolId])
  return (
    <Form noValidate>
      <Modal animation show={isOpen} onHide={onRequestClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add New Branch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LocationDropDown onLocationChange={handleInputChange} />
          <BranchForm formData={formData} handleInputChange={handleInputChange} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};

export default AddBranch;
