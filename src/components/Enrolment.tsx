import React, { useState } from 'react'
import Header from './Header'
import { Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import AdmissionCard from './AdmissionCard'
import { useParams } from 'react-router-dom'
import StudentRegistration from './StudentRegistration'
import ExitProfiles from './ExitProfiles'
import Navigation from './Navigation'
import StudentListCard from './StudentListCard'
import ParentListCard from './ParentListCard'
import './Enrolment.css'

const Enrolment = () => {
  const [index, SetIndex] = useState<string|null>('first')
  const { schoolId, branchId } = useParams()
  return (
    <>
      <Header />
      <div className="enrolment-page-modern">
        <img src="/images/cap.jpg" alt="" className="floating-cap-decoration floating-cap-top-right" />
        <img src="/images/cap.jpg" alt="" className="floating-cap-decoration floating-cap-bottom-left" />
        <Container fluid>
          <div className="page-hero-section">
            <div className="hero-content-wrapper">
              <div className="hero-icon">
                <i className="fas fa-user-graduate"></i>
              </div>
              <h1 className="page-title-modern">Student Enrolment</h1>
              <p className="page-subtitle-modern">Manage admissions, registrations, and student records</p>
            </div>
          </div>

          <Card className="enrolment-card-modern">
            <Card.Body className="p-0">
              <Tab.Container onSelect={(e) => SetIndex(e)} id="left-tabs-example" defaultActiveKey="first">
                <Row className="g-0">
                  <Col lg={3} md={4} className="tabs-sidebar-modern">
                    <div className="tabs-header">
                      <i className="fas fa-users me-2"></i>
                      <span>Enrolment Menu</span>
                    </div>
                    <Nav variant="pills" className="flex-column tabs-nav-modern">
                      <Nav.Item>
                        <Nav.Link eventKey="first">
                          <i className="fas fa-user-plus"></i>
                          <span>Admissions</span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">
                          <i className="fas fa-clipboard-list"></i>
                          <span>Registrations</span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">
                          <i className="fas fa-door-open"></i>
                          <span>Exit Profiles</span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="fourth">
                          <i className="fas fa-user-graduate"></i>
                          <span>Students</span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="fifth">
                          <i className="fas fa-users"></i>
                          <span>Parents</span>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col lg={9} md={8} className="tab-content-area-modern">
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <AdmissionCard tabIndex={index} schoolId={schoolId} branchId={branchId}/>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <StudentRegistration tabIndex={index} schoolId={schoolId} branchId={branchId} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <ExitProfiles tabIndex={index} schoolId={schoolId} branchId={branchId} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <StudentListCard tabIndex={index} schoolId={schoolId} branchId={branchId} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="fifth">
                        <ParentListCard tabIndex={index} schoolId={schoolId} branchId={branchId} />
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Card.Body>
          </Card>
          <Navigation schoolId={schoolId} branchId={branchId} />
        </Container>
      </div>
    </>
  )
}

export default Enrolment
