import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { Container } from 'react-bootstrap';

const Confirmation = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState<string | undefined>(undefined);
  const { setShowToast } = useContext(ToastContext);
  const [countdown, setCountdown] = useState(5);
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const result = searchParams.get('result');

    if (result === 'success') {
      // setMessage('Confirmation was successful');
      setShowToast(true);
      showToastify('Confirmation was successful', 'success');
    } else if (result === 'failure') {
      setMessage('Confirmation failed');
      showToastify('Confirmation failed', 'error');
    } else {
      setMessage('Unknown Error');
      showToastify('Unknown error', 'error');
    }
  }, [location.search, navigate, setShowToast]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate('/');
    }
  }, [countdown, navigate]);
  return (
    <Container className="pt-5 mt-5">
    <h6>{message}</h6>
    <p>
      Redirecting to the home page in
      {' '}
      <strong>
        {countdown}
        {' '}
        seconds
      </strong>
      ...
    </p>
  </Container>
  )
}

export default Confirmation
