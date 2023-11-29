import React, { useState } from 'react'
import { Form } from 'react-bootstrap';
import { Department } from '../models/department';

const DepartmentList = (props: any) => {
  const { department } = props;
  
  return (
    <div className='fs-5 text-muted p-2 border-bottom'>
      {department.dept_name} Department      
    </div>
  )
}

export default DepartmentList
