import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Card, Container, Tab, Tabs } from 'react-bootstrap';
import Header from './Header';
import AcademicYearCard from './AcademicYearCard';
import AcademicTermCard from './AcademicTermCard';

const Calendar = () => {
  const { schoolId, branchId } = useParams()
  const [tabKey, setTabKey] = useState<string>('ay');
  
  return (
    <>
      <Header />
      <Container style={{ marginTop: '3.5rem' }}>
        &nbsp;
      </Container>
      <Card>
        <Card.Header>
          <Card.Title className='fs-1 text-muted'>Calendar</Card.Title>
        </Card.Header>
        <Card.Body>
          <Tabs
            id="controlled-tab-example"
            activeKey={tabKey}
            onSelect={(k) => k && setTabKey(k)}
            className="mb-3"
          >
            <Tab eventKey="ay" title="Academic Years">
              <AcademicYearCard schoolId={schoolId} branchId={branchId} />
            </Tab>
            <Tab eventKey="at" title="Academic Terms">
              <AcademicTermCard tabKey={tabKey} schoolId={schoolId} branchId={branchId} />
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>


    </>
  )
}

export default Calendar
