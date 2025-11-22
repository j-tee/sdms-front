import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import StageDropDown from "./StageDropDown";
import ClassGroupDropDown from "./ClassGroupDropDown";
import { getClassGroups } from "../redux/slices/classGroupSlice";
import DepartmentDropDown from "./DepartmentDropDown";
import { Registration } from "../models/student";
import { getRegistrationInformation, updateRegistration } from "../redux/slices/studentRegSlice";
import { showToastify } from "../utility/Toastify";
import { ToastContext } from "../utility/ToastContext";
import '../css/ModernModal.css';

const RegistrationEditModal = (props: any) => {
	const { setShowToast } = useContext(ToastContext)
  const {
    schoolId,
    branchId,
    isOpen,
    registration,
    onRequestClose,
    setEditModalOpen,
  } = props;
  const { academic_term } = useSelector((state: RootState) => state.calendar);
  const [params, setParams] = useState<any>({});
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<any>({});

  const handleInputChange = (field: string | number, value: string) => {
    setParams((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
    switch (field) {
      case "stage_id": {
        dispatch(
          getClassGroups({
            ...params,
            branch_id: branchId,
            stage_id: parseInt(value),
            paginate: false,
          })
        );
        break;
      }
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const payload: Registration = {
      id: registration.id,
      student_id: registration.student_id,
      class_group_id: params.class_group_id ? params.class_group_id : registration.class_group_id,
      academic_term_id: academic_term?.id ? academic_term.id : registration.academic_term_id,
      reg_date: params.reg_date ? params.reg_date : registration.reg_date,
    };
		dispatch(updateRegistration(payload)).then((result: any) => {
			setShowToast(true);
			setEditModalOpen(false);
			showToastify(result.payload.message, result.payload.status);
			dispatch(getRegistrationInformation({ ...params,branch_id:branchId, paginate: true, pagination: params.pagination }));
		})
  };
  
  return (
    <Modal show={isOpen} animation centered onHide={onRequestClose} size="xl" className="modern-modal edit-modal">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title><i className="fas fa-edit"></i> Edit Registration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="d-flex flex-column flex-lg-row">
            <Col>
              <DepartmentDropDown
                onChange={handleInputChange}
                branchId={branchId}
                schoolId={schoolId}
              />
            </Col>
            <Col>
              <StageDropDown
                lesson={undefined}
                onChange={handleInputChange}
                branchId={branchId}
              />
            </Col>
            <Col>
              <ClassGroupDropDown
                onChange={handleInputChange}
                programId={params.program_id}
                stageId={params.stage_id}
                departmentId={params.department_id}
                lesson={undefined}
              />
            </Col>
            <Col>
              <Form.Group controlId="regDate">
                <Form.Label>Registration Date</Form.Label>
                <Form.Control
                  value={registration && registration.reg_date}
                  onChange={(e) =>
                    handleInputChange("reg_date", e.target.value)
                  }
                  type="date"
                  placeholder="Enter Registration Date"
                />
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onRequestClose}>
            <i className="fas fa-times"></i> Close
          </Button>
          <Button variant="primary" type="submit">
            <i className="fas fa-save"></i> Save Changes
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default RegistrationEditModal;
