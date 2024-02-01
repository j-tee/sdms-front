import { Card, Container } from "react-bootstrap";

const ProgramSubjectDetails = (props: any) => {
const { schoolId, branchId, course_option } = props;
  return (
    <Container>
    <Card.Body className="border border-left-0 border-right-0 border-bottom-1 border-dark">
      <Card.Text className="d-flex flex-column flex-lg-row justify-content-between">
        <span className='fw-bold text-muted'>Subject Name </span> <span className='text-muted'>{course_option.subject_name}</span>
      </Card.Text>
      <Card.Text className="d-flex flex-column flex-lg-row justify-content-between">
        <span className='fw-bold text-muted'>Program </span> <span className='text-muted'>{course_option.program_name}</span>
      </Card.Text>
      <Card.Text className="d-flex flex-column flex-lg-row justify-content-between">
        <span className='fw-bold text-muted'>Stage </span> <span className='text-muted'>{course_option.stage_name}</span>
      </Card.Text>
      <Card.Text className="d-flex flex-column flex-lg-row justify-content-between">
        <span className='fw-bold text-muted'>Optional </span> <span className='text-muted'>{course_option.optional ? 'YES':'NO'}</span>
      </Card.Text>  
      <Card.Text className="d-flex flex-column flex-lg-row justify-content-between">
        <span className='fw-bold text-muted'>Credit Hours </span> <span className='text-muted'>{course_option.credit_hours}</span>  
      </Card.Text>
      
    </Card.Body>
   </Container>
  )
}

export default ProgramSubjectDetails
