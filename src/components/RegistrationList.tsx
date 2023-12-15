import React from 'react'
import { Card } from 'react-bootstrap'

const RegistrationList = (props:any) => {
  const {params, student, branchId, schoolId} = props;
  return (
    <Card>
      <Card.Header>
        <Card.Title>{student.admission_id} {student.last_name} {student.first_name}</Card.Title>
      </Card.Header>
      <Card.Body>
      <Card.Img variant="top" src={student.image_url}style={{width:"100px", height:"100px"}} />
      <Card.Text>
        <span>{student.student_program}</span> <span>{student.student_stage}</span> <span>{student.student_class} </span>
      </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default RegistrationList
