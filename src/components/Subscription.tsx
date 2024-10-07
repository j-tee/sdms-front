import React, { useState } from 'react'
import { Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap'
import Header from './Header'

const Subscription = () => {
    const [index, SetIndex] = useState<string | null>('first')
  return (
    <>
    <Header />
      <Container style={{ marginTop: '3.5rem' }}>
        &nbsp;
      </Container>
    <Card>
        <Card.Header>
            <Card.Title className='fs-1 text-muted'>Subscription</Card.Title>
        </Card.Header>
        <Card.Body>
        <Tab.Container onSelect={(e) => SetIndex(e)} id="left-tabs-example" defaultActiveKey="first">
            <Row>
            <Col sm={2} className='border-right'>
                <Nav variant="pills" className="flex-column">
                <Nav.Item>
                    <Nav.Link eventKey="first">Schools</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="second">Parents</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="third">Students</Nav.Link>
                </Nav.Item>
                </Nav>
            </Col>
            <Col sm={10}>
                <Tab.Content>
                <Tab.Pane eventKey="first">Schools</Tab.Pane>
                <Tab.Pane eventKey="second">Parents</Tab.Pane>
                <Tab.Pane eventKey="third">Students</Tab.Pane>
                </Tab.Content>
            </Col>
            </Row>
        </Tab.Container>
        </Card.Body>
    </Card>
    </>
  )
}

export default Subscription