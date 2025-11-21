import { useState } from 'react'
import { useParams } from 'react-router-dom';
import { Card, Container, Tab, Tabs } from 'react-bootstrap';
import Header from './Header';
import AcademicYearCard from './AcademicYearCard';
import AcademicTermCard from './AcademicTermCard';
import Navigation from './Navigation';
import './Calendar.css';

const Calendar = () => {
  const { schoolId, branchId } = useParams()
  const [tabKey, setTabKey] = useState<string>('ay');
  
  return (
    <>
      <Header />
      <div className="calendar-page-modern">
        <img src="/images/cap.jpg" alt="" className="floating-cap-decoration floating-cap-top-right" />
        <img src="/images/cap.jpg" alt="" className="floating-cap-decoration floating-cap-bottom-left" />
        <Container fluid>
          <div className="page-hero-section">
            <div className="hero-content-wrapper">
              <div className="hero-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h1 className="page-title-modern">Academic Calendar</h1>
              <p className="page-subtitle-modern">Manage academic years and terms</p>
            </div>
          </div>

          <Card className="calendar-card-modern">
            <Card.Body>
              <Tabs
                id="controlled-tab-example"
                activeKey={tabKey}
                onSelect={(k) => k && setTabKey(k)}
                className="modern-tabs-horizontal mb-4"
              >
                <Tab 
                  eventKey="ay" 
                  title={
                    <span>
                      <i className="fas fa-calendar-check me-2"></i>
                      Academic Years
                    </span>
                  }
                >
                  <AcademicYearCard tabKey={tabKey} schoolId={schoolId} branchId={branchId} />
                </Tab>
                <Tab 
                  eventKey="at" 
                  title={
                    <span>
                      <i className="fas fa-calendar-week me-2"></i>
                      Academic Terms
                    </span>
                  }
                >
                  <AcademicTermCard tabKey={tabKey} schoolId={schoolId} branchId={branchId} />
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
          <Navigation schoolId={schoolId} branchId={branchId} />
        </Container>
      </div>
    </>
  )
}

export default Calendar
