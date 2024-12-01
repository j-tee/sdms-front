import React from 'react'
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import ReportCard from './ReportCard'
import AssignmentExercises from './AssignmentExercises'
import { Analytics } from '@mui/icons-material'

const TerminalReport = (props: any) => {
  const{params} = props
    const [index, SetIndex] = React.useState('first')
  return (
    <Tab.Container onSelect={(e) => e && SetIndex(e)} id="left-tabs-example" defaultActiveKey="first">
    <Row>
      <Col sm={2} className='border-right'>
        <Nav variant="pills" className="flex-column">
          <Nav.Item>
            <Nav.Link eventKey="first">Report Card</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="second">Asignments/Exercises</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="third">Analytics</Nav.Link>
          </Nav.Item>
         
        </Nav>
      </Col>
      <Col sm={10}>
        <Tab.Content>
          <Tab.Pane eventKey="first"><ReportCard params={params}  /></Tab.Pane>
          <Tab.Pane eventKey="second"><AssignmentExercises index={index} params={params} /></Tab.Pane>
          <Tab.Pane eventKey="third"><Analytics /></Tab.Pane>
        </Tab.Content>
      </Col>
    </Row>
  </Tab.Container>
  )
}

export default TerminalReport