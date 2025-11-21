import React, { useContext, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { loginUser, verifyCapture } from '../redux/slices/authSlice';
import { Button, Form, Modal, Nav } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import ReCAPTCHA from 'react-google-recaptcha';
import { ToastContext } from '../utility/ToastContext';
import { showToastify } from '../utility/Toastify';
import { useAuth } from '../utility/AuthContext';
import './Login.css';

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
      const recaptcha = useRef<ReCAPTCHA | null>(null);
        
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
        // const captcha = recaptcha.current ? recaptcha.current.getValue() : '';
        // if (!captcha) {
        //   showToastify('Please verify the reCAPTCHA!', 'error');
        //   return;
        // } else{
        //   dispatch(verifyCapture({captchaValue:captcha})).then((response:any) => {           
        //     showToastify(response.payload.message, response.payload.status);
        //     if (response.payload.data.success === true) {
              
        //     }else{
        //       showToastify('Captcha verification failed', 'error');
        //     }
        //   });
        // }
        
        
        setValidated(true);
      };
      useEffect(() => {
        // Set modal top or any other logic you need
        // ...
      }, [isLoginModalOpen]);
      return (
        <>
          <Modal centered show={isLoginModalOpen} onHide={onRequestClose} className="auth-modal-modern">
            <Modal.Header closeButton className="border-0 pb-0">
              <div className="w-100 text-center">
                <div className="auth-icon-wrapper mb-3">
                  <i className="fas fa-user-circle"></i>
                </div>
                <Modal.Title className="auth-modal-title">Welcome Back</Modal.Title>
                <p className="auth-modal-subtitle">Sign in to continue to your account</p>
              </div>
            </Modal.Header>
            <Modal.Body className="pt-2">
              <Form noValidate validated={validated} onSubmit={handleSubmit} className="auth-form-modern">
                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Label className="modern-label">
                    <i className="fas fa-envelope me-2"></i>Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    required
                    className="modern-input"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
    
                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label className="modern-label">
                    <i className="fas fa-lock me-2"></i>Password
                  </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className="modern-input"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please enter your password.
                  </Form.Control.Feedback>
                </Form.Group>

                <div className="text-end mb-4">
                  <Nav.Link href="/email" className="forgot-password-link">
                    <i className="fas fa-key me-1"></i>Forgot password?
                  </Nav.Link>
                </div>
                
                <Button variant="primary" type="submit" className="auth-button-modern w-100 mb-3">
                  <i className="fas fa-sign-in-alt me-2"></i>Sign In
                </Button>
              </Form>
              {/* <ReCAPTCHA ref={recaptcha}  sitekey={process.env.REACT_APP_SITE_KEY || ''} /> */}
            </Modal.Body>
          </Modal>
        </>
      );
}

export default Login
