import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { AppDispatch } from "../redux/store";
import { useDispatch } from "react-redux";
import { ToastContext } from "../utility/ToastContext";
import { getGradingScales, updateGradingScale } from "../redux/slices/gradingScaleSlice";
import { showToastify } from "../utility/Toastify";
import '../css/ModernModal.css';

const GradingScaleEditModal = (props: any) => {
  const {
    schoolId,
    branchId,
    isOpen,
    grading,
    onRequestClose,
    setEditModalOpen,
  } = props;
  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(updateGradingScale({ ...formData })).then((result: any) => {
      setShowToast(true);
      setEditModalOpen(false);
      showToastify(result.payload.message, result.payload.status);
      dispatch(getGradingScales({ school_id: schoolId, branch_id: branchId }));
    });
  };
  const handleInputChange = (field: string, value: string) => {
    setFormData((prevData: any) => ({
      ...prevData,
      [field]: value,
    }));
  };
  useEffect(() => {
    setFormData((prevData: any) => ({
      ...prevData,
      id: grading.id,
      grade: grading.grade,
      lower_limit: grading.lower_limit,
      upper_limit: grading.upper_limit,
      remarks: grading.remarks,
    }));
  }, [grading]);
  return (
    <Modal show={isOpen} animation centered onHide={onRequestClose} size="lg" className="modern-modal edit-modal">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title><i className="fas fa-edit"></i> Edit Grading Scale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
				<div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>Grade</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Grade"
                    value={formData.grade}
                    onChange={(e) => handleInputChange("grade", e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Lower Limit</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Lower Limit"
                    value={formData.lower_limit}
                    onChange={(e) =>
                      handleInputChange("lower_limit", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Upper Limit</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Upper Limit"
                    value={formData.upper_limit}
                    onChange={(e) =>
                      handleInputChange("upper_limit", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label>Remarks</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Remarks"
                    value={formData.remarks}
                    onChange={(e) =>
                      handleInputChange("remarks", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="col-md-12">
                <Button type="submit" className="btn btn-primary">
                  <i className="fas fa-save"></i> Submit
                </Button>
              </div>
            </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default GradingScaleEditModal;
