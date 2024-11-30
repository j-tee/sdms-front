import React from 'react'
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import StudentTerminalBills from './StudentTerminalBills'
import StudentPayments from './StudentPayments'

const StudentBillsFees = (props: any) => {
  const {params} = props
    const [index, SetIndex] = React.useState('first')
    return (
      <Tab.Container onSelect={(e) => e && SetIndex(e)} id="left-tabs-example" defaultActiveKey="first">
      <Row>
        <Col sm={2} className='border-right'>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="first">Bills</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">Payments</Nav.Link>
            </Nav.Item>
                      
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey="first"><StudentTerminalBills  /></Tab.Pane>
            <Tab.Pane eventKey="second"><StudentPayments /></Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    )
}

export default StudentBillsFees