import React, { useState } from 'react';
import Header from './Header';
import { Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import BillsFeesCard from './BillsFeesCard';
import PaymentCard from './PaymentCard';
import Arrearscard from './Arrearscard';
import FinancialSummaryCard from './FinancialSummaryCard';
import './Finance.css';

const Finance = () => {
    const [index, SetIndex] = useState<string | null>('first')
  const { schoolId, branchId } = useParams()
    return (
        <>
            <Header />
            <div className="finance-page-modern">
                <img src="/images/cap.jpg" alt="" className="floating-cap-decoration floating-cap-top-right" />
                <img src="/images/cap.jpg" alt="" className="floating-cap-decoration floating-cap-bottom-left" />
                <Container fluid>
                    <div className="page-hero-section">
                        <div className="hero-content-wrapper">
                            <div className="hero-icon">
                                <i className="fas fa-wallet"></i>
                            </div>
                            <h1 className="page-title-modern">Financial Management</h1>
                            <p className="page-subtitle-modern">Manage bills, payments, and financial summaries</p>
                        </div>
                    </div>

                    <Card className="finance-card-modern">
                        <Card.Body className="p-0">
                            <Tab.Container onSelect={(e) => SetIndex(e)} id="left-tabs-example" defaultActiveKey="first">
                                <Row className="g-0">
                                    <Col lg={3} md={4} className="tabs-sidebar-modern">
                                        <div className="tabs-header">
                                            <i className="fas fa-chart-line me-2"></i>
                                            <span>Finance Menu</span>
                                        </div>
                                        <Nav variant="pills" className="flex-column tabs-nav-modern">
                                            <Nav.Item>
                                                <Nav.Link eventKey="first">
                                                    <i className="fas fa-file-invoice-dollar"></i>
                                                    <span>Bills & Fees</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="second">
                                                    <i className="fas fa-credit-card"></i>
                                                    <span>Payments</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="third">
                                                    <i className="fas fa-exclamation-triangle"></i>
                                                    <span>Arrears</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="fourth">
                                                    <i className="fas fa-chart-pie"></i>
                                                    <span>Financial Summary</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Col>
                                    <Col lg={9} md={8} className="tab-content-area-modern">
                                        <Tab.Content>
                                            <Tab.Pane eventKey="first">
                                                <BillsFeesCard schoolId={schoolId} branchId={branchId} tabIndex={index} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="second">
                                                <PaymentCard schoolId={schoolId} branchId={branchId} tabIndex={index} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="third">
                                                <Arrearscard schoolId={schoolId} branchId={branchId} tabIndex={index} />
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="fourth">
                                                <FinancialSummaryCard schoolId={schoolId} branchId={branchId} tabIndex={index} />
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Col>
                                </Row>    
                            </Tab.Container>
                        </Card.Body>
                    </Card>
                </Container>
            </div>
        </>
    );
};

export default Finance;