import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store'
import { ToastContext } from '../utility/ToastContext'
import { QueryParams } from '../models/queryParams'
import { getSubscriptions, requestToPay, getMomoToken, initializeTransaction } from '../redux/slices/subscriptionSlice'
import { showToastify } from '../utility/Toastify'
import { getTaxes } from '../redux/slices/taxSlice'
import { getSubscriptionFees } from '../redux/slices/subscriptionFeeSlice'
import { Subscription } from '../models/subscription'
import { Button, Col, Form, Row } from 'react-bootstrap';
import PaystackPop from '@paystack/inline-js'


const StudentSubscription = (props: any) => {
  const { params, index } = props
  const { momo_token, subscriptions } = useSelector((state: RootState) => state.subscription)
  const { taxes } = useSelector((state: RootState) => state.tax)
  const { subscriptionFees } = useSelector((state: RootState) => state.subscriptionFee)
  const [amount, setAmount] = React.useState<number>(0)
  const [duration, setDuration] = React.useState<number>(0)
  const [fee, setFee] = React.useState<number>(0)
  const [totalTax, setTotalTax] = React.useState<number>(0)
  const [months, setMonths] = React.useState<number>(0)
  const dispatch = useDispatch<AppDispatch>()
  //   const [trigger, setTrigger] = useState<boolean>(true)

  const { setShowToast } = useContext(ToastContext)
  const [payer, setPayer] = useState<any>({
    partyIdType: 'MSISDN',
    partyId: ''
  })

  const [formData, setFormData] = useState<Subscription>({
    student_id: 0,
    amount: 0,
    transaction_id: '',
    subscription_fee_id: 0,
    subscription_date: '',
    ref_id: '',
    duration: 0,
  })

  const handleChange = (name: string, value: any) => {
    setFormData({ ...formData, [name]: value })
    switch (name) {
      case 'subscription_fee_id':
        const fee = subscriptionFees.find((fee: any) => fee.id === parseInt(value))
        if (fee) {
          setFee(fee.amount)
        }
        break;
      case 'duration':
        setDuration(value)
        setMonths(value / 30)
        break;
      default:
        break;
    }

  }
  const makePayment = () => {
    const popup = new PaystackPop()
    let access_code = '';
    let auth_url = '';
    dispatch(initializeTransaction({ ...formData })).then((resp: any) => {
     if(resp.payload.status === 200){
      access_code = resp.payload.response.data.access_code
      popup.resumeTransaction(access_code)
     }
    })
  }

  useEffect(() => {
    if (index === 'fourth' && (params && params.student_id)) {
      dispatch(getTaxes()).then((response: any) => {
        setTotalTax(taxes.reduce((sum, tax) => sum + tax.rate, 0));
        showToastify(response.payload.message, response.payload.status)
      })
      setAmount((fee * months) + (fee * months * (totalTax / 100)))
      setFormData((prevState) => ({
        ...prevState,
        student_id: params.student_id,
        amount: amount,
      }))
      dispatch(getSubscriptionFees()).then((response: any) => {
        showToastify(response.payload.message, response.payload.status)
      })
      dispatch(getSubscriptions({ ...params })).then((response: any) => {
        showToastify(response.payload.message, response.payload.status)
        const subscription = subscriptions.find((subscription: any) => subscription.student_id === params.student_id)
        if (subscription) {
          setFormData((prevState) => ({
            ...prevState,
            student_id: subscription.student_id,
          }))
        }
      })
    }
  }, [dispatch, setShowToast, amount, fee, duration, months, payer, index])
  return (
    <>
      {subscriptions.map((subscription: any) => (
        <div key={subscription.id}>
          <div className='row'>
            <div className='col-md-6'>
              <p>Subscription Fee</p>
            </div>
            <div className='col-md-6'>
              <p>GHS{parseFloat(subscription.fee).toFixed(2)}</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <p>Taxes</p>
            </div>
            <div className='col-md-6'>
              <p>GHS{subscription.taxes}</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <p>Amount Paid</p>
            </div>
            <div className='col-md-6'>
              <p>GHS{parseFloat(subscription.amt_due).toFixed(4)}</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <p>Expiry Date</p>
            </div>
            <div className='col-md-6'>
              <p>{new Date(subscription && subscription.exp_date).toDateString()}</p>
            </div>
          </div>
          <div className='row'>
            <div className='col-md-6'>
              <p>Status</p>
            </div>
            <div className='col-md-6'>
              <p>{subscription.status}</p>
            </div>
          </div>
        </div>
      ))}
      <Form>
        <Row>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Subscription Fee</Form.Label>
              <Form.Select aria-label='Subscription Fee' name='subscription_fee_id'
                onChange={(e) => handleChange('subscription_fee_id', parseInt(e.target.value))}>
                <option value=''>---Select---</option>
                {subscriptionFees.map((fee: any) => (
                  <option key={fee.id} value={fee.id}>GHS{fee.amount} for  {fee.duration} Days</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3'>
              <Form.Label>Duration</Form.Label>
              <Form.Select name='duration'
                onChange={(e) => handleChange('duration', parseInt(e.target.value))}>
                <option value='0'>---Select---</option>
                <option value='30'>30 Days</option>
                <option value='90'>90 Days</option>
                <option value='180'>180 Days</option>
                <option value='365'>365 Days</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <span>Taxes</span>
        <span>
          {taxes.map((tax: any) => (
            <div key={tax.id}>
              <p>{tax.tax_name}: {tax.rate}%</p>
            </div>
          ))}
        </span>
        <Row>
          <Col>
            Amount Due: GHS{parseFloat(amount.toString()).toFixed(2)}
          </Col>
        </Row>
        <Button onClick={makePayment}>Subscribe</Button>
      </Form>
    </>
  )
}

export default StudentSubscription


 // dispatch(requestToPay(requestData)).then((response: any) => {
    //   setShowToast(true)
    //   showToastify(response.payload.message, response.payload.status)
    //   dispatch(getSubscriptions({ ...params })).then((response: any) => {
    //     showToastify(response.payload.message, response.payload.status)
    //     const subscription = subscriptions.find((subscription: any) => subscription.student_id === params.student_id)
    //     if (subscription) {
    //       setFormData((prevState) => ({
    //         ...prevState,
    //         student_id: subscription.student_id,
    //       }))
    //     }
    //     // setTimeout(() => {
    //     //     window.location.reload();
    //     // }, 5000);  // 5000ms = 5 seconds
    //   })
    // })

  // useEffect(() => {
  //   if (index === 'fourth' && (params && params.student_id) && (momo_token.access_token === '' || !momo_token.access_token)) {
  //     dispatch(getMomoToken()).then((response: any) => {
  //       sessionStorage.setItem('momo_token', response.payload.momo_token.access_token)
  //     })

  //   }

  // }, [momo_token, index, params, dispatch, amount, fee, duration, months, payer])

