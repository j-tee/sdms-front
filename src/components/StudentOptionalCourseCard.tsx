import React from 'react'
import { Card } from 'react-bootstrap'
// to do: get the list of optional courses for the student
// to do: only the staff teaching the course can register the student
// to do: get the list of students registered for the program and the stage at which the subject is being offered  
const StudentOptionalCourseCard = (props: any) => {
  return (
    <div>
      <Card.Header>
        <span className="text-muted fs-3">Optional Courses Registrations</span> 
      </Card.Header>
    </div>
  )
}

export default StudentOptionalCourseCard
