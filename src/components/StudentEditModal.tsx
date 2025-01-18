import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Form, Modal, Row, Col, Image } from "react-bootstrap";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { Student } from "../models/student";
import { ToastContext } from "../utility/ToastContext";
import { getStudents, updateStudent } from "../redux/slices/studentSlice";
import { showToastify } from "../utility/Toastify";

const StudentEditModal = (props: any) => {
  const { isOpen, onRequestClose, branchId, schoolId, student, params } = props;
  const { countries } = useSelector((state: RootState) => state.student);
  const { setShowToast } = useContext(ToastContext);
  const dispatch = useDispatch<AppDispatch>();
	const [studentImagePreview, setStudentImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState<Student>({
    id: 0,
    first_name: "",
    last_name: "",
    other_names: "",
    birth_date: "",
    nationality: "",
    gender: "",
    parent_id: 0,
    student_id: "",
    avatar: null,
  });

	const handleFileChange = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files.length > 0 ? (e.target.files[0] as File) : null;
    if (file && file.size > 102400) {
          showToastify('Image size should not exceed 100KB', 'error');
          return;
        }
		setFormData((prevData) => ({
			...prevData,
			[field]: file // Assuming you want to store the filename
		}));

		// Optionally, preview the selected image
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setStudentImagePreview(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};
  const handleSubmit = (event: any): void => {
    event.preventDefault();
    // Handle form submission
    const studentInfo = new FormData();
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        if (key !== 'avatar') {
          studentInfo.append(`student[${key}]`, (formData as any)[key]);
        }
      }
    }
    if (formData.avatar instanceof File) {
      studentInfo.append('student[avatar]', formData.avatar);
    }
   
    dispatch(updateStudent(studentInfo)).then((result: any) => {
      setShowToast(true);
      showToastify(result.payload.message, result.payload.status);
      if (result.payload.status === "success") {
        dispatch(getStudents({...params, school_id: schoolId, branch_id: branchId}));
        onRequestClose();
      }
    });
  };
  const handleInputChange = (field: string | number, value: string) => {
    setFormData((prevData) => ({
			...prevData,
			[field]: value
		}));
  };
	useEffect(() => {
		if(student){
			setFormData({
				id: student.id || 0,
				first_name: student.first_name || "",
				last_name: student.last_name || "",
				other_names: student.other_names || "",
				birth_date: student.birth_date || "",
				nationality: student.nationality || "",
				gender: student.gender || "",
				parent_id: student.parent_id || 0,
				student_id: student.student_id || "",
				avatar: student.avatar || null,
			});
			setStudentImagePreview(student.image_url);
		}
	}, [student]);
  return (
    <Modal show={isOpen} animation centered onHide={onRequestClose} size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Edit Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="gy-3">
            <Col xs={12} md={6}>
              <Form.Group controlId="student_pic" className="d-flex flex-column gap-2">
                <Form.Label>Passport Picture</Form.Label>
                {studentImagePreview && (
                  <Image
                    src={studentImagePreview}
                    alt="Student Preview"
                    thumbnail
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                )}
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange("avatar", e as React.ChangeEvent<HTMLInputElement>)}
                  style={{ maxWidth: "100px" }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="gy-3">
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  value={formData?.first_name || ""}
									onChange={(e) => handleInputChange("first_name", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  value={formData?.last_name || ""}
									onChange={(e) => handleInputChange("last_name", e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="gy-3">
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Other Names</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Other Names"
                  value={formData?.other_names || ""}
									onChange={(e) => handleInputChange("other_names", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  type="date"
                  placeholder="Enter Date of Birth"
                  value={formData?.birth_date || ""}
									onChange={(e) => handleInputChange("birth_date", e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="gy-3">
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Nationality</Form.Label>
                <Form.Control as="select" value={formData?.nationality || ""} onChange={(e) => handleInputChange("nationality", e.target.value)}>	
                  {countries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
            <Col xs={12} md={6}>
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <Form.Control as="select" value={formData?.gender || ""} onChange={(e) => handleInputChange("gender", e.target.value)}>
                  <option value="">---Select Gender----</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <button type="button" className="btn btn-secondary" onClick={onRequestClose}>
            Close
          </button>
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default StudentEditModal;
