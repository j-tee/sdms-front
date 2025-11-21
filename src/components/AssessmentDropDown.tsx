import React from 'react'
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
type AnyType = {
  [key: string]: string;
};

interface AssessmentDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
  branchId: number;
  schoolId: number;
}

const AssessmentDropDown: React.FC<AssessmentDropDownProps> = ({ onChange, branchId, schoolId }) => {
  const { assessments } = useSelector((state: RootState) => state.assessment)
  
  const handleAssessmentChange = (e: React.ChangeEvent<any>) => {
    const selectedAssessmentId = (e.target.value);
    onChange('assessment_id', selectedAssessmentId);
  };
  return (
    <Form.Group controlId="assessment">
      <Form.Label>Assessment</Form.Label>
      <Form.Select as="select" onChange={handleAssessmentChange}>
        <option value="">---Select---</option>
        {assessments.map((assessment) => (
          <option key={assessment.id} value={assessment.id}>{assessment.id} {assessment.assessment_name}</option>
        ))}
      </Form.Select>
    </Form.Group>
  )
}

export default AssessmentDropDown
