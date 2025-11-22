import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Image, Modal, Row } from "react-bootstrap";
import DepartmentDropDown from "./DepartmentDropDown";
import ProgramDropDown from "./ProgramDropDown";
import StageDropDown from "./StageDropDown";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { getAdmissions, updateAdmission } from "../redux/slices/admissionSlice";
import { ToastContext } from "../utility/ToastContext";
import { showToastify } from "../utility/Toastify";
import { getPrograms } from "../redux/slices/programSlice";
import { getStages } from "../redux/slices/stageSlice";
import AcademicYearDropDown from "./AcademicYearDropDown";
import AcademicTermDropDown from "./AcademicTermDropDown";
import '../css/ModernModal.css';

const AdmissionEdit = (props: any) => {
  const {
    schoolId,
    branchId,
    isOpen,
    admission,
    params,
    onRequestClose,
    setAdmissionEditModalOpen,
  } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);
  const [formData, setFormData] = useState({
    id: admission.id,
    student_id: admission.student_id,
    branch_id: admission.branch_id,
    // department_id: admission.department_id,
    program_id: admission.program_id,
    stage_id: admission.stage_id,
    admission_date: admission.admission_date,
    category: admission.category,
    academic_term_id: admission.academic_term_id,
  });
  type AnyType = {
    [key: string]: string;
  };
  const handleInputChange = <T extends AnyType>(
    field: keyof T,
    value: string
  ) => {
    // Update the formData state with the new value
    if (field !== "department_id") {
      setFormData((prevData: any) => ({
        ...prevData,
        [field]: value,
      }));
    }
    switch (field) {
      case "department_id": {
        dispatch(
          getPrograms({
            ...params,
            branch_id: branchId,
            department_id: parseInt(value),
            paginate: false,
          })
        );
        break;
      }
      case "program_id": {
        if (branchId)
          dispatch(
            getStages({
              ...params,
              branch_id: branchId,
              department_id: 0,
              paginate: false,
            })
          );
        break;
      }
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(
      updateAdmission({
        ...formData,
        // student_id: admission.student_id,
        // branch_id: branchId
      })
    ).then((res: any) => {
      dispatch(
        getAdmissions({
          ...params,
          school_id: schoolId,
          branch_id: branchId,
          paginate: true,
        })
      );
      setShowToast(true);
      showToastify(res.payload.message, res.payload.status);
    });
    setAdmissionEditModalOpen(false);
  };
  // useEffect(() => {
  //   setFormData((prevData) => ({
  //     ...formData, department_id: admission.department_id,
  //     program_id: admission.program_id,
  //     stage_id: admission.stage_id,
  //     admission_date: admission.admission_date,
  //     category: admission.category,
  //     academic_term_id: admission.academic_term_id,
  //   }))
  // }, [admission, formData])
  return (
    <Modal show={isOpen} animation centered onHide={onRequestClose} size="lg" className="modern-modal edit-modal">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title><i className="fas fa-edit"></i> Edit Admission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="d-flex flex-lg-row flex-column mb-2">
            <span>
              {admission && (
                <Image
                  src={admission.picture}
                  alt="Student Preview"
                  thumbnail
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
            </span>
          </Row>
          <Row className="d-flex flex-lg-row flex-column mb-2">
            <Col>
              {" "}
              <AcademicYearDropDown
                branchId={branchId}
                onChange={handleInputChange}
                schoolId={undefined}
              />{" "}
            </Col>
            <Col>
              <AcademicTermDropDown
                onChange={handleInputChange}
                schoolId={undefined}
                branchId={undefined}
                yearId={undefined}
              />
            </Col>
          </Row>
          <Row className="d-flex flex-lg-row flex-column mb-2">
            <Col>
              <DepartmentDropDown
                schoolId={schoolId}
                branchId={branchId}
                onChange={handleInputChange}
              />
            </Col>
            <Col>
              <ProgramDropDown
                admission={admission}
                departmentId={params.department_id}
                branchId={branchId}
                onChange={handleInputChange}
              />
            </Col>
            <Col>
              <StageDropDown
                admission={admission}
                value={admission}
                lesson={undefined}
                branchId={branchId}
                onChange={handleInputChange}
              />
            </Col>
          </Row>
          <Row className="my-4 d-flex flex-column flex-lg-row">
            <Col>
              <Form.Group controlId="admissionDate">
                <Form.Label>AdmissionDate</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.admission_date}
                  onChange={(e) =>
                    handleInputChange("admission_date", e.target.value)
                  }
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="category">
                <Form.Label>Admission Category</Form.Label>
                <Form.Control
                  as={"select"}
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                >
                  <option value={admission ? admission.category : ""}>
                    {admission ? admission.category : "---Select category---"}
                  </option>
                  <option value={"Transfer"}>Transfer</option>
                  <option value={"Non Transfer"}>Non Transfer</option>
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit"><i className="fas fa-save"></i> Submit</Button>
        </Modal.Body>
        {/* <h1>{admission.program_id}</h1> */}
      </Form>
    </Modal>
  );
};

export default AdmissionEdit;
