import React, { useState } from 'react';
import Header from './Header';
import { Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import BillsFeesCard from './BillsFeesCard';
import PaymentCard from './PaymentCard';
import Arrearscard from './Arrearscard';
import FinancialSummaryCard from './FinancialSummaryCard';

const Finance = () => {
    const [index, SetIndex] = useState<string | null>('first')
  const { schoolId, branchId } = useParams()
    return (
        <>
            <Header />
            <Container style={{ marginTop: '3.5rem' }}>
                &nbsp;
            </Container>
            <Card>
            <Card.Header>
          <Card.Title className='fs-1 text-muted'>Finance</Card.Title>
        </Card.Header>
        <Card.Body>
        <Tab.Container onSelect={(e) => SetIndex(e)} id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={2} className='border-right'>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Bills & Fees</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Payments</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Arrears</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="fourth">Financial Summaries</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="first"><BillsFeesCard schoolId={schoolId} branchId={branchId} tabIndex={index} /></Tab.Pane>
                <Tab.Pane eventKey="second"><PaymentCard schoolId={schoolId} branchId={branchId} tabIndex={index} /></Tab.Pane>
                <Tab.Pane eventKey="third"><Arrearscard schoolId={schoolId} branchId={branchId} tabIndex={index} /></Tab.Pane>
                <Tab.Pane eventKey="fourth"><FinancialSummaryCard schoolId={schoolId} branchId={branchId} tabIndex={index} /></Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>    
        </Tab.Container>
        </Card.Body>
            </Card>
            

        </>
    );
};

export default Finance;