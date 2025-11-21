import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import DepartmentList from './DepartmentCard'
import ProgramCard from './ProgramCard';
import ClassGroupCard from './ClassGroupCard';
import { useParams } from 'react-router-dom';
import { ToastContext } from '../utility/ToastContext';
import StageCard from './StageCard';
import Navigation from './Navigation';
import './Organisation.css';

const Organisation = () => {
  const { schoolId, branchId } = useParams()
  const { showToast, setShowToast } = useContext(ToastContext)
  const [index, SetIndex] = useState<string|null>('first')

  return (
    <>
      <Header />
      <div className="organisation-page-modern">
        <img src="/images/cap.jpg" alt="" className="floating-cap-decoration floating-cap-top-right" />
        <img src="/images/cap.jpg" alt="" className="floating-cap-decoration floating-cap-bottom-left" />
        <Container fluid>
          <div className="page-hero-section">
            <div className="hero-content-wrapper">
              <div className="hero-icon">
                <i className="fas fa-sitemap"></i>
              </div>
              <h1 className="page-title-modern">Organisation & Structure</h1>
              <p className="page-subtitle-modern">Manage departments, programs, stages and class groups</p>
            </div>
          </div>

          <Card className="organisation-card-modern">
            <Card.Body className="p-0">
              <Tab.Container onSelect={(e) => SetIndex(e)} id="left-tabs-example" defaultActiveKey="first">
                <Row className="g-0">
                  <Col lg={3} md={4} className="tabs-sidebar-modern">
                    <div className="tabs-header">
                      <i className="fas fa-building me-2"></i>
                      <span>Structure Menu</span>
                    </div>
                    <Nav variant="pills" className="flex-column tabs-nav-modern">
                      <Nav.Item>
                        <Nav.Link eventKey="first">
                          <i className="fas fa-layer-group"></i>
                          <span>Departments</span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">
                          <i className="fas fa-project-diagram"></i>
                          <span>Programs</span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">
                          <i className="fas fa-stairs"></i>
                          <span>Stages</span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="fourth">
                          <i className="fas fa-users-class"></i>
                          <span>Class Groups</span>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col lg={9} md={8} className="tab-content-area-modern">
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <DepartmentList tabIndex={index} schoolId={schoolId} branchId={branchId}/>
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <ProgramCard tabIndex={index} schoolId={schoolId} branchId={branchId} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <StageCard tabIndex={index} schoolId={schoolId} branchId={branchId} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="fourth">
                        <ClassGroupCard tabIndex={index} schoolId={schoolId} branchId={branchId}/>
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

export default Organisation
