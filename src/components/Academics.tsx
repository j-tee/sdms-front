import React, { useState } from 'react'
import { Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import Header from './Header'
import { useParams } from 'react-router-dom'
import SubjectCard from './SubjectCard'
import LessonsCard from './LessonsCard'
import AssessmentCard from './AssessmentCard'
import EvaluationCard from './EvaluationCard'
import Navigation from './Navigation'
import './Academics.css'

const Academics = () => {
  const [index, SetIndex] = useState<string | null>('first')
  const { schoolId, branchId } = useParams()
  return (
    <>
      <Header />
      <div className="academics-page-modern">
        <img src="/images/cap.jpg" alt="" className="floating-cap-decoration floating-cap-top-right" />
        <img src="/images/cap.jpg" alt="" className="floating-cap-decoration floating-cap-bottom-left" />
        <Container fluid>
          <div className="page-hero-section">
            <div className="hero-content-wrapper">
              <div className="hero-icon">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <h1 className="page-title-modern">Academic Management</h1>
              <p className="page-subtitle-modern">Manage subjects, lessons, assessments and evaluations</p>
            </div>
          </div>

          <Card className="academics-card-modern">
            <Card.Body className="p-0">
              <Tab.Container onSelect={(e) => SetIndex(e)} id="left-tabs-example" defaultActiveKey="first">
                <Row className="g-0">
                  <Col lg={3} md={4} className="tabs-sidebar-modern">
                    <div className="tabs-header">
                      <i className="fas fa-book-open me-2"></i>
                      <span>Academic Menu</span>
                    </div>
                    <Nav variant="pills" className="flex-column tabs-nav-modern">
                      <Nav.Item>
                        <Nav.Link eventKey="first">
                          <i className="fas fa-book"></i>
                          <span>Subjects</span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">
                          <i className="fas fa-chalkboard-teacher"></i>
                          <span>Lessons</span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">
                          <i className="fas fa-clipboard-check"></i>
                          <span>Assessments</span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="fourth">
                          <i className="fas fa-chart-bar"></i>
                          <span>Evaluation / Reports</span>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col lg={9} md={8} className="tab-content-area-modern">
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <SubjectCard schoolId={schoolId} branchId={branchId} tabIndex={index} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <LessonsCard schoolId={schoolId} branchId={branchId} tabIndex={index} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <AssessmentCard schoolId={schoolId} branchId={branchId} tabIndex={index} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <EvaluationCard schoolId={schoolId} branchId={branchId} tabIndex={index} />
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

export default Academics
