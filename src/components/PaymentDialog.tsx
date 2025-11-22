import React, { useEffect, useState } from 'react';
import { Modal, Table, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { addPayment, getPayments, getPaymentSummary } from '../redux/slices/paymentSlice';
import { showToastify } from '../utility/Toastify';
import { formatDate } from '../models/utilities';
import CustomDatePicker from './CustomDatePicker';

const PaymentDialog = (props: any) => {
    const { isOpen, onClose, onRequestClose, student, params } = props;
    const { payments, paymentSummary, payment } = useSelector((state: RootState) => state.payment);
    const dispatch = useDispatch<AppDispatch>();
    const [showToast, setShowToast] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({
        amount_paid: '',
        payment_date: '',
    });
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setPaymentDetails({
            ...paymentDetails,
            [name]: value, // Dynamically update the state for the specific input field
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const payment = {
            amount_paid: paymentDetails.amount_paid,
            payment_date: paymentDetails.payment_date,
            student_id: student.student_id,
            academic_term_id: params.academic_term_id,
            class_group_id: params.class_group_id
        };

        // Dispatch payment to the Redux store
        dispatch(addPayment({ ...payment })).then(
            (res: any) => {
                dispatch(getPayments({ ...params, student_id: student.student_id }));
                dispatch(getPaymentSummary({ ...params, student_id: student.student_id }));
                setShowToast(true);
                showToastify(res.payload.message, res.payload.status);
            }
        );
    };

    const handleClose = () => {
        onClose(true);
    };

    useEffect(() => {
        if (isOpen) {
            dispatch(getPayments({ ...params, student_id: student.student_id })).then((res: any) => {
                setShowToast(true);
                showToastify(res.payload.message, res.payload.status);
            });

            dispatch(getPaymentSummary({ ...params, student_id: student.student_id })).then((res: any) => {
                setShowToast(true);
                showToastify(res.payload.message, res.payload.status);
            });
        }
    }, [isOpen, dispatch, params, student.student_id]); // Make sure to add dependencies

    if (!isOpen) return null;

    return (
        <Modal show={isOpen} centered animation onHide={onRequestClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Payment of Bills and Fees</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {student && (
                    <p>
                        <span>{student.full_name}</span>
                    </p>
                )}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='amount'>
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type='number'
                            name='amount_paid'
                            placeholder='Enter Amount'
                            // value={paymentDetails.amount_paid}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId='payment_date'>
                        <Form.Label>Payment Date</Form.Label>
                        <CustomDatePicker
                            value={paymentDetails.payment_date || ''}
                            placeholder='Enter Payment Date'
                            onChange={(date) => handleInputChange({target: {name: 'payment_date', value: date}})}
                        />
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Submit
                    </Button>
                </Form>
                <Table size='sm' borderless responsive striped hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Amount</th>
                            <th>Payment Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments && payments.map((payment, index) => (
                            <tr key={payment.id}>
                                <td>{index + 1}</td>
                                <td>GHS {parseFloat(payment.amount_paid.toString()).toFixed(2)}</td>
                                <td>{formatDate(payment.payment_date)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <p>Total Bill: GHS {parseFloat(paymentSummary.total_fees.toString()).toFixed(2)}</p>
                <p>Total Amount Paid: GHS {parseFloat(paymentSummary.total_payment.toString()).toFixed(2)}</p>
                <p>Total Amount Due: GHS {parseFloat(paymentSummary.amount_due.toString()).toFixed(2)}</p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary" onClick={handleClose}>Close</button>
            </Modal.Footer>
        </Modal>
    );
};

export default PaymentDialog;
