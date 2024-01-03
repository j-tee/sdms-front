import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Form } from 'react-bootstrap';
import { getAssessmentTypes } from '../redux/slices/assesmentTypeSlice';
type AnyType = {
  [key: string]: string;
};

interface AssessmentTypeDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
  branchId: number;
  schoolId: number;
}

const AssessmentTypeDropDown: React.FC<AssessmentTypeDropDownProps> = ({ onChange, branchId, schoolId }) => {
  const { assessment_types } = useSelector((state: RootState) => state.assessmentType)
 
  const handleAssessmentTypeChange = (e: React.ChangeEvent<any>) => {
    const selectedAssessmentTypeId = (e.target.value);
    onChange('assessment_type_id', selectedAssessmentTypeId);
  };

  return (
    <Form.Group controlId="assessment_type">
      <Form.Label>Assessment Type</Form.Label>
      <Form.Select as="select" onChange={handleAssessmentTypeChange}>
        <option value="">---Select---</option>
        {assessment_types.map((assessment_type) => (
          <option key={assessment_type.id} value={assessment_type.id}>{assessment_type.category === 'CA' ? 'Continuous Assessment' : 'Terminal Assessment'}</option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

export default AssessmentTypeDropDown
