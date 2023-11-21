import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { loginUser } from '../redux/slices/authSlice';
import { Button, Form, Modal, Nav } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { useAuth } from '../utility/AuthContext';

const Login = (props:any) => {
    const {
        onRequestClose
      } = props;
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const { setShowToast } = useContext(ToastContext);
      const [validated, setValidated] = useState(false);
      const dispatch = useDispatch<AppDispatch>();
      const { isLoginModalOpen, closeLoginModal } = useAuth();
        
      const handleSubmit = (event:any) => {
        setShowToast(true);
        event.preventDefault();
        event.stopPropagation();
        const userData = {
          email,
          password,
        };
        dispatch(loginUser(userData)).then((response:any) => {
          setShowToast(true);
          if (response.meta) {
            if (response.meta.requestStatus === 'fulfilled') {
              showToastify('User logged in successfully', 'success');
            }
          }
          if (response.error) {
            showToastify(`Login failure!! ${response.payload}`, 'error');
          } else {
            closeLoginModal();
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          }
        }).catch((error:any) => {
          showToastify(error.message, 'error');
        });
        setValidated(true);
      };
      useEffect(() => {
        // Set modal top or any other logic you need
        // ...
      }, [isLoginModalOpen]);
      return (
        <>
          <Modal centered show={isLoginModalOpen} onHide={onRequestClose} size="sm">
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a email.
                  </Form.Control.Feedback>
                </Form.Group>
    
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a password.
                  </Form.Control.Feedback>
                </Form.Group>
                <Modal.Footer>
                  <span><Nav.Link href="/email">Forgotten your password?</Nav.Link></span>
                  <Button variant="primary" type="submit">
                    Login
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      );
}

export default Login
