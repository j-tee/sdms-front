import React, { useState } from "react";
import { Card, Col, Container, Nav, Row, Tab } from "react-bootstrap";
import Header from "./Header";
import LocationDropDown from "./LocationDropDown";
import SchoolSubscription from "./SchoolSubscription";
import ParentSubscription from "./ParentSubscription";
import SubscriptionFeeCard from "./SubscriptionFeeCard";
import './Subscription.css';
type AnyType = {
	[key: string]: string;
};
const Subscription = () => {
  const [index, SetIndex] = useState<string | null>("first");
	const [params, setParams] = useState({
		region_id: 0,
		district_id: 0,
		circuit_id: 0,
		current_page: "1",
		per_page: "10",
	})
	const handleInputChange = <T extends AnyType>(field: keyof T, value: string) => {
    setParams((prevData) => ({
			...prevData,
			[field]: value,
		}));
  };
  return (
    <>
      <Header />
      <div className="subscription-page-modern">
        <img src="/images/cap.jpg" alt="" className="floating-cap-decoration floating-cap-top-right" />
        <img src="/images/cap.jpg" alt="" className="floating-cap-decoration floating-cap-bottom-left" />
        <Container fluid>
          <div className="page-hero-section">
            <div className="hero-content-wrapper">
              <div className="hero-icon">
                <i className="fas fa-crown"></i>
              </div>
              <h1 className="page-title-modern">Subscription Management</h1>
              <p className="page-subtitle-modern">Manage school and parent subscriptions</p>
            </div>
          </div>

          <Card className="filter-card-modern mb-3">
            <Card.Body>
              <div className="filter-header">
                <i className="fas fa-map-marker-alt"></i>
                <h5>Filter by Location</h5>
              </div>
              <LocationDropDown onLocationChange={handleInputChange} />
            </Card.Body>
          </Card>

          <Card className="subscription-card-modern">
            <Card.Body className="p-0">
              <Tab.Container
                onSelect={(e) => SetIndex(e)}
                id="left-tabs-example"
                defaultActiveKey="first"
              >
                <Row className="g-0">
                  <Col lg={3} md={4} className="tabs-sidebar-modern">
                    <div className="tabs-header">
                      <i className="fas fa-star me-2"></i>
                      <span>Subscription Menu</span>
                    </div>
                    <Nav variant="pills" className="flex-column tabs-nav-modern">
                      <Nav.Item>
                        <Nav.Link eventKey="first">
                          <i className="fas fa-school"></i>
                          <span>Schools</span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">
                          <i className="fas fa-user-friends"></i>
                          <span>Parents</span>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="third">
                          <i className="fas fa-dollar-sign"></i>
                          <span>Subscription Fees</span>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col lg={9} md={8} className="tab-content-area-modern">
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        <SchoolSubscription params={params} index={index} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        <ParentSubscription params={params} index={index} />
                      </Tab.Pane>
                      <Tab.Pane eventKey="third">
                        <SubscriptionFeeCard params={params} index={index} />
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

export default Subscription;
