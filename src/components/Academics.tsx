import React, { useState } from 'react'
import { Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import Header from './Header'
import { useParams } from 'react-router-dom'
import SubjectCard from './SubjectCard'
import LessonsCard from './LessonsCard'
import AssessmentCard from './AssessmentCard'
import EvaluationCard from './EvaluationCard'
import Navigation from './Navigation'

const Academics = () => {
  const [index, SetIndex] = useState<string | null>('first')
  const { schoolId, branchId } = useParams()
  return (
    <>
      {/* <Header /> */}
      {/* <Container style={{ marginTop: '3.5rem' }}>
        &nbsp;
      </Container> */}
      <Card>
        <Card.Header>
          <Card.Title className='fs-1 text-muted'>Academics</Card.Title>
        </Card.Header>
        <Card.Body>
          <Tab.Container onSelect={(e) => SetIndex(e)} id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={2} className='border-right'>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Subjects</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Lessons</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Assessments</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fourth">Evaluation / Reports</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="first"><SubjectCard schoolId={schoolId} branchId={branchId} tabIndex={index} /></Tab.Pane>
                  <Tab.Pane eventKey="second"><LessonsCard schoolId={schoolId} branchId={branchId} tabIndex={index} /></Tab.Pane>
                  <Tab.Pane eventKey="third"><AssessmentCard schoolId={schoolId} branchId={branchId} tabIndex={index} /></Tab.Pane>
                  <Tab.Pane eventKey="fourth"><EvaluationCard schoolId={schoolId} branchId={branchId} tabIndex={index} /></Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Card.Body>
        <Navigation schoolId={schoolId} branchId={branchId} />
      </Card>
    </>
  )
}

export default Academics
