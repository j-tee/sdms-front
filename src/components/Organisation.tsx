import React, { useContext, useEffect, useState } from 'react'
import Header from './Header'
import { Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import DepartmentList from './DepartmentCard'
import ProgramCard from './ProgramCard';
import ClassGroupCard from './ClassGroupCard';
import { useParams } from 'react-router-dom';
import { ToastContext } from '../utility/ToastContext';
import StageCard from './StageCard';

const Organisation = () => {
  const { schoolId, branchId } = useParams()
  const { showToast, setShowToast } = useContext(ToastContext)
  const [index, SetIndex] = useState<string|null>('first')

  return (
    <div>
      <Header />
      <Container style={{ marginTop: '3.5rem' }}>
        &nbsp;
      </Container>
      <Card>
        <Card.Body>
          <Tab.Container onSelect={(e) => SetIndex(e)} id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Col sm={2} className='border-right'>
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Departments</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Programs</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Stages</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="fourth">Class Groups</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10}>
                <Tab.Content>
                  <Tab.Pane eventKey="first"><DepartmentList tabIndex={index} schoolId={schoolId} branchId={branchId}/></Tab.Pane>
                  <Tab.Pane eventKey="second"><ProgramCard tabIndex={index} schoolId={schoolId} branchId={branchId} /></Tab.Pane>
                  <Tab.Pane eventKey="third"><StageCard tabIndex={index} schoolId={schoolId} branchId={branchId} /></Tab.Pane>
                  <Tab.Pane eventKey="fourth"><ClassGroupCard tabIndex={index} schoolId={schoolId} branchId={branchId}/></Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Organisation
