import { Card } from 'react-bootstrap'
import AcademicYearDetails from './AcademicYearDetails';

const AcademicYearList = (props: any) => {
  const { academicYear } = props;

  
  return (
    <>
      <Card.Header>
        <span className="text-muted fs-3">Academic Years</span>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        
        <Card.Text>
          <AcademicYearDetails year={academicYear} />
        </Card.Text>
      </Card.Body>
    </>
  )
}

export default AcademicYearList
