import React, { useContext, useRef, useState } from "react";
import { ToastContext } from "../utility/ToastContext";
import { RegisterUserModel } from "../models/authModel";
import { showToastify } from "../utility/Toastify";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { Button, Form, Modal } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";
import './Register.css';

const Register = (props: any) => {
  const { isOpen, setRegisterModalOpen, onRequestClose } = props;
  const [error, setError] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [validated, setValidated] = useState(false);
  const recaptcha = useRef<ReCAPTCHA | null>(null);
  const [formData, setFormData] = useState<RegisterUserModel>({
    username: "",
    password: "",
    password_confirmation: "",
    email: "",
    avatar: null,
    user_category: "",
  });
  const { setShowToast } = useContext(ToastContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setShowToast(true);
    // const captcha = recaptcha.current ? recaptcha.current.getValue() : "";
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    // if (!captcha) {
    //   showToastify("Please verify the reCAPTCHA!", "error");
    //   return;
    // }else{
     
    // }
    if (form.checkValidity() === true) {
      if (formData.password !== formData.password_confirmation) {
        showToastify("Password mismatch", "error");
      } else {
        dispatch(registerUser(formData))
          .then((res: any) => {
            setShowToast(true);
            if (res.meta.requestStatus === "fulfilled") {
              showToastify(
                "You registration was successfully completed. You will receive an email with a link to confirm your account",
                "success"
              );
              setFormData({
                username: "",
                password: "",
                password_confirmation: "",
                email: "",
                user_category: "",
                avatar: null,
              });
              setRegisterModalOpen(false);
            }
            if (res.meta.requestStatus === "rejected") {
              if (res.error.message === "Rejected") {
                showToastify(
                  `Your registration has failed, ${res.payload.status.message}`,
                  "error"
                );
              }
            }
          })
          .catch((error: any) => {
            setError(error);
            showToastify(error.message, "error");
          });
      }
    }
    setValidated(true);
  };

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   setShowToast(true);
  //   const captcha = recaptcha.current ? recaptcha.current.getValue() : "";
  //   const form = event.currentTarget;
  //   event.preventDefault();
  //   event.stopPropagation();
  //   if (!captcha) {
  //     showToastify("Please verify the reCAPTCHA!", "error");
  //     return;
  //   }else{
  //     if (form.checkValidity() === true) {
  //       if (formData.password !== formData.password_confirmation) {
  //         showToastify("Password mismatch", "error");
  //       } else {
  //         dispatch(registerUser(formData))
  //           .then((res: any) => {
  //             setShowToast(true);
  //             if (res.meta.requestStatus === "fulfilled") {
  //               showToastify(
  //                 "You registration was successfully completed. You will receive an email with a link to confirm your account",
  //                 "success"
  //               );
  //               setFormData({
  //                 username: "",
  //                 password: "",
  //                 password_confirmation: "",
  //                 email: "",
  //                 user_category: "",
  //                 avatar: null,
  //               });
  //               setRegisterModalOpen(false);
  //             }
  //             if (res.meta.requestStatus === "rejected") {
  //               if (res.error.message === "Rejected") {
  //                 showToastify(
  //                   `Your registration has failed,${res.payload.status.message}`,
  //                   "error"
  //                 );
  //               }
  //             }
  //           })
  //           .catch((error: any) => {
  //             setError(error);
  //             showToastify(error.message, "error");
  //           });
  //       }
  //     }
  //   }
    
  //   setValidated(true);
  // };

  return (
    <Modal show={isOpen} centered onHide={onRequestClose} className="auth-modal-modern register-modal">
      <Modal.Header closeButton className="border-0 pb-0">
        <div className="w-100 text-center">
          <div className="auth-icon-wrapper mb-3">
            <i className="fas fa-user-plus"></i>
          </div>
          <Modal.Title className="auth-modal-title">Create Account</Modal.Title>
          <p className="auth-modal-subtitle">Join us today! Fill in your details below</p>
        </div>
      </Modal.Header>
      <Modal.Body className="pt-2">
        <Form noValidate validated={validated} onSubmit={handleSubmit} className="auth-form-modern">
          <Form.Group controlId="formBasicName" className="mb-3">
            <Form.Label className="modern-label">
              <i className="fas fa-user me-2"></i>Username
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
              className="modern-input"
            />
            <Form.Control.Feedback type="invalid">
              Please enter your username.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label className="modern-label">
              <i className="fas fa-envelope me-2"></i>Email Address
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="modern-input"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label className="modern-label">
              <i className="fas fa-lock me-2"></i>Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="modern-input"
            />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
            <Form.Label className="modern-label">
              <i className="fas fa-check-circle me-2"></i>Confirm Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm your password"
              value={formData.password_confirmation}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password_confirmation: e.target.value,
                })
              }
              required
              className="modern-input"
            />
            <Form.Control.Feedback type="invalid">
              Please confirm your password.
            </Form.Control.Feedback>
            {error && <div className="text-danger mt-2 small">{error}</div>}
          </Form.Group>

          <Form.Group controlId="userCategory" className="mb-4">
            <Form.Label className="modern-label">
              <i className="fas fa-users-cog me-2"></i>User Category
            </Form.Label>
            <Form.Control
              as="select"
              name="userCategory"
              value={formData.user_category}
              onChange={(e) =>
                setFormData({ ...formData, user_category: e.target.value })
              }
              className="modern-select"
            >
              <option value="">Select Your Role</option>
              <option value="Owner">Owner / Manager / Headmaster</option>
              <option value="Parent">Parent</option>
              <option value="Student">Student</option>
              <option value="Staff">Teacher</option>
              <option value="Employee">Company Staff</option>
            </Form.Control>
          </Form.Group>

          {/* <ReCAPTCHA
            ref={recaptcha}
            sitekey={process.env.REACT_APP_SITE_KEY || ""}
            className="mb-3 d-flex justify-content-center"
          /> */}
          
          <Button
            variant="primary"
            type="submit"
            className="auth-button-modern w-100"
          >
            <i className="fas fa-user-plus me-2"></i>Create Account
          </Button>
        </Form>
      </Modal.Body>
    </Modal>

  );
};

export default Register;
