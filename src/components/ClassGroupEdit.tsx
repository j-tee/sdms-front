import React, { useContext, useEffect, useState } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ClassGroup } from '../models/classGroup';
import { ToastContext } from '../utility/ToastContext';
import { getClassGroups, updateClassGroup } from '../redux/slices/classGroupSlice';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import DepartmentDropDown from './DepartmentDropDown';
import ProgramDropDown from './ProgramDropDown';
import StageDropDown from './StageDropDown';
import { getPrograms } from '../redux/slices/programSlice';
import { showToastify } from '../utility/Toastify';

const ClassGroupEdit = (props: any) => {
  const { isOpen, onRequestClose, classGroup, params, branchId, schoolId, setClassGroupEditModalOpen } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);
  const [formData, setFormData] = useState<ClassGroup>({
    id: 0,
    class_name: '',
    capacity: 0,
    program_id: 0,
    stage_id: 0,
  })

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      id: classGroup.id,
      class_name: classGroup.class_name,
      capacity: classGroup.capacity,
      program_id: classGroup.program_id,
      stage_id: classGroup.stage_id,
    }))
  }, [classGroup])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateClassGroup({ ...formData } as any))
      .then((res: any) => {
        setShowToast(true);
        showToastify(res.payload.message, res.payload.status);
        setClassGroupEditModalOpen(false);
        console.log('=========params',params)
        dispatch(getClassGroups({ ...params, paginate: true, branch_id: branchId }))
        .then((res: any) => {
          console.log('=========res',res)
        })
      })
  }
  type AnyType = {
    [key: string]: string;
  };
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    // Update the formData state with the new value
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    switch (field) {
      case 'department_id':
        dispatch(getPrograms({ ...params, branch_id: branchId, department_id: parseInt(value), paginate: false }))
        break;
      default:
        break;
    }
  };
  return (
    <Modal show={isOpen} animation centered onHide={onRequestClose} size='lg'>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Class Group {classGroup.class_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <DepartmentDropDown schoolId={schoolId} onChange={handleInputChange} branchId={0} />  
            </Col>
            <Col>
            <ProgramDropDown value={undefined} onChange={handleInputChange} branchId={0} departmentId={undefined} />
            </Col>
            <Col>
            <StageDropDown lesson={undefined} onChange={handleInputChange} branchId={0} />
            </Col>
          </Row>
          <Row>
            <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Class Name</Form.Label>
              <Form.Control type="text" placeholder="Enter Class Name" name='class_name' value={formData.class_name} onChange={(e: any) => setFormData({ ...formData, class_name: e.target.value })} />
            </Form.Group>
            </Col>
            <Col>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Capacity</Form.Label>
              <Form.Control type="number" placeholder="Enter Capacity" name='capacity' value={formData.capacity} onChange={(e: any) => setFormData({ ...formData, capacity: e.target.value })} />
            </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button className='btn btn-primary' type='submit'>Save</button>
          <button className='btn btn-secondary' onClick={() => setClassGroupEditModalOpen(false)}>Cancel</button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default ClassGroupEdit
