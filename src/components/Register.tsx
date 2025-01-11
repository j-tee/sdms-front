import React, { useContext, useRef, useState } from "react";
import { ToastContext } from "../utility/ToastContext";
import { RegisterUserModel } from "../models/authModel";
import { showToastify } from "../utility/Toastify";
import { registerUser } from "../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { Button, Form, Modal } from "react-bootstrap";
import ReCAPTCHA from "react-google-recaptcha";

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
    <Modal show={isOpen} centered onHide={onRequestClose}>
  <Modal.Header closeButton>
    <Modal.Title className="text-center w-100">Register</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form noValidate validated={validated} onSubmit={handleSubmit} className="px-3">
      <Form.Group controlId="formBasicName" className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          required
          className="rounded-pill"
        />
        <Form.Control.Feedback type="invalid">
          Please enter your name.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicEmail" className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
          className="rounded-pill"
        />
        <Form.Control.Feedback type="invalid">
          Please enter a valid email address.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicPassword" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
          className="rounded-pill"
        />
        <Form.Control.Feedback type="invalid">
          Please enter a password.
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="formBasicConfirmPassword" className="mb-3">
        <Form.Label>Confirm Password</Form.Label>
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
          className="rounded-pill"
        />
        <Form.Control.Feedback type="invalid">
          Please confirm your password.
        </Form.Control.Feedback>
        {error && <div className="text-danger mt-2">{error}</div>}
      </Form.Group>

      <Form.Group controlId="userCategory" className="mb-4">
        <Form.Label>User Category</Form.Label>
        <Form.Control
          as="select"
          name="userCategory"
          value={formData.user_category}
          onChange={(e) =>
            setFormData({ ...formData, user_category: e.target.value })
          }
          className="rounded-pill"
        >
          <option value="">Select User Category</option>
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
      
      <Modal.Footer>
        <Button
          variant="primary"
          type="submit"
          className="w-100 rounded-pill"
        >
          Register
        </Button>
      </Modal.Footer>
    </Form>
  </Modal.Body>
</Modal>

  );
};

export default Register;
