import React, { useContext, useEffect, useState } from 'react'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { Col, Form, Modal, Row } from 'react-bootstrap';
import { ToastContext } from '../utility/ToastContext';
import DepartmentDropDown from './DepartmentDropDown';
import { getPrograms, updateProgram } from '../redux/slices/programSlice';
import { showToastify } from '../utility/Toastify';
import '../css/ModernModal.css';

const ProgramEdit = (props: any) => {
  const { isOpen, onRequestClose, program, params, branchId, schoolId, setProgramEditModalOpen } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);
  const [formData, setFormData] = useState({
    id: 0,
    prog_name: '',
    department_id: '',
  })
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updateProgram({ ...formData } as any))
    .then((res: any) => {
      setShowToast(true);
      // showToastify(res.payload.message, res.payload.status);
      setProgramEditModalOpen(false);
      dispatch(getPrograms({ ...params, branch_id: branchId, department_id: formData.department_id, paginate: true }))
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

  };
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      id: program.id,
      prog_name: program.prog_name,
      department_id: program.department_id,
    }))
  }, [program])
  const handleClose = () => {
    setProgramEditModalOpen(false)
  }
  return (
    <Modal show={isOpen} animation centered onHide={onRequestClose} size='lg' className="modern-modal edit-modal">
      <Form onSubmit={handleSubmit}>
      <Modal.Header closeButton>
        <Modal.Title><i className="fas fa-edit"></i> Edit Program {program.prog_name}</Modal.Title>
      </Modal.Header>      
        <Modal.Body>
          <Row>
            <Col>
              <DepartmentDropDown branchId={branchId} schoolId={schoolId} onChange={handleInputChange} />
            </Col>
            <Col>
              <Form.Group className='mb-3'>
                <Form.Label>Program Name</Form.Label>
                <Form.Control type='text' 
                name='programName' value={formData.prog_name} 
                onChange={(e) => handleInputChange('prog_name', e.target.value)} />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button type='button' className='btn btn-outline-secondary' onClick={handleClose}><i className="fas fa-times"></i> Cancel</button>
          <button type='submit' className='btn btn-outline-primary'><i className="fas fa-save"></i> Update</button>
        </Modal.Footer>
      </Form>

    </Modal>
  )
}

export default ProgramEdit
