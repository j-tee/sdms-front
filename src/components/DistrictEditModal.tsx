import React, { useContext, useEffect, useState } from 'react'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { District } from '../models/district';
import { Button, Form, Modal } from 'react-bootstrap';
import { Region } from '../models/region';
import { ToastContext } from '../utility/ToastContext';
import { getDistricts, updateDistrict } from '../redux/slices/districtSlice';
import { showToastify } from '../utility/Toastify';
import '../css/ModernModal.css';

const DistrictEditModal = (props: any) => {
    const {isOpen, onRequestClose,setEditModalOpen, district, params} = props
    const dispatch = useDispatch<AppDispatch>();
    const {regions} = useSelector((state: RootState) => state.region);
    const [formData, setFormData] = useState<District>({} as District);
    const {setShowToast} = useContext(ToastContext)

    const handleSubmit = (e: any) => {
      e.preventDefault();
      setShowToast(true);
      dispatch(updateDistrict(formData)).then((res: any) => {
        showToastify(res.payload.message, res.payload.status);
        dispatch(getDistricts(params));
      });
    }
    useEffect(() => {
      setFormData(district);
    }, [params, dispatch, district]);
  return (
    <Modal show={isOpen} onHide={onRequestClose} className="modern-modal edit-modal">
      <Modal.Header closeButton>
        <Modal.Title><i className="fas fa-edit"></i> Edit District </Modal.Title>
        </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>District Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter District Name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Region</Form.Label>
            <Form.Control
              as="select"
              value={formData.region_id}
              onChange={(e) => setFormData({...formData, region_id: parseInt(e.target.value)})}
            >
              <option value="">Select Region</option>
              {regions.map((region: Region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            <i className="fas fa-save"></i> Submit
          </Button>
        </Form>
              
      </Modal.Body>      
    </Modal>
  )
}

export default DistrictEditModal
