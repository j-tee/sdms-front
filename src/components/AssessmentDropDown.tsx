import React from 'react'
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';
import FormSelect from './FormSelect';
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
      <FormSelect onChange={handleAssessmentChange} value={''}>
        <option value="">---Select---</option>
        {assessments.map((assessment) => (
          <option key={assessment.id} value={assessment.id}>{assessment.id} {assessment.assessment_name}</option>
        ))}
      </FormSelect>
    </Form.Group>
  )
}

export default AssessmentDropDown
