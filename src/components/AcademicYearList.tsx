import { Card } from 'react-bootstrap'
import AcademicYearDetails from './AcademicYearDetails';

const AcademicYearList = (props: any) => {
  const { academicYear, schoolId, branchId} = props;

  
  return (
    <>
      <Card.Body className="d-flex flex-column">
        
        <Card.Text>
          <AcademicYearDetails schoolId={schoolId} branchId={branchId} year={academicYear} />
        </Card.Text>
      </Card.Body>
    </>
  )
}

export default AcademicYearList
