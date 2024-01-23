import React from 'react'
import { Card } from 'react-bootstrap'

const RegistrationList = (props:any) => {
  const {params, student, branchId, schoolId} = props;
  return (
    <Card>
      <Card.Header>
        <Card.Title>{student.admission_id} {student.last_name} {student.first_name}</Card.Title>
      </Card.Header>
      <Card.Body className='d-flex flex-row gap-2'>
      <Card.Img variant="top" src={student.image_url}style={{width:"100px", height:"100px"}} />
      <Card.Text className='d-flex flex-column'>
        <span>Program: {student.student_program}</span> 
        <span>Stage / Level / Year: {student.student_stage}</span> 
        <span>Class Group: {student.student_class} </span>
        <span>Department: {student.dept_name} </span>
      </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default RegistrationList
