import { Button, Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import PaymentDialog from './PaymentDialog';
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentSummary } from '../redux/slices/paymentSlice';

const StudentPaymentCard = (props: any) => {
  const { params, registration } = props;
    
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  return (
    <Card className='mt-3'>
      <Card.Header>{registration.full_name}</Card.Header>
      <Card.Body className='student-info'>
        <Card.Img variant="top" src={registration.image_url} style={{ width: '100px', height: '100px' }} />
        <Card.Text>
          <p>Class: {registration.student_class}</p>
          <p>Academic Year: {registration.academic_year}</p>
          <p>Academic Term: {registration.academic_term_name} - {registration.academic_term_start_date}/{registration.academic_term_end_date} </p>
        </Card.Text>
        <Button onClick={openModal}
          id={`btn${registration.student_id}`}
          variant="primary" type="submit"><i className="fa fa-money"></i>View Bills, Fees and Payment Information</Button>
      </Card.Body>
      <PaymentDialog
        params={params}
        student={registration}
        isOpen={isModalOpen}
        onClose={closeModal}
        onRequestClose={() => closeModal} />
    </Card>
  )
}

export default StudentPaymentCard