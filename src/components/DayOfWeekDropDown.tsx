import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import FormSelect from './FormSelect';

type AnyType = {
  [key: string]: string;
};
interface DayOfWeekDropDownProps {
  onChange: (field: keyof AnyType, value: string) => void;
  lesson: any;
}
const DayOfWeekDropDown: React.FC<DayOfWeekDropDownProps> = ({ onChange, lesson }) => {
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
      <FormSelect onChange={handleDayOfWeekChange} value={params.staff_id || ''}>
      <option value={lesson ? lesson.day_of_week : ''}>{lesson ? lesson.day_of_week : "-----Select Day of Week----"}</option>
        <option value="Monday">Monday</option>
        <option value="Tuesday">Tuesday</option>
        <option value="Wednesday">Wednesday</option>
        <option value="Thursday">Thurday</option>
        <option value="Friday">Friday</option>
        <option value="Saturday">Saturday</option>
        <option value="Sunday">Sunday</option>
      </FormSelect>
    </Form.Group>
  )
}

export default DayOfWeekDropDown
