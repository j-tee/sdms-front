import React, { useContext, useEffect, useState } from 'react'
import { Stage } from '../models/stage';
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import BranchDropDown from './BranchDropDown';
import { getStages, updateStage } from '../redux/slices/stageSlice';
import { showToastify } from '../utility/Toastify';

const StageEdit = (props: any) => {
  const { isOpen, onRequestClose, stage, params, branchId, schoolId, setStageEditModalOpen } = props; 
  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);
  const [formData, setFormData] = useState<Stage>({
    id: 0,
    stage_name: '',
    branch_id: 0,
  })
  type AnyType = {
    [key: string]: string;
  };

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
      id: stage.id,
      stage_name: stage.stage_name,
      branch_id: stage.branch_id,
    }))
  }, [stage])
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateStage({ ...formData } as any))
    .then((res: any) => {
      setShowToast(true);
      // showToastify(res.payload.message, res.payload.status);
      setStageEditModalOpen(false);
      dispatch(getStages({ ...params, paginate: true, branch_id: branchId }))
    })
  }
  return (
    <Modal show={isOpen} animation centered onHide={onRequestClose} size='lg'>
      <Form onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Stage {stage.stage_name}</Modal.Title>
      </Modal.Header>      
        <Modal.Body>
          <Row>
            <Col>
             <BranchDropDown schoolId={schoolId} onChange={handleInputChange}/>
            </Col>
            <Col>
              <Form.Group controlId="stageName">
                <Form.Label>Stage Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Stage Name" 
                value={formData.stage_name} 
                onChange={(e) => handleInputChange('stage_name', e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-secondary' onClick={onRequestClose}>Close</button>
          <button type='submit' className='btn btn-danger'>Update</button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default StageEdit
