import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store';
import { getPayments, getPaymentSummary } from '../redux/slices/paymentSlice';
import AcademicYearDropDown from './AcademicYearDropDown';
import { Card, Col, Row, Table } from 'react-bootstrap';
import ClassGroupDropDown from './ClassGroupDropDown';
import AcademicTermDropDown from './AcademicTermDropDown';
import { showToastify } from '../utility/Toastify';


type AnyType = {
    [key: string]: string;
  };

const Arrearscard = (props: any) => {
    const {paymentSummary, payments} = useSelector((state: RootState) => state.payment);
    const {schoolId, branchId, tabIndex} = props;
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch<AppDispatch>();
    const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
        setParams((prevData) => ({
          ...prevData,
          [field]: value,
        }));
      } 
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
    useEffect(() => {   
      if(tabIndex === 'third'){
        dispatch(getPaymentSummary({ ...params }))
        dispatch(getPayments({ ...params })).then((res: any) => {
          setShowToast(true);
          showToastify(res.payload.message, res.payload.status);
      });
      }
    }, [dispatch, params, tabIndex])
  return (
    <>
    <h1>Arrears</h1>
    <Row>
        <Col>
            <AcademicYearDropDown schoolId={schoolId} branchId={branchId} onChange={handleInputChange} />   
        </Col>
        <Col>
            <AcademicTermDropDown schoolId={schoolId} branchId={branchId} yearId={params.academic_term_id} onChange={handleInputChange} />
        </Col>
        <Col>
            <ClassGroupDropDown programId={0} stageId={0} departmentId={0} lesson={undefined} onChange={handleInputChange} />   
        </Col>
    </Row>
    <Card>
        <Card.Header>
          <h4>Payment Summary</h4>
        </Card.Header>
        <Card.Body>
          <Card.Title>Arrears</Card.Title>
          <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Amount Due</th>
                  <th>Total Payments</th>
                  <th>Outstanding Balance</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment: any) => (
                  <tr key={payment.id}>
                    <td>{payment.student_id} {payment.full_name}</td>
                    <td>GHC {payment.amt_due}</td>
                    <td>GHC {payment.total_payments}</td>
                    <td>GHC {payment.outstanding_balance}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          <Card.Text>
            <p>Total Payment: GHS {parseFloat(paymentSummary.total_payment.toString()).toFixed(2)}</p>
            <p>Expected Inflows: GHS {parseFloat(paymentSummary.total_expected_inflows.toString()).toFixed(2)}</p>
            <p>Outstanding Balance: GHS {parseFloat(paymentSummary.outstanding_balance.toString()).toFixed(2)}</p>            
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default Arrearscard