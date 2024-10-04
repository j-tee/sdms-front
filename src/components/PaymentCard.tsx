import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import AcademicYearDropDown from './AcademicYearDropDown';
import AcademicTermDropDown from './AcademicTermDropDown';
import ClassGroupDropDown from './ClassGroupDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { getRegisteredStudents } from '../redux/slices/studentRegSlice';
import StudentPaymentCard from './StudentPaymentCard';
import { getPaymentSummary } from '../redux/slices/paymentSlice';
import { tab } from '@testing-library/user-event/dist/tab';

type AnyType = {
  [key: string]: string;
};

const PaymentCard = (props:any) => {
  const {schoolId, branchId, tabIndex} = props;
  const {registrations} = useSelector((state: RootState) => state.studentReg);
    
  const dispatch = useDispatch<AppDispatch>();
  const [params, setParams] = useState({
    branch_id: branchId,
    school_id: schoolId,
    academic_year_id: 0,
    academic_term_id: 0,
    class_group_id: 0,
    paginate: false,
    pagination: {
      per_page: 10,
      current_page: 1,
      total_items: 0,
      total_pages: 0
    }
  })
  const handleSubmit = (e: any) => {  
    e.preventDefault();
    // console.log('submit', formData);
  }

const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
  setParams((prevData) => ({
    ...prevData,
    [field]: value,
  }));
  // console.log('params===>', params);
} 

useEffect(() => {
  if(tabIndex === 'second'){
    dispatch(getRegisteredStudents({ ...params }));
  dispatch(getPaymentSummary({ ...params }))
  }
}, [branchId, dispatch, params, params.class_group_id, params.academic_term_id, params.academic_year_id, schoolId, tabIndex])
  return (
    <>
      <h1>Payments</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <AcademicYearDropDown schoolId={schoolId} branchId={branchId} onChange={handleInputChange} />
          </Col>
          <Col>
            <AcademicTermDropDown schoolId={schoolId} branchId={branchId} yearId={params.academic_term_id} onChange={handleInputChange} />
          </Col>
          <Col>
            <ClassGroupDropDown onChange={handleInputChange} programId={0} stageId={0} lesson={undefined} departmentId={0} />
          </Col>
        </Row>
        
      </Form>
      
      {registrations && registrations.map((reg) => (
        <StudentPaymentCard key={reg.id} registration={reg} params={params} />
      ))}
    </>
  )
}

export default PaymentCard

