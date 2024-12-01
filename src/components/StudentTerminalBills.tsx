import React, { useEffect, useRef } from 'react'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { getStudentRecentSubscription } from '../redux/slices/subscriptionSlice';
import { getStudentFees } from '../redux/slices/billsFeesSlice';
import { Button, Table } from 'react-bootstrap';

const StudentTerminalBills = (props: any) => {
  const { params, index, class_group } = props
  const { fees, total_bill } = useSelector((state: RootState) => state.billsFees)
  const dispatch = useDispatch<AppDispatch>();
  const { valid, subscription } = useSelector((state: RootState) => state.subscription)
  const componentRef = useRef<HTMLDivElement | null>(null);
  const handlePrint = useReactToPrint({ contentRef: componentRef });

  useEffect(() => {
    if(index === 'first') {
      dispatch(getStudentRecentSubscription({ ...params }));
    }
    
  }, [dispatch]);

  useEffect(() => {
    if(index === 'first' && (params && params.student_id > 0)) {
      dispatch(getStudentFees({ ...params }));
    }
  }, [class_group, index, params, dispatch]);
  return (
    <>
  {subscription && subscription.valid_subscription ? (
    <div ref={componentRef} className="p-3 border rounded bg-light">
      <Table size="sm" borderless striped hover>
        <thead>
          <tr style={{ borderBottom: 'solid 3px black ' }}>
            <th>Bill Item</th>
            <th>Quantity</th>
            <th>Unit Cost</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {fees &&
            fees.map((fee: any) => (
              <tr key={fee.id}>
                <td>{fee.item}</td>
                <td>{fee.quantity}</td>
                <td>GHS{parseFloat(fee.unit_cost).toFixed(2)}</td>
                <td>GHS{parseFloat(fee.total_cost).toFixed(2)}</td>
              </tr>
            ))}
          <tr style={{ borderTop: 'solid 3px black' }}>
            <td colSpan={3}>Total</td>
            <td>
              GHS{total_bill ? parseFloat(total_bill.toString()).toFixed(2) : parseFloat('0').toFixed(2)}
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="d-flex justify-content-center mt-3">
        <Button className="no-print" onClick={() => handlePrint()}>Print Bills!</Button>
      </div>
    </div>
  ) : (
    <div className="alert alert-warning">
      Your subscription has expired!
      <br />
      <strong>Expiry Date:</strong> {new Date(subscription && subscription.exp_date).toDateString()}
    </div>
  )}
</>

  )
}

export default StudentTerminalBills