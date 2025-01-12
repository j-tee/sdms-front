import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { ToastContext } from '../utility/ToastContext';
import { SubscriptionFee } from '../models/subscriptionFee';
import { Button, Form, Table } from 'react-bootstrap';
import { addSubscriptionFee, getSubscriptionFees } from '../redux/slices/subscriptionFeeSlice';
import { showToastify } from '../utility/Toastify';

const SubscriptionFeeCard = (props: any) => {
  const { subscriptionFees } = useSelector((state: RootState) => state.subscriptionFee);
  const { params, index } = props;
  const { setShowToast } = useContext(ToastContext);
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<SubscriptionFee>({
    // Initialize your formData properties
    amount: 0,
    duration: 0,
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowToast(true);
    dispatch(addSubscriptionFee(formData)).then((res: any) => {
      showToastify(res.payload.message, res.payload.status);
      dispatch(getSubscriptionFees()).then((res: any) => {
        showToastify(res.payload.message, res.payload.status);
      })
    });
  };

  useEffect(() => {
    if (index === 'third') {
      setShowToast(true);
      dispatch(getSubscriptionFees()).then((res: any) => {
        showToastify(res.payload.message, res.payload.status);
      });
    }
  }, [dispatch, params, index]);
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) })}
          />
        </Form.Group>
        <Form.Group controlId="duration">
          <Form.Label>Duration</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter duration"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>

      <Table striped size="sm" hover>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Duration (Days)</th>
          </tr>
        </thead>
        <tbody>
          {subscriptionFees.map((fee, index) => (
            <tr key={index}>
              <td>GHC{parseFloat(fee.amount.toString()).toFixed(2)}</td>
              <td>{fee.duration}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default SubscriptionFeeCard
