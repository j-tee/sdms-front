/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Container, Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContext } from '../utility/ToastContext';
import { AppDispatch, RootState } from '../redux/store';
import { requestPasswordReset } from '../redux/slices/authSlice';
import Header from './Header';
import { useNavigate } from 'react-router-dom';
import { showToastify } from '../utility/Toastify';

const Email = () => {
  const { message, isSuccessful } = useSelector((state:RootState) => state.auth);
  const [email, setEmail] = useState<string>('');
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);
  const navigate = useNavigate();

  const handleSubmit = (event:any) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(requestPasswordReset(email)).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        setShowToast(true)
        navigate('/');
        showToastify('Password reset link has been sent to your email', 'success');
      }
    } ).catch((error) => {
      setShowToast(true);
    } );
    setValidated(true);
  };
  useEffect(() => {
    if (isSuccessful) {
      setShowToast(true);
    }
  }, [isSuccessful, message, setShowToast]);
  return (
    <>
        {/* <Header /> */}
      {/* <Container style={{ marginTop: '3.5rem' }}>
        &nbsp;
      </Container> */}

      <Form className="email-form pe-5 ps-5 me-5 ms-5 mt-5" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address.
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Email;
