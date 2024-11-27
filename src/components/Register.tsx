import React, { useContext, useState } from 'react'
import { ToastContext } from '../utility/ToastContext';
import { RegisterUserModel } from '../models/authModel';
import { showToastify } from '../utility/Toastify';
import { registerUser } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { Button, Form, Modal } from 'react-bootstrap';

const Register = (props: any) => {
  const {
    isOpen, setRegisterModalOpen, onRequestClose,
  } = props;
  const [error, setError] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState<RegisterUserModel>({
    username: '',
    password: '',
    password_confirmation: '',
    email: '',
    avatar: null,
    user_category:''
  })
  const { setShowToast } = useContext(ToastContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setShowToast(true);
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      if (formData.password !== formData.password_confirmation) {
        showToastify('Password mismatch', 'error');
      } else {
        dispatch(registerUser(formData)).then((res: any) => {
          setShowToast(true);
          if (res.meta.requestStatus === 'fulfilled') {
            showToastify('You registration was successfully completed. You will receive an email with a link to confirm your account', 'success');
            setFormData({
              username: '',
              password: '',
              password_confirmation: '',
              email: '',
              user_category: '',
              avatar: null
            });
            setRegisterModalOpen(false);
          }
          if (res.meta.requestStatus === 'rejected') {
            if (res.error.message === 'Rejected') {
              showToastify(`Your registration has failed,${res.payload.status.message}`, 'error');
            }
          }
        }).catch((error: any) => {
          setError(error);
          showToastify(error.message, 'error');
        });
      }
    }
    setValidated(true);
  };

  return (
    <Modal show={isOpen} centered onHide={onRequestClose} size="sm">
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Control type="text" placeholder="Username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} required />
            <Form.Control.Feedback type="invalid">
              Please enter your name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Control type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Control type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Control type="password" placeholder="Confirm Password" value={formData.password_confirmation} onChange={(e) => setFormData({ ...formData, password_confirmation: e.target.value })} required />
            <Form.Control.Feedback type="invalid">
              Please confirm your password.
            </Form.Control.Feedback>
            {error && <div className="text-danger">{error}</div>}
          </Form.Group>

          <Form.Group controlId="userCategory">
            <Form.Control
              as="select"
              name="userCategory"
              value={formData.user_category}
              onChange={(e) => setFormData({...formData, user_category: e.target.value})}
            >
              <option value="">Select User Category</option>
              <option value="Owner">Owner / Manager / Headmaster</option>
              <option value="Parent">Parent</option>
              <option value="Student">Student</option>
              <option value="Staff">Teacher</option>
              <option value="Employee">Company Staff</option>
            </Form.Control>
          </Form.Group>
          <Modal.Footer>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Register
