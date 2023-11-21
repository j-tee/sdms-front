import React from 'react';
import { Col, Form } from 'react-bootstrap';

interface DropdownSelectorProps {
  controlId: string;
  label: string;
  options: { id: string; name: string }[];
  selectedValue: string;
  onChange: (value: string) => void; // Add this line for proper type
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  controlId,
  label,
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <Col md={6}>
      <Form.Group controlId={controlId}>
        <Form.Label>{label}</Form.Label>
        <Form.Control
          as="select"
          value={selectedValue}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    </Col>
  );
};

export default DropdownSelector;
