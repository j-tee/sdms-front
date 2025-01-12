import React, { useState } from "react";
import { Card, Col, Container, Nav, Row, Tab } from "react-bootstrap";
import Header from "./Header";
import LocationDropDown from "./LocationDropDown";
import SchoolSubscription from "./SchoolSubscription";
import ParentSubscription from "./ParentSubscription";
import SubscriptionFeeCard from "./SubscriptionFeeCard";
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
      <Container style={{ marginTop: "3.5rem" }}>&nbsp;</Container>
      <Card>
        <Card.Header>
          <Card.Title className="fs-1 text-muted">Subscription</Card.Title>
        </Card.Header>
				<LocationDropDown onLocationChange={handleInputChange} />
        <Card.Body>
          <Tab.Container
            onSelect={(e) => SetIndex(e)}
            id="left-tabs-example"
            defaultActiveKey="first"
          >
            <Row>
              <Col sm={2} className="border-right">
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="first">Schools</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="second">Parents</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="third">Subscription Fees</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={10}>
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
    </>
  );
};

export default Subscription;
