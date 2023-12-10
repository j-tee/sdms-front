import React from 'react'
import { Card, ListGroup } from 'react-bootstrap';
import { StudentViewModel } from '../models/student';

const UnregisteredStudent = (props: any) => {
    const {params, branchId, schoolId, students} = props;
  return (
    <Card>
    <Card.Header className='fs-3 text-muted'>
      Unregistered Students
    </Card.Header>
    <Card.Body>
      <ListGroup variant="flush">
        {students.map((student: StudentViewModel) => (
          <ListGroup.Item className='py-0 gap-2 d-flex' key={student.student_id}>
             <span><input type="checkbox" value={student.student_id} /></span>
            <span className='d-flex gap-2'><span>{student.student_id}</span>    <span>{student.last_name}</span> <span>{student.first_name}</span></span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Card.Body>
  </Card>
  
  )
}

export default UnregisteredStudent
