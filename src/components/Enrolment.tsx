import React, { useState } from 'react'
import Header from './Header'
import { Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import AdmissionCard from './AdmissionCard'
import { useParams } from 'react-router-dom'
import StudentRegistration from './StudentRegistration'
import ExitProfiles from './ExitProfiles'
import Navigation from './Navigation'

const Enrolment = () => {
  const [index, SetIndex] = useState<string|null>('first')
  const { schoolId, branchId } = useParams()
  return (
    <div>
      <Header />
      <Container style={{ marginTop: '3.5rem' }}>
        &nbsp;
      </Container>
      <Card>
        <Card.Header>
          <Card.Title> <span className='fs-1 text-muted'>Enrolments</span></Card.Title>
        </Card.Header>
        <Card.Body>
          <Tab.Container onSelect={(e) => SetIndex(e)} id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={2} className='border-right'>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Admissions</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Registrations</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Exit Profiles</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="first"><AdmissionCard tabIndex={index} schoolId={schoolId} branchId={branchId}/></Tab.Pane>
                  <Tab.Pane eventKey="second"><StudentRegistration tabIndex={index} schoolId={schoolId} branchId={branchId} /></Tab.Pane>
                  <Tab.Pane eventKey="third"><ExitProfiles tabIndex={index} schoolId={schoolId} branchId={branchId} /></Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Card.Body>
        <Navigation schoolId={schoolId} branchId={branchId} />
      </Card>
    </div>
  )
}

export default Enrolment
