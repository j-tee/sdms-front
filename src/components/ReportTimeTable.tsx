import React from 'react'
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import StudentLessons from './StudentLessons'
import StudentAttendances from './StudentAttendances'
import StudentSubject from './StudentSubject'

const ReportTimeTable = (props: any) => {
    const [index, SetIndex] = React.useState('first')
    return (
      <Tab.Container onSelect={(e) => e && SetIndex(e)} id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={2} className='border-right'>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Lessons</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Attendaces</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">Subjects</Nav.Link>
            </Nav.Item>
           
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey="first"><StudentLessons  /></Tab.Pane>
            <Tab.Pane eventKey="second"><StudentAttendances /></Tab.Pane>
            <Tab.Pane eventKey="third"><StudentSubject /></Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    )
}

export default ReportTimeTable