import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getPayments } from '../redux/slices/paymentSlice';
import { Table } from 'react-bootstrap';
import { formatDate } from '../models/utilities';
import { getStudentRecentSubscription } from '../redux/slices/subscriptionSlice';

const StudentPaymentDetails = (props: any) => {
    const { tabIndex, class_group, student, params } = props;
    const { payments } = useSelector((state: RootState) => state.payment)
    const { total_bill } = useSelector((state: RootState) => state.billsFees)
    const dispatch = useDispatch<AppDispatch>();
    const { valid, subscription } = useSelector((state: RootState) => state.subscription)


    useEffect(() => {
        if (tabIndex === 'second') {
            dispatch(getStudentRecentSubscription({ student_id: student.id }));
        }

    }, [dispatch, tabIndex, student]);

    useEffect(() => {

        if (params.academic_year_id && params.academic_term_id && class_group && tabIndex === 'second') {

            dispatch(getPayments({
                academic_term_id: params.academic_term_id,
                class_group_id: class_group.id,
                student_id: student.id,
            }));
        }
    }, [dispatch, student, class_group, tabIndex, params]);

    return (
        <>
            {subscription && subscription.valid_subscription ? (<>
                <h3>{student.last_name} {student.first_name} Payment details</h3>
                <Table size='sm' responsive borderless striped hover>
                    <thead>
                        <tr style={{ borderBottom: 'solid 3px black' }}>
                            <th>Payment Date</th>
                            <th>Payments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments && payments.map((payment: any) => (
                            <tr key={payment.id}>
                                <td>{formatDate(payment.payment_date)}</td>
                                <td>GHS{parseFloat(payment.amount_paid).toFixed(2)}</td>
                            </tr>
                        ))}
                        <tr style={{ borderTop: 'solid 3px black' }}>
                            <td>Total Payments</td>
                            <td>GHS{payments.reduce((acc: any, payment: any) => acc + parseFloat(payment.amount_paid), 0).toFixed(2)}</td>
                        </tr>
                        <tr style={{ borderTop: 'solid 3px black' }}>
                            <td>Total Bill</td>
                            <td>GHS{total_bill ? parseFloat(total_bill.toString()).toFixed(2) : parseFloat('0').toFixed(2)}</td>
                        </tr>
                        <tr style={{ borderTop: 'solid 3px black' }}>
                            <td>Outstanding Balance</td>
                            <td>
                                GHS
                                {total_bill
                                    ? (parseFloat(total_bill.toString()) - payments.reduce((acc: number, payment: any) => acc + parseFloat(payment.amount_paid), 0)).toFixed(2)
                                    : parseFloat('0').toFixed(2)
                                }
                            </td>
                        </tr>
                    </tbody>
                </Table>

            </>) : (<>Your subscription has expired! < br />Expired Date: {new Date(subscription && subscription.exp_date).toDateString()}</>)}
        </>
    )
}

export default StudentPaymentDetails