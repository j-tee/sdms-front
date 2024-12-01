import React, { useEffect } from 'react'
import { AppDispatch, RootState } from '../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getPayments } from '../redux/slices/paymentSlice';
import { Table } from 'react-bootstrap';

const StudentPayments = (props: any) => {
  const {params, index} = props
  const { payments, pagination, amt_due, total_payments, outstanding_balance } = useSelector((state: RootState) => state.payment)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (index === 'second' && (params && params.student_id)) {
      dispatch(getPayments({ ...params, paginate: true }))
    }
  }, [dispatch, index, params])
  return (
    <>
  <h1>Payments</h1>
  <Table striped size="sm" responsive>
    <thead>
      <tr>
        <th>Payment Date</th>
        <th>Student</th>
        <th>Amt Paid</th>
      </tr>
    </thead>
    <tbody>
      {payments &&
        payments.map((payment) => (
          <tr key={payment.id}>
            <td>{payment.payment_date}</td>
            <td>
              {payment.student_id} {payment.full_name}
            </td>
            <td>GHC{payment.amount_paid}</td>
          </tr>
        ))}
      <tr className="table-info fs-5 fw-bold">
        <td>Amount Due</td>
        <td>Outstanding Balance</td>
        <td>Total Payments</td>
      </tr>
      <tr
        className={`fw-bold ${
          outstanding_balance <= 0 ? 'table-success' : 'table-danger'
        }`}
      >
        <td>GHC{amt_due}</td>
        <td>GHC{outstanding_balance}</td>
        <td>GHC{total_payments}</td>
      </tr>
    </tbody>
  </Table>
</>

  )
}

export default StudentPayments