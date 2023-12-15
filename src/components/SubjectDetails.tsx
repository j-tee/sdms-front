import { Card, Container } from "react-bootstrap";

const SubjectDetails = (props: any) => {
  const { schoolId, branchId } = props;
  
  return (
   <Container fluid>
    <Card.Body className="border border-left-0 border-right-0 border-dark">
      <Card.Text className="d-flex flex-column flex-lg-row justify-content-between">
        <span className='fw-bold text-muted'>Subject Name </span> <span className='text-muted'>{props.subject.subject_name}</span>
      </Card.Text>
      <Card.Text className="d-flex flex-column flex-lg-row justify-content-between">
        <span className='fw-bold text-muted'>Subject Code </span> <span className='text-muted'>{props.subject.subject_code}</span>
      </Card.Text>  
    </Card.Body>
   </Container>
  )
}

export default SubjectDetails
