import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store';
import { getPayments, getPaymentSummary } from '../redux/slices/paymentSlice';
import AcademicYearDropDown from './AcademicYearDropDown';
import { Col, Row } from 'react-bootstrap';
import ClassGroupDropDown from './ClassGroupDropDown';
import AcademicTermDropDown from './AcademicTermDropDown';
import { showToastify } from '../utility/Toastify';


type AnyType = {
    [key: string]: string;
  };

const Arrears = (props: any) => {
    const {paymentSummary, payments} = useSelector((state: RootState) => state.payment);
    const [showToast, setShowToast] = useState(false);
    const {schoolId, branchId} = props;
    const dispatch = useDispatch<AppDispatch>();
    const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
        setParams((prevData) => ({
          ...prevData,
          [field]: value,
        }));
        // console.log('params===>', params);
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
        dispatch(getPaymentSummary({ ...params }))
        
    }, [dispatch, params])
  return (
    <>
    <h1>Arrears</h1>
    <Row>
        <Col>
            <AcademicYearDropDown schoolId={schoolId} branchId={branchId} onChange={handleInputChange} />   
        </Col>
        <Col>
            <AcademicTermDropDown schoolId={schoolId} branchId={branchId} onChange={handleInputChange} yearId={undefined} />
        </Col>
        <Col>
            <ClassGroupDropDown programId={0} stageId={0} departmentId={0} lesson={undefined} onChange={handleInputChange} />   
        </Col>
    </Row>
    </>
  )
}

export default Arrears