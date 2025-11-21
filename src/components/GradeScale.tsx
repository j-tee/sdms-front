import React, { FormEvent, useContext, useEffect, useState } from "react";
import { GradingScale } from "../models/gradingScale";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addGradingScale,
  getGradingScales,
} from "../redux/slices/gradingScaleSlice";
import { ToastContext } from "../utility/ToastContext";
import { showToastify } from "../utility/Toastify";
import { get } from "http";
import { Button, Table } from "react-bootstrap";
import GradingScaleEditModal from "./GradingScaleEditModal";
import GradingScaleDeleteModal from "./GradingScaleDeleteModal";
type AnyType = {
  [key: string]: string;
};
const GradeScale = (props: any) => {
  const { schoolId, branchId, index } = props;
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [grading, setGrading] = useState<GradingScale>({
    branch_id: branchId,
    grade: "",
    lower_limit: 0,
    upper_limit: 0,
    remarks: "",
  });
  const { gradingScales } = useSelector(
    (state: RootState) => state.gradingScale
  );
  const dispatch = useDispatch<AppDispatch>();
  const { setShowToast } = useContext(ToastContext);
  const [gradingScaleData, setGradingScaleData] = useState<GradingScale>({
    branch_id: branchId,
    grade: "",
    lower_limit: 0,
    upper_limit: 0,
    remarks: "",
  });
  const handleEdit = (grading: GradingScale) => {
    setEditModalOpen(true);
    setGrading(grading);
  };
  const handleDelete = (grading: GradingScale) => {
    setDeleteModalOpen(true);
    setGrading(grading);
  };
  const handleInputChange = <T extends AnyType>(
    field: keyof T,
    value: string
  ) => {
    setGradingScaleData((prevData) => {
      // Check if the value is numeric and parse it as a float if necessary
      // const parsedValue = isNaN(Number(value)) ? value : parseFloat(value);
      switch(field){
        case 'upper_limit':{
          return {
            ...prevData,
            [field]: parseFloat(value),
          };
        }
        case 'lower_limit':{
          return {
            ...prevData,
            [field]: parseFloat(value),
          };
        }
        default:{
          return {
            ...prevData,
            [field]: value,
          };
        }
      }
      
    });
  };
  
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addGradingScale(gradingScaleData)).then((result) => {
      setShowToast(true);
      dispatch(getGradingScales({ branch_id: branchId }));
      showToastify(result.payload.message, result.payload.status);
    });
  };
  

  useEffect(() => {
    if (index === "gc") {
      dispatch(getGradingScales({ branch_id: branchId })).then((result) => {
        setShowToast(true);
        showToastify(result.payload.message, result.payload.status);
      });
    }
  }, [branchId, dispatch, index, setShowToast]);
  return (
    <div className="academic-section-content">
      {/* Add Grade Scale Form */}
      <div className="academic-add-section mb-4">
        <div className="academic-section-header">
          <div className="academic-section-icon">
            <i className="fas fa-plus-circle"></i>
          </div>
          <h5>Add Grade Scale</h5>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6">
              <div className="academic-form-group">
                <label className="academic-form-label">
                  <i className="fas fa-arrow-down me-2"></i>
                  Lower Limit
                </label>
                <input
                  type="number"
                  className="academic-form-control"
                  placeholder="0"
                  value={gradingScaleData.lower_limit}
                  onChange={(e) =>
                    handleInputChange("lower_limit", e.target.value)
                  }
                />                      
              </div>
            </div>
            <div className="col-md-6">
              <div className="academic-form-group">
                <label className="academic-form-label">
                  <i className="fas fa-arrow-up me-2"></i>
                  Upper Limit
                </label>
                <input
                  type="number"
                  className="academic-form-control"
                  placeholder="0"
                  value={gradingScaleData.upper_limit}
                  onChange={(e) =>
                    handleInputChange("upper_limit", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="academic-form-group">
                <label className="academic-form-label">
                  <i className="fas fa-award me-2"></i>
                  Grade
                </label>
                <input
                  type="text"
                  className="academic-form-control"
                  placeholder="Grade"
                  value={gradingScaleData.grade}
                  onChange={(e) =>
                    handleInputChange("grade", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="academic-form-group">
                <label className="academic-form-label">
                  <i className="fas fa-comment me-2"></i>
                  Remarks
                </label>
                <input
                  type="text"
                  className="academic-form-control"
                  placeholder="Remarks"
                  value={gradingScaleData.remarks}
                  onChange={(e) =>
                    handleInputChange("remarks", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="col-md-12">
              <Button type="submit" className="btn-add-academic-item">
                <i className="fas fa-check me-2"></i>
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Grading Scale Table */}
      <div className="academic-table-wrapper">
        <div className="academic-section-header">
          <div className="academic-section-icon">
            <i className="fas fa-award"></i>
          </div>
          <h5>Grading Scale</h5>
        </div>
        <Table className="academic-table-modern" size="sm">
          <thead>
            <tr>
              <th><i className="fas fa-arrow-down me-2"></i>Lower Limit</th> 
              <th><i className="fas fa-arrow-up me-2"></i>Upper Limit</th>  
              <th><i className="fas fa-award me-2"></i>Grade</th>                     
              <th><i className="fas fa-comment me-2"></i>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {gradingScales && gradingScales.length > 0 ? (
              gradingScales.map((gradingScale: GradingScale) => (
                <tr key={gradingScale.id}>
                  <td>
                    <span className="percentage-badge">
                      {gradingScale.lower_limit}
                    </span>
                  </td>
                  <td>
                    <span className="percentage-badge">
                      {gradingScale.upper_limit}
                    </span>
                  </td>
                  <td>
                    <span className="grade-badge">
                      <i className="fas fa-medal me-2"></i>
                      {gradingScale.grade}
                    </span>
                  </td>
                  <td>{gradingScale.remarks}</td>
                  <td>
                    <Button variant='link' onClick={() => handleEdit(gradingScale)} className="table-action-btn edit-btn-table" size="sm">
                      <i className="fas fa-edit me-1"></i>
                      Edit
                    </Button>
                    <Button variant='link' onClick={() => handleDelete(gradingScale)} className="table-action-btn delete-btn-table" size="sm">
                      <i className="fas fa-trash me-1"></i>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>
                  <div className="empty-state">
                    <i className="fas fa-award fa-3x mb-3"></i>
                    <p>No grading scales found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <GradingScaleDeleteModal
        schoolId={schoolId}
        branchId={branchId}
        isOpen={isDeleteModalOpen}
        grading={grading}
        onRequestClose={() => setDeleteModalOpen(false)}
        setDeleteModalOpen={setDeleteModalOpen}
      />
      <GradingScaleEditModal
        grading={grading}
        branchId={branchId}
        isOpen={isEditModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        setEditModalOpen={setEditModalOpen}
      />
    </div>
  );
};

export default GradeScale;
