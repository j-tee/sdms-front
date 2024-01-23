import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { ResetPasswdUserData } from '../models/authModel';
import { resetPassword } from '../redux/slices/authSlice';
import Header from './Header';

const ResetPasswordComponent = () => {
  const [validated, setValidated] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('')
  const { setShowToast } = useContext(ToastContext);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const resetPasswordToken = searchParams.get('resetPasswordToken');
    if (resetPasswordToken) {
      setToken(resetPasswordToken)
    }

  }, [location.search, setShowToast]);

  const handleSubmit = (event: any) => {
    setShowToast(true);
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      if (password !== confirmPassword) {
        showToastify('Password mismatch', 'error');
      } else {
        const pwd: ResetPasswdUserData = {
          password,
          password_confirmation: confirmPassword,
          reset_password_token: token,
        };
        dispatch(resetPassword(pwd)).then((res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            showToastify('Password reset was successful', 'success');
            navigate('/');
          } else if (res.meta.requestStatus === 'rejected') {
            showToastify('Failed to reset password', 'error');
          }
        }).catch((error) => {
          setError(error);
          showToastify(error.message, 'error');
        });
      }
    }
    setValidated(true);
  };
  return (
    <>
      <Header />
      <Container style={{ marginTop: '3.5rem' }}>
        &nbsp;
      </Container>
      <Container>
      <Form className="mt-5" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicPassword">
          <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Form.Control.Feedback type="invalid">
            Please enter a password.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formBasicConfirmPassword">
          <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <Form.Control.Feedback type="invalid">
            Please confirm your password.
          </Form.Control.Feedback>
          {error && <div className="text-danger">{error}</div>}
        </Form.Group>
        <Button className='mt-3' variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </Container>
    </>
  );
};

export default ResetPasswordComponent;
