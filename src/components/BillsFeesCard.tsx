import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { addFee, getFees } from '../redux/slices/billsFeesSlice';
import { showToastify } from '../utility/Toastify';
import { ToastContext } from '../utility/ToastContext';
import { Button, Col, Form, Row, Table } from 'react-bootstrap';
import AcademicYearDropDown from './AcademicYearDropDown';
import AcademicTermDropDown from './AcademicTermDropDown';
import ClassGroupDropDown from './ClassGroupDropDown';
import { get } from 'http';

type AnyType = {
  [key: string]: string;
};

const BillsFeesCard = (props: any) => {
  const { schoolId, branchId, yearId, index } = props;
  const { fees } = useSelector((state: RootState) => state.billsFees);
  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);

  const [formData, setFormData] = useState({
    academic_term_id: 0,
    class_group_id: 0,
    item: "",
    quantity: 0,
    unit_cost: 0,
  });

  const [params, setParams] = useState({  
    pagination: {
      per_page: 10000,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    },
    paginate: true
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addFee({ ...formData })).then((resp) => {
      showToastify(resp.payload.message, resp.payload.status);
      setShowToast(true);
      dispatch(getFees({school_id:schoolId,academic_year_id:yearId, branch_id:branchId, academic_term_id: formData.academic_term_id, class_group_id: formData.class_group_id, ...params }));
    })
  }
  const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  }

  useEffect(() => {
    dispatch(getFees({school_id:schoolId,academic_year_id:yearId, 
      branch_id:branchId, academic_term_id: formData.academic_term_id, class_group_id: formData.class_group_id, ...params }));
  }, [branchId, dispatch, formData.academic_term_id, formData.class_group_id, schoolId, yearId, params])

  return (
    <div className='mb-5'>
      <h1>Bills and Fees</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <AcademicYearDropDown schoolId={schoolId} branchId={branchId} onChange={handleInputChange} />
          </Col>
          <Col>
            <AcademicTermDropDown schoolId={schoolId} branchId={branchId} yearId={yearId} onChange={handleInputChange} />
          </Col>
          <Col>
            <ClassGroupDropDown onChange={handleInputChange} programId={0} stageId={0} lesson={undefined} departmentId={0} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="item">
              <Form.Label>Item</Form.Label>
              <Form.Control
                type="text"
                placeholder="Item"
                value={formData.item}
                onChange={(e) => handleInputChange('item', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="quantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantity"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="unit_cost">
              <Form.Label>Unit Cost</Form.Label>
              <Form.Control
                type="number"
                placeholder="Unit Cost"
                value={formData.unit_cost}
                onChange={(e) => handleInputChange('unit_cost', e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className='mt-4'>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>

      <Table className='mt-4' striped hover responsive bordered variant='dark' size='sm'>
        <thead>
          <tr>
            <th>#</th>
            <th>Item</th>
            <th>Quantity</th>
            <th>Unit Cost</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {fees.map((fee, index) => (
            <tr key={fee.id}>
              <td>{index + 1}</td>
              <td>{fee.item}</td>
              <td>{fee.quantity}</td>
              <td>{fee.unit_cost}</td>
              <td>{fee.quantity * fee.unit_cost}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default BillsFeesCard
