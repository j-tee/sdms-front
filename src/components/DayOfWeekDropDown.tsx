import React, { useState } from 'react'
import { Form } from 'react-bootstrap';

type AnyType = {
  [key: string]: string;
};
interface DayOfWeekDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
}
const DayOfWeekDropDown: React.FC<DayOfWeekDropDownProps> = ({ onChange }) => {
  const [params, setParams] = useState<any>({})
  const handleDayOfWeekChange = (e: React.ChangeEvent<any>) => {
    const selectedDayOfWeek = e.target.value;
    setParams({
      ...params,
      day_of_week: selectedDayOfWeek,
    });
    onChange('day_of_week', selectedDayOfWeek);
  };
  return (
    <Form.Group controlId="dayOfWeek">
      <Form.Label>Days of The Week</Form.Label>
      <Form.Control as="select" onChange={handleDayOfWeekChange} value={params.staff_id}>
        <option value="">---Select---</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thurday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </Form.Control>
    </Form.Group>
  )
}

export default DayOfWeekDropDown
