import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../css/CustomDatePicker.css';

interface CustomDatePickerProps {
  value: string;
  onChange: (date: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  disabled?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  placeholder = 'mm/dd/yyyy',
  className = '',
  id,
  disabled = false
}) => {
  // Convert string value to Date object
  const dateValue = value ? new Date(value) : null;

  const handleChange = (date: Date | null) => {
    if (date) {
      // Format date as YYYY-MM-DD for form compatibility
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      onChange(`${year}-${month}-${day}`);
    } else {
      onChange('');
    }
  };

  return (
    <div className="custom-datepicker-wrapper">
      <DatePicker
        selected={dateValue}
        onChange={handleChange}
        dateFormat="MM/dd/yyyy"
        placeholderText={placeholder}
        className={`custom-datepicker-input form-control ${className}`}
        id={id}
        disabled={disabled}
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        popperClassName="custom-datepicker-popper"
        wrapperClassName="custom-datepicker-container"
      />
    </div>
  );
};

export default CustomDatePicker;
