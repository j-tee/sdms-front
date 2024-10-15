import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentFees } from '../redux/slices/billsFeesSlice';
import { Table } from 'react-bootstrap';
import { getStudentRecentSubscription } from '../redux/slices/subscriptionSlice';

const StudentBillsCard = (props: any) => {
    const { tabIndex, class_group, student, params } = props;
    const { fees, total_bill } = useSelector((state: RootState) => state.billsFees)
    const dispatch = useDispatch<AppDispatch>();
    const {valid, subscription} = useSelector((state: RootState) => state.subscription)


  useEffect(() => {
    dispatch(getStudentRecentSubscription({ student_id: student.id }));
}, [dispatch, student]);

    useEffect(() => {
        dispatch(getStudentFees({ ...params, student_id: student.id }));
    }, [student, class_group, tabIndex, params, dispatch]);
    return (
        <>
            {subscription.id && subscription.valid_subscription ? (<>
                <Table size='sm' borderless striped hover>
                <thead>
                    <tr style={{borderBottom:'solid 3px black '}}>
                        <th>Bill Item</th>
                        <th>Quantity</th>
                        <th>Unit Cost</th>
                        <th>Total Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {fees && fees.map((fee: any) => (
                        <tr key={fee.id}>
                            <td>{fee.item}</td>
                            <td>{fee.quantity}</td>
                            <td>GHS{parseFloat(fee.unit_cost).toFixed(2)}</td>
                            <td>GHS{parseFloat(fee.total_cost).toFixed(2)}</td>
                        </tr>

                    ))}
                    <tr style={{borderTop:'solid 3px black'}}>
                        <td colSpan={3}>Total</td>
                        <td>GHS{total_bill ? parseFloat(total_bill.toString()).toFixed(2):parseFloat('0').toFixed(2)}</td>
                    </tr>
                </tbody>
            </Table>
            </>) : (<>Your subscription has expired! < br /> Expiry Date: {new Date(subscription && subscription.exp_date).toDateString()}</>)}    
        </>
    )
}

export default StudentBillsCard