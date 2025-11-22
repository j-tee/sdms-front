import React from 'react';
import { Form } from 'react-bootstrap';
import CustomSelect from './CustomSelect';

interface FormSelectProps {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
  className?: string;
  id?: string;
  disabled?: boolean;
  useCustom?: boolean;
}

/**
 * Drop-in replacement for Form.Control as="select" that works around Chrome's
 * transform bug. Set useCustom={true} to use custom dropdown, or leave false
 * for native select with isolation wrapper.
 */
const FormSelect: React.FC<FormSelectProps> = ({
  value,
  onChange,
  children,
  className = '',
  id,
  disabled = false,
  useCustom = true
}) => {
  if (useCustom) {
    // Extract options from children
    const options: Array<{ value: string | number; label: string }> = [];
    
    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === 'option') {
        const optionValue = child.props.value !== undefined ? child.props.value : '';
        const optionLabel = typeof child.props.children === 'string' 
          ? child.props.children 
          : String(child.props.children || '');
        options.push({ value: optionValue, label: optionLabel });
      }
    });

    const handleCustomChange = (newValue: string | number) => {
      // Create a synthetic event that matches React.ChangeEvent<HTMLSelectElement>
      const syntheticEvent = {
        target: { value: String(newValue) },
        currentTarget: { value: String(newValue) }
      } as React.ChangeEvent<HTMLSelectElement>;
      
      onChange(syntheticEvent);
    };

    return (
      <CustomSelect
        options={options}
        value={value}
        onChange={handleCustomChange}
        id={id}
      />
    );
  }

  // Fallback: native select with isolation wrapper
  return (
    <div style={{ position: 'relative', isolation: 'isolate' }}>
      <Form.Control
        as="select"
        value={value}
        onChange={onChange}
        className={className}
        id={id}
        disabled={disabled}
      >
        {children}
      </Form.Control>
    </div>
  );
};

export default FormSelect;
