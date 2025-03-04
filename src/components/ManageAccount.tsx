import React, { useContext, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { AppDispatch } from '../redux/store';
import { useDispatch } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { sendAccountConfirmationLink } from '../redux/slices/authSlice';
import { showToastify } from '../utility/Toastify';

const ManageAccount = (props: any) => {
  const { email } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);
  const [isLocked, setLocked] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [isClosed, setClosed] = useState(false);
  const handleLockAccount = () => setLocked(!isLocked);
  const handleDisableAccount = () => setDisabled(!isDisabled);
  const handleClosedAccount = () => setClosed(!isClosed);
  const handleConfirmAccount = (): void =>{
    setShowToast(true)
    dispatch(sendAccountConfirmationLink(email))
    .then((resp) => {
      showToastify(resp.payload.message, resp.payload.status)
    })
  }

  return (
    <div className='m-3'>
      <h4>Management Account</h4>
      <Form>
        <Row className="mb-3">
          <Col>
          <Form.Check
              type="switch"
              id="custom-switch"
              label="Lock Account"
              checked={isLocked}
              onChange={handleLockAccount}
            />
          </Col>
          <Col>
            <Form.Check
              type="switch"
              id="custom-switch"
              label="Close Account"
              checked={isClosed}
              onChange={handleClosedAccount}
            />
          </Col>
        </Row>
        <Row>
          <Col>
          <Button variant="info" onClick={handleConfirmAccount}>
            Resend Confirmation Link
          </Button>
          </Col>
        </Row>
      </Form>

    </div>
  )
}

export default ManageAccount
